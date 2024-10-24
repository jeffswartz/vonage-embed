import { describe, expect, it, vi, beforeEach, Mock } from 'vitest';
import { act, render, waitFor } from '@testing-library/react';
import EventEmitter from 'events';
import useSessionContext from '../../hooks/useSessionContext';
import SessionProvider from './session';
import ActiveSpeakerTracker from '../../utils/ActiveSpeakerTracker';
import useUserContext from '../../hooks/useUserContext';

vi.mock('../../utils/ActiveSpeakerTracker');
vi.mock('../../hooks/useUserContext');

describe('SessionProvider', () => {
  let activeSpeakerTracker: ActiveSpeakerTracker;
  let mockUserContext: { user: { defaultSettings: { name: string } } };
  const TestComponent = () => {
    const { activeSpeakerId } = useSessionContext();
    return <span data-testid="activeSpeaker">{activeSpeakerId}</span>;
  };
  beforeEach(() => {
    activeSpeakerTracker = Object.assign(new EventEmitter(), {
      onSubscriberDestroyed: vi.fn(),
      onSubscriberAudioLevelUpdated: vi.fn(),
    }) as unknown as ActiveSpeakerTracker;
    mockUserContext = { user: { defaultSettings: { name: 'TestUser' } } };
    (useUserContext as Mock).mockReturnValue(mockUserContext);
    const mockedActiveSpeakerTracker = vi.mocked(ActiveSpeakerTracker);
    mockedActiveSpeakerTracker.mockImplementation(() => {
      return activeSpeakerTracker;
    });
  });

  it('should update activeSpeaker state when activeSpeakerTracker emits event', async () => {
    const { getByTestId } = render(
      <SessionProvider>
        <TestComponent />
      </SessionProvider>
    );

    act(() =>
      activeSpeakerTracker.emit('activeSpeakerChanged', {
        previousActiveSpeaker: { subscriberId: undefined, movingAvg: 0 },
        newActiveSpeaker: { subscriberId: 'sub1', movingAvg: 0.3 },
      })
    );
    await waitFor(() => expect(getByTestId('activeSpeaker')).toHaveTextContent('sub1'));
    act(() =>
      activeSpeakerTracker.emit('activeSpeakerChanged', {
        previousActiveSpeaker: { subscriberId: 'sub1', movingAvg: 0 },
        newActiveSpeaker: { subscriberId: 'sub2', movingAvg: 0.4 },
      })
    );
    await waitFor(() => expect(getByTestId('activeSpeaker')).toHaveTextContent('sub2'));
  });
});
