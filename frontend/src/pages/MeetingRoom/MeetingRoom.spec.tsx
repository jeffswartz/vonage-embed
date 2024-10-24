import '../../index.css';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Publisher, Subscriber } from '@opentok/client';
import { EventEmitter } from 'stream';
import MeetingRoom from './MeetingRoom';
import UserProvider, { UserContextType } from '../../Context/user';
import SessionProvider, { SessionContextType } from '../../Context/SessionProvider/session';
import { SubscriberWrapper } from '../../types/session';
import { PublisherContextType, PublisherProvider } from '../../Context/PublisherProvider';
import usePublisherContext from '../../hooks/usePublisherContext';
import useUserContext from '../../hooks/useUserContext';
import useDevices from '../../hooks/useDevices';
import { AllMediaDevices } from '../../types';
import { allMediaDevices, defaultAudioDevice } from '../../utils/mockData/device';
import useSpeakingDetector from '../../hooks/useSpeakingDetector';
import useLayoutManager, { GetLayout } from '../../hooks/useLayoutManager';
import useSessionContext from '../../hooks/useSessionContext';
import useActiveSpeaker from '../../hooks/useActiveSpeaker';
import useScreenShare, { UseScreenShareType } from '../../hooks/useScreenShare';

const mockedNavigate = vi.fn();
const mockedParams = { roomName: 'test-room-name' };
const mockedLocation = vi.fn();
vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...mod,
    useNavigate: () => mockedNavigate,
    useParams: () => mockedParams,
    useLocation: () => mockedLocation,
  };
});

vi.mock('../../hooks/useDevices.tsx');
vi.mock('../../hooks/usePublisherContext.tsx');
vi.mock('../../hooks/useUserContext.tsx');
vi.mock('../../hooks/useSpeakingDetector.tsx');
vi.mock('../../hooks/useLayoutManager.tsx');
vi.mock('../../hooks/useSessionContext.tsx');
vi.mock('../../hooks/useActiveSpeaker.tsx');
vi.mock('../../hooks/useScreenShare.tsx');

const mockUseDevices = useDevices as Mock<
  [],
  { allMediaDevices: AllMediaDevices; getAllMediaDevices: () => void }
>;

const mockUsePublisherContext = usePublisherContext as Mock<[], PublisherContextType>;
const mockUseUserContext = useUserContext as Mock<[], UserContextType>;
const mockUserContext = {
  user: {
    defaultSettings: {
      videoFilter: undefined,
      name: 'John Doe',
    },
  },
} as unknown as UserContextType;
const mockUseSpeakingDetector = useSpeakingDetector as Mock<[], boolean>;
const mockUseLayoutManager = useLayoutManager as Mock<[], GetLayout>;
const mockUseSessionContext = useSessionContext as Mock<[], SessionContextType>;
const mockUseActiveSpeaker = useActiveSpeaker as Mock<[], string | undefined>;
const mockUseScreenShare = useScreenShare as Mock<[], UseScreenShareType>;

const MeetingRoomWithProviders = () => (
  <UserProvider>
    <SessionProvider>
      <PublisherProvider>
        <MeetingRoom />
      </PublisherProvider>
    </SessionProvider>
  </UserProvider>
);

const createSubscriberWrapper = (id: string): SubscriberWrapper => {
  const mockSubscriber = {
    id,
    on: vi.fn(), // Mock the 'on' method using vitest's mock function
    off: vi.fn(), // Mock the 'off' method
    videoWidth: () => 1280,
    videoHeight: () => 720,
    subscribeToVideo: () => {},
    stream: {
      streamId: id,
    },
  } as unknown as Subscriber;
  return {
    id,
    element: document.createElement('video'),
    isScreenshare: false,
    subscriber: mockSubscriber,
  };
};

