import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Subscriber as OTSubscriber } from '@opentok/client';
import { Box } from 'opentok-layout-js';
import { SubscriberWrapper } from '../../types/session';
import Subscriber from './Subscriber';

describe('Subscriber', () => {
  afterEach(() => {
    cleanup();
  });

  const createSubscriberWrapper = (id: string, isScreenshare: boolean): SubscriberWrapper => {
    const videoType = isScreenshare ? 'screen' : 'camera';
    return {
      id,
      element: document.createElement('video'),
      isScreenshare,
      subscriber: {
        on: vi.fn(),
        off: vi.fn(),
        videoWidth: () => 1280,
        videoHeight: () => 720,
        subscribeToVideo: () => {},
        stream: {
          streamId: id,
          videoType,
        },
      } as unknown as OTSubscriber,
    };
  };

  const createMockBox = (height: number, left: number, top: number, width: number): Box => {
    return {
      height,
      left,
      top,
      width,
    };
  };

  it('should contain an audio indicator component if it is not a screenshare', () => {
    const mockedSubscriberId = '123';
    const subscriberWrapper = createSubscriberWrapper(mockedSubscriberId, false);
    const mockedBox = createMockBox(10, 10, 10, 10);

    render(
      <Subscriber
        subscriberWrapper={subscriberWrapper}
        isHidden={false}
        box={mockedBox}
        isActiveSpeaker={false}
      />
    );

    expect(screen.getByTestId(`subscriber-container-${mockedSubscriberId}`)).toBeVisible();
    expect(screen.getByTestId('audio-indicator')).toBeVisible();
  });

  it('should not contain an audio indicator component if it is a screenshare', () => {
    const mockedSubscriberId = '456';
    const subscriberWrapper = createSubscriberWrapper(mockedSubscriberId, true);
    const mockedBox = createMockBox(10, 10, 10, 10);

    render(
      <Subscriber
        subscriberWrapper={subscriberWrapper}
        isHidden={false}
        box={mockedBox}
        isActiveSpeaker={false}
      />
    );

    expect(screen.getByTestId(`subscriber-container-${mockedSubscriberId}`)).toBeVisible();
    expect(screen.queryByTestId('audio-indicator')).not.toBeInTheDocument();
  });
});
