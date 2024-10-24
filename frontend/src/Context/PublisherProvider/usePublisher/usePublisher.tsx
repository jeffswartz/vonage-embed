import { useState, useContext, useRef } from 'react';
import { Publisher, Event, Stream, initPublisher } from '@opentok/client';
import usePublisherQuality, { NetworkQuality } from '../usePublisherQuality/usePublisherQuality';
import usePublisherOptions from '../usePublisherOptions';
import { SessionContext } from '../../SessionProvider/session';

type PublisherStreamCreatedEvent = Event<'streamCreated', Publisher> & {
  stream: Stream;
};

type PublisherVideoElementCreatedEvent = Event<'videoElementCreated', Publisher> & {
  element: HTMLVideoElement | HTMLObjectElement;
};

type PublisherContextType = {
  isAudioEnabled: boolean;
  isPublishing: boolean;
  isVideoEnabled: boolean;
  publish: () => Promise<void>;
  publisher: Publisher | null;
  publisherVideoElement: HTMLVideoElement | HTMLObjectElement | undefined;
  quality: NetworkQuality;
  stream: Stream | null | undefined;
  toggleAudio: () => void;
  toggleVideo: () => void;
  unpublish: () => void;
};

/**
 * Hook wrapper for creation, interaction with, and state for local video publisher.
 * Access from app via PublisherProvider, not directly.
 * @property {boolean} isAudioEnabled - React state boolean showing if audio is enabled
 * @property {boolean} isPublishing - React state boolean showing if we are publishing
 * @property {boolean} isVideoEnabled - React state boolean showing if camera is on
 * @property {() => Promise<void>} publish - Method to initialize publisher and publish to session
 * @property {Publisher | null} publisher - Publisher object
 * @property {HTMLVideoElement | HTMLObjectElement} publisherVideoElement - video element for publisher
 * @property {NetworkQuality} quality - React state for current network quality
 * @property {Stream | null | undefined} stream - OT Stream object for publisher
 * @property {() => void} toggleAudio - Method to toggle microphone on/off. State updated internally, can be read via isAudioEnabled.
 * @property {() => void} toggleVideo - Method to toggle camera on/off. State updated internally, can be read via isVideoEnabled.
 * @property {() => void} unpublish - Method to unpublish from session and destroy publisher (for ending a call).
 * @returns {PublisherContextType} the publisher context
 */
const usePublisher = (): PublisherContextType => {
  const [publisherVideoElement, setPublisherVideoElement] = useState<
    HTMLVideoElement | HTMLObjectElement
  >();
  const publisherRef = useRef<Publisher | null>(null);
  const quality = usePublisherQuality(publisherRef.current);
  const [isPublishing, setIsPublishing] = useState(false);
  const publisherOptions = usePublisherOptions();
  const [isVideoEnabled, setIsVideoEnabled] = useState(!!publisherOptions.publishVideo);
  const [isAudioEnabled, setIsAudioEnabled] = useState(!!publisherOptions.publishAudio);
  const [stream, setStream] = useState<Stream | null>();
  const mSession = useContext(SessionContext);

  const handleDestroyed = () => {
    publisherRef.current = null;
  };

  const handleStreamCreated = (e: PublisherStreamCreatedEvent) => {
    setIsPublishing(true);
    setStream(e.stream);
  };

  const handleStreamDestroyed = () => {
    setStream(null);
    setIsPublishing(false);
    if (publisherRef && publisherRef.current) {
      publisherRef.current.destroy();
    }
    publisherRef.current = null;
  };

  const handleAccessDenied = () => {
    if (publisherRef.current) {
      publisherRef.current.destroy();
    }
    publisherRef.current = null;
  };

  /**
   * Method to unpublish from session and destroy publisher
   */
  const unpublish = async () => {
    if (publisherRef && publisherRef.current) {
      mSession.session!.unpublish(publisherRef.current);
    }
  };

  const handleVideoElementCreated = (event: PublisherVideoElementCreatedEvent) => {
    setPublisherVideoElement(event.element);
    setIsPublishing(true);
  };

  const addPublisherListeners = (publisher: Publisher) => {
    publisher.on('destroyed', handleDestroyed);
    publisher.on('streamCreated', handleStreamCreated);
    publisher.on('streamDestroyed', handleStreamDestroyed);
    publisher.on('accessDenied', handleAccessDenied);
    publisher.on('videoElementCreated', handleVideoElementCreated);
  };

  /**
   * Method to create local camera publisher and publish to session
   */
  const publish = async () => {
    try {
      if (!mSession.session) {
        throw new Error('You are not connected to session');
      }
      const publisher = initPublisher(undefined, publisherOptions);
      // Add listeners synchronously as some events could be fired before callback is invoked
      addPublisherListeners(publisher);
      mSession.session.publish(publisher);
      publisherRef.current = publisher;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.warn(err.stack);
      }
    }
  };

  /**
   * Turns the camera on and off
   * A wrapper for Publisher.publishVideo()
   * More details here: https://vonage.github.io/conversation-docs/video-js-reference/latest/Publisher.html#publishVideo
   * @returns {void}
   */
  const toggleVideo = () => {
    if (!publisherRef.current) {
      return;
    }
    publisherRef.current.publishVideo(!isVideoEnabled);
    setIsVideoEnabled(!isVideoEnabled);
  };

  /**
   * Turns the microphone on and off
   * A wrapper for Publisher.publishAudio()
   * More details here: https://vonage.github.io/conversation-docs/video-js-reference/latest/Publisher.html#publishAudio
   * @returns {void}
   */
  const toggleAudio = () => {
    if (!publisherRef.current) {
      return;
    }
    publisherRef.current.publishAudio(!isAudioEnabled);
    setIsAudioEnabled(!isAudioEnabled);
  };

  return {
    isAudioEnabled,
    isPublishing,
    isVideoEnabled,
    publish,
    publisher: publisherRef.current,
    publisherVideoElement,
    quality,
    stream,
    toggleAudio,
    toggleVideo,
    unpublish,
  };
};
export default usePublisher;
