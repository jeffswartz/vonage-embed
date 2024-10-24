import { Subscriber } from '@opentok/client';
import { useState, useEffect, useMemo, Dispatch, SetStateAction } from 'react';

const speakingTimeThreshold = 100;
const notSpeakingTimeThreshold = 800;
const speakingVolume = 0.1;

type SubscriberSpeakingProps = {
  subscriber: Subscriber;
  isActiveSpeaker: boolean;
};

const createOnHandleAudioLevelUpdated = (setIsTalking: Dispatch<SetStateAction<boolean>>) => {
  let isTalking = false;
  let timestamp = Date.now();

  const handleAudioLevel = (audioLevel: number) => {
    const now = Date.now();
    if (audioLevel > speakingVolume) {
      if (!isTalking) {
        isTalking = true;
        timestamp = now;
      } else if (now - timestamp > speakingTimeThreshold) {
        isTalking = true;
        timestamp = now;
        setIsTalking(true);
      }
    } else if (isTalking && now - timestamp > notSpeakingTimeThreshold) {
      isTalking = false;
      setIsTalking(false);
    }
  };

  return ({ audioLevel }: { audioLevel: number }) => handleAudioLevel(audioLevel);
};

const useSubscriberTalking = ({ subscriber, isActiveSpeaker }: SubscriberSpeakingProps) => {
  const [isTalking, setIsTalking] = useState<boolean>(false);
  const audioLevelUpdateHandler = useMemo(
    () => createOnHandleAudioLevelUpdated(setIsTalking),
    [setIsTalking]
  );

  useEffect(() => {
    if (subscriber && isActiveSpeaker) {
      subscriber.on('audioLevelUpdated', audioLevelUpdateHandler);
    }

    return () => {
      if (subscriber) {
        subscriber.off('audioLevelUpdated', audioLevelUpdateHandler);
      }
      if (isTalking) {
        setIsTalking(false);
      }
    };
  }, [subscriber, audioLevelUpdateHandler, isActiveSpeaker, isTalking]);

  return isTalking;
};

export default useSubscriberTalking;
