import { useState, useRef, useCallback, useEffect } from 'react';
import { Publisher, Event, initPublisher, setAudioOutputDevice } from '@opentok/client';
import setMediaDevices from '../../../utils/mediaDeviceUtils';
import useDevices from '../../../hooks/useDevices';
import usePermissions from '../../../hooks/usePermissions';
import useUserContext from '../../../hooks/useUserContext';

import { DEVICE_ACCESS_STATUS } from '../../../utils/constants';
import { UserType } from '../../user';

type PublisherVideoElementCreatedEvent = Event<'videoElementCreated', Publisher> & {
  element: HTMLVideoElement | HTMLObjectElement;
};

type PreviewPublisherContextType = {
  isAudioEnabled: boolean;
  isPublishing: boolean;
  isVideoEnabled: boolean;
  publisher: Publisher | null;
  publisherVideoElement: HTMLVideoElement | HTMLObjectElement | undefined;
  destroyPublisher: () => void;
  toggleAudio: () => void;
  toggleVideo: () => void;
  toggleBlur: () => void;
  localAudioSource: string | undefined;
  localVideoSource: string | undefined;
  localAudioOutput: string | undefined;
  accessStatus: string | null;
  changeAudioSource: (deviceId: string) => void;
  changeVideoSource: (deviceId: string) => void;
  changeAudioOutput: (deviceId: string) => void;
  hasBlur: boolean;
  initLocalPublisher: () => void;
  speechLevel: number;
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
 * @property {() => void} toggleAudio - Method to toggle microphone on/off. State updated internally, can be read via isAudioEnabled.
 * @property {() => void} toggleVideo - Method to toggle camera on/off. State updated internally, can be read via isVideoEnabled.
 * @property {() => void} unpublish - Method to unpublish from session and destroy publisher (for ending a call).
 * @returns {PreviewPublisherContextType} preview context
 */
const usePreviewPublisher = (): PreviewPublisherContextType => {
  const { setUser } = useUserContext();
  const { allMediaDevices, getAllMediaDevices } = useDevices();
  const [publisherVideoElement, setPublisherVideoElement] = useState<
    HTMLVideoElement | HTMLObjectElement
  >();

  const [speechLevel, setSpeechLevel] = useState(0);
  const { setAccessStatus, accessStatus } = usePermissions();
  const publisherRef = useRef<Publisher | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [localBlur, setBlur] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [localVideoSource, setLocalVideoSource] = useState<string | undefined>(undefined);
  const [localAudioSource, setLocalAudioSource] = useState<string | undefined>(undefined);
  const [localAudioOutput, setLocalAudioOutput] = useState<string | undefined>(undefined);

  /* This sets the default devices in use so that the user knows what devices they are using */
  useEffect(() => {
    setMediaDevices(
      publisherRef,
      allMediaDevices,
      setLocalAudioSource,
      setLocalVideoSource,
      setLocalAudioOutput
    );
  }, [allMediaDevices]);

  const handleDestroyed = () => {
    publisherRef.current = null;
  };

  /**
   * Change background blur status
   * @returns {void}
   */
  const toggleBlur = useCallback(() => {
    if (!publisherRef.current) {
      return;
    }
    if (localBlur) {
      publisherRef.current.clearVideoFilter();
    } else {
      publisherRef.current.applyVideoFilter({
        type: 'backgroundBlur',
        blurStrength: 'high',
      });
    }
    setBlur(!localBlur);
    if (setUser) {
      setUser((prevUser: UserType) => ({
        ...prevUser,
        defaultSettings: {
          ...prevUser.defaultSettings,
          blur: !localBlur,
        },
      }));
    }
  }, [localBlur, setUser]);

  /**
   * Change microphone
   * @returns {void}
   */
  const changeAudioSource = useCallback(
    (deviceId: string) => {
      if (!deviceId || !publisherRef.current) {
        return;
      }
      publisherRef.current.setAudioSource(deviceId);
      setLocalAudioSource(deviceId);
      if (setUser) {
        setUser((prevUser: UserType) => ({
          ...prevUser,
          defaultSettings: {
            ...prevUser.defaultSettings,
            audioSource: deviceId,
          },
        }));
      }
    },
    [setUser]
  );

  /**
   * Change video camera in use
   * @returns {void}
   */
  const changeVideoSource = useCallback(
    (deviceId: string) => {
      if (!deviceId || !publisherRef.current) {
        return;
      }
      publisherRef.current.setVideoSource(deviceId);
      setLocalVideoSource(deviceId);
      if (setUser) {
        setUser((prevUser: UserType) => ({
          ...prevUser,
          defaultSettings: {
            ...prevUser.defaultSettings,
            videoSource: deviceId,
          },
        }));
      }
    },
    [setUser]
  );

  /**
   * Change speakers in use
   * @returns {void}
   */
  const changeAudioOutput = useCallback((deviceId: string) => {
    if (!deviceId || !publisherRef.current) {
      return;
    }
    setAudioOutputDevice(deviceId);
    setLocalAudioOutput(deviceId);
  }, []);

  /**
   * Handle device permissions denial
   * used to inform the user they need to give permissions to devices to access the call
   * @returns {void}
   */
  const handleAccessDenied = useCallback(() => {
    console.log('access denied');

    setAccessStatus(DEVICE_ACCESS_STATUS.REJECTED);

    publisherRef.current = null;
  }, [setAccessStatus]);

  const handleVideoElementCreated = (event: PublisherVideoElementCreatedEvent) => {
    setPublisherVideoElement(event.element);
    setIsPublishing(true);
  };

  /* TODO: Replace with mvgAverage utils once merged */
  const calculateAudioLevel = useCallback((audioLevel: number) => {
    const currentLogLevel = Math.log(audioLevel) / Math.LN10 / 1.5 + 1;
    setSpeechLevel(Math.min(Math.max(currentLogLevel, 0), 1) * 100);
  }, []);

  const addPublisherListeners = useCallback(
    (publisher: Publisher) => {
      publisher.on('destroyed', handleDestroyed);
      publisher.on('accessDenied', handleAccessDenied);
      publisher.on('videoElementCreated', handleVideoElementCreated);
      publisher.on('audioLevelUpdated', ({ audioLevel }: { audioLevel: number }) => {
        calculateAudioLevel(audioLevel);
      });
      publisher.on('accessAllowed', () => {
        setAccessStatus(DEVICE_ACCESS_STATUS.ACCEPTED);
        getAllMediaDevices();
      });
    },
    [calculateAudioLevel, getAllMediaDevices, handleAccessDenied, setAccessStatus]
  );

  const initLocalPublisher = useCallback(() => {
    if (publisherRef.current) {
      return;
    }

    publisherRef.current = initPublisher(undefined, { insertDefaultUI: false }, (err: unknown) => {
      if (err instanceof Error) {
        publisherRef.current = null;
        if (err.name === 'OT_USER_MEDIA_ACCESS_DENIED') {
          console.error('initPublisher error: ', err);
        }
      }
    });
    addPublisherListeners(publisherRef.current);
  }, [addPublisherListeners]);

  const destroyPublisher = useCallback(() => {
    if (publisherRef.current) {
      publisherRef.current.destroy();
      publisherRef.current = null;
    } else {
      console.warn('pub not destroyed');
    }
  }, []);

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
    if (setUser) {
      setUser((prevUser: UserType) => ({
        ...prevUser,
        defaultSettings: {
          ...prevUser.defaultSettings,
          publishVideo: !isVideoEnabled,
        },
      }));
    }
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
    if (setUser) {
      setUser((prevUser: UserType) => ({
        ...prevUser,
        defaultSettings: {
          ...prevUser.defaultSettings,
          publishAudio: !isAudioEnabled,
        },
      }));
    }
  };

  return {
    isAudioEnabled,
    initLocalPublisher,
    isPublishing,
    isVideoEnabled,
    destroyPublisher,
    publisher: publisherRef.current,
    publisherVideoElement,
    toggleAudio,
    toggleVideo,
    toggleBlur,
    hasBlur: localBlur,
    changeAudioSource,
    changeVideoSource,
    localAudioSource,
    localVideoSource,
    changeAudioOutput,
    localAudioOutput,
    accessStatus,
    speechLevel,
  };
};
export default usePreviewPublisher;
