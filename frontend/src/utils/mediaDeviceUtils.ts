import { Publisher, getActiveAudioOutputDevice } from '@opentok/client';
import { RefObject } from 'react';
import { getAudioSourceDeviceId } from '../util';
import { AllMediaDevices } from '../types/room';

/**
 * Helper to update the media devices state with the current media devices of a given publisher.
 * @param {RefObject<Publisher | null>} publisherRef - The publisher ref object.
 * @param {AllMediaDevices} allMediaDevices - All video input, audio input, audio output devices for a user.
 * @param {(deviceId: string) => void} setLocalAudioSource - SetStateAction for the audio input.
 * @param {(deviceId: string) => void} setLocalVideoSource - SetStateAction for the video input.
 * @param {(deviceId: string) => void} setLocalAudioOutput - SetStateAction for the audio output.
 * @returns {Promise<void>} - A promise that resolves after setting current media devices' state.
 */
const setMediaDevices = async (
  publisherRef: RefObject<Publisher | null>,
  allMediaDevices: AllMediaDevices,
  setLocalAudioSource: (deviceId: string) => void,
  setLocalVideoSource: (deviceId: string) => void,
  setLocalAudioOutput: (deviceId: string) => void
): Promise<void> => {
  if (!publisherRef.current || !allMediaDevices) {
    return;
  }

  const currentVideoDevice = publisherRef.current.getVideoSource();
  const currentAudioDevice = publisherRef.current.getAudioSource();
  const audioSourceId = getAudioSourceDeviceId(
    allMediaDevices.audioInputDevices,
    currentAudioDevice
  );
  if (!audioSourceId || !currentVideoDevice.deviceId) {
    return;
  }
  setLocalAudioSource(audioSourceId);
  if (typeof currentVideoDevice?.deviceId === 'string') {
    setLocalVideoSource(currentVideoDevice.deviceId);
  }

  const currentAudioOutputDevice = await getActiveAudioOutputDevice();
  if (typeof currentAudioOutputDevice?.deviceId === 'string') {
    setLocalAudioOutput(currentAudioOutputDevice.deviceId);
  }
};

export default setMediaDevices;