describe('MeetingRoom', () => {
  let mockPublisher: Publisher;
  let sessionContext: SessionContextType;
  let publisherContext: PublisherContextType;
  beforeEach(() => {
    mockUseUserContext.mockImplementation(() => mockUserContext);
    mockPublisher = Object.assign(new EventEmitter(), {
      applyVideoFilter: vi.fn(),
      clearVideoFilter: vi.fn(),
      getAudioSource: () => defaultAudioDevice,
      videoWidth: () => 1280,
      videoHeight: () => 720,
    }) as unknown as Publisher;
    publisherContext = {
      publisher: null,
      isPublishing: true,
      publish: vi.fn() as () => Promise<void>,
    } as PublisherContextType;
    mockUsePublisherContext.mockImplementation(() => publisherContext);
    mockUseDevices.mockReturnValue({
      getAllMediaDevices: vi.fn(),
      allMediaDevices,
    });

    sessionContext = {
      joinRoom: vi.fn(),
      subscriberWrappers: [],
      connected: false,
      reconnecting: false,
      layoutMode: 'grid',
      rightPanelActiveTab: 'closed',
      toggleChat: vi.fn(),
      toggleParticipantList: vi.fn(),
      closeRightPanel: vi.fn(),
    } as unknown as SessionContextType;
    mockUseSpeakingDetector.mockReturnValue(false);
    mockUseLayoutManager.mockImplementation(() => (dimensions, elements) => {
      return Array(elements.length).fill({
        height: 720,
        left: 0,
        top: 0,
        width: 1280,
      });
    });
    mockUseSessionContext.mockReturnValue(sessionContext as unknown as SessionContextType);
    mockUseActiveSpeaker.mockReturnValue(undefined);
    mockUseScreenShare.mockReturnValue({
      toggleShareScreen: () => {},
      isSharingScreen: false,
      screenshareVideoElement: undefined,
      screensharingPublisher: null,
    });
  });

  it('should render', () => {
    render(<MeetingRoomWithProviders />);
    const meetingRoom = screen.getByTestId('meetingRoom');
    expect(meetingRoom).not.toBeNull();
  });

  it('should call joinRoom on render only once', () => {
    const { rerender } = render(<MeetingRoomWithProviders />);
    expect(sessionContext.joinRoom).toHaveBeenCalledWith('test-room-name');
    expect(sessionContext.joinRoom).toHaveBeenCalledTimes(1);
    rerender(<MeetingRoomWithProviders />);
    rerender(<MeetingRoomWithProviders />);
    rerender(<MeetingRoomWithProviders />);
    rerender(<MeetingRoomWithProviders />);
    expect(sessionContext.joinRoom).toHaveBeenCalledTimes(1);
  });

  it('should call publisher after connected', () => {
    const { rerender } = render(<MeetingRoomWithProviders />);
    expect(sessionContext.joinRoom).toHaveBeenCalledWith('test-room-name');
    sessionContext.connected = true;
    rerender(<MeetingRoomWithProviders />);
    expect(publisherContext.publish).toHaveBeenCalledTimes(1);
  });

  it('should display publisher', () => {
    sessionContext.connected = true;
    publisherContext.publisher = mockPublisher;
    const { rerender } = render(<MeetingRoomWithProviders />);
    rerender(<MeetingRoomWithProviders />);
    expect(screen.getByTestId('publisher-container')).toBeInTheDocument();
  });

  it('should hide subscribers and show participant hidden tile', () => {
    sessionContext.connected = true;
    sessionContext.layoutMode = 'active-speaker';
    sessionContext.subscriberWrappers = [
      createSubscriberWrapper('sub1'),
      createSubscriberWrapper('sub2'),
      createSubscriberWrapper('sub3'),
      createSubscriberWrapper('sub4'),
      createSubscriberWrapper('sub5'),
      createSubscriberWrapper('sub6'),
      createSubscriberWrapper('sub7'),
    ];
    publisherContext.publisher = mockPublisher;
    const { rerender } = render(<MeetingRoomWithProviders />);
    rerender(<MeetingRoomWithProviders />);
    expect(screen.getByTestId('subscriber-container-sub1')).toBeVisible();
    expect(screen.getByTestId('subscriber-container-sub2')).toBeVisible();
    expect(screen.getByTestId('subscriber-container-sub3')).toBeVisible();
    expect(screen.getByTestId('subscriber-container-sub4')).toBeVisible();
    expect(screen.getByTestId('hidden-participants')).toBeInTheDocument();
    expect(screen.getByTestId('subscriber-container-sub5')).not.toBeVisible();
    expect(screen.getByTestId('subscriber-container-sub6')).not.toBeVisible();
    expect(screen.getByTestId('subscriber-container-sub7')).not.toBeVisible();
  });

  it('should render subscribers in correct order', () => {
    sessionContext.connected = true;
    sessionContext.layoutMode = 'active-speaker';
    const [sub1, sub2, sub3] = Array(3)
      .fill(0)
      .map((s, index) => createSubscriberWrapper(`sub${index + 1}`));
    sessionContext.subscriberWrappers = [sub1];
    publisherContext.publisher = mockPublisher;
    const { rerender } = render(<MeetingRoomWithProviders />);

    sessionContext.subscriberWrappers = [sub2, sub1];
    rerender(<MeetingRoomWithProviders />);

    const getSubIdsInRenderOrder = () =>
      screen.getAllByTestId('subscriber-container', { exact: false }).map((element) => element?.id);

    // sub1 joined first so should stay in position
    expect(getSubIdsInRenderOrder()).toEqual(['sub1', 'sub2']);

    sessionContext.subscriberWrappers = [sub3, sub2, sub1];
    rerender(<MeetingRoomWithProviders />);

    // sub1 and sub2 joined first so should stay in position ahead of sub3
    expect(getSubIdsInRenderOrder()).toEqual(['sub1', 'sub2', 'sub3']);
  });

  it('should display chat unread number', () => {
    sessionContext.connected = true;
    publisherContext.publisher = mockPublisher;
    const { rerender } = render(<MeetingRoomWithProviders />);
    rerender(<MeetingRoomWithProviders />);
    sessionContext.unreadCount = 4;
    rerender(<MeetingRoomWithProviders />);
    expect(screen.getByTestId('chat-toggle-unread-count')).toHaveTextContent('4');
  });
});
