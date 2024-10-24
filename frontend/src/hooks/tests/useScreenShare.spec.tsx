import { Mock, beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { Publisher, Session, initPublisher } from '@opentok/client';
import useScreenShare from '../useScreenShare';
import useSessionContext from '../useSessionContext';
import useUserContext from '../useUserContext';

// Mocking dependencies
vi.mock('@opentok/client', () => ({
  initPublisher: vi.fn(),
}));

vi.mock('../useSessionContext');
vi.mock('../useUserContext');

describe('useScreenSharing', () => {
  let mockSession: Partial<Session>;
  let mockPublisher: Partial<Publisher>;
  let mockUserContext: { user: { defaultSettings: { name: string } } };

  beforeEach(() => {
    mockSession = {
      publish: vi.fn() as Mock,
      unpublish: vi.fn() as Mock,
      on: vi.fn() as Mock,
    } as unknown as Session;

    mockPublisher = {
      on: vi.fn() as Mock,
      destroy: vi.fn() as Mock,
    };

    mockUserContext = { user: { defaultSettings: { name: 'TestUser' } } };

    (useSessionContext as Mock).mockReturnValue({ session: mockSession as Session });
    (useUserContext as Mock).mockReturnValue(mockUserContext);
    (initPublisher as Mock).mockReturnValue(mockPublisher as Publisher);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('initializes screen sharing publisher and publishes', async () => {
    const { result } = renderHook(() => useScreenShare());

    await act(async () => {
      // toggling screen share on
      await result.current.toggleShareScreen();
    });

    expect(initPublisher).toHaveBeenCalledWith(
      undefined,
      {
        videoSource: 'screen',
        insertDefaultUI: false,
        videoContentHint: 'detail',
        name: "TestUser's screen",
      },
      expect.any(Function)
    );
    expect(mockPublisher.on).toHaveBeenCalledWith('streamCreated', expect.any(Function));
    expect(mockPublisher.on).toHaveBeenCalledWith('streamDestroyed', expect.any(Function));
    expect(mockPublisher.on).toHaveBeenCalledWith('mediaStopped', expect.any(Function));
  });

  it('unpublishes screen sharing when already sharing', async () => {
    const { result } = renderHook(() => useScreenShare());

    await act(async () => {
      // toggling screen share on
      await result.current.toggleShareScreen();
      // toggling screen share off
      await result.current.toggleShareScreen();
    });

    expect(result.current.isSharingScreen).toBe(false);
  });

  it('does not initialize publisher if session is null', async () => {
    (useSessionContext as Mock).mockReturnValue({ session: null });

    const { result } = renderHook(() => useScreenShare());

    await act(async () => {
      await result.current.toggleShareScreen();
    });

    expect(initPublisher).not.toHaveBeenCalled();
  });
});
