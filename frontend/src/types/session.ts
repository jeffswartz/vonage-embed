import { Subscriber } from '@opentok/client';

/**
 * Wrapper for a subscriber, including the DOM element, the subscriber object, and its screen sharing status.
 */
export type SubscriberWrapper = {
  element: HTMLVideoElement | HTMLObjectElement;
  subscriber: Subscriber;
  isScreenshare: boolean;
  id: string;
};
