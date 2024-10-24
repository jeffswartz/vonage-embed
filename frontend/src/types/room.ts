import { AudioOutputDevice, Device } from '@opentok/client';

export type AllMediaDevices = {
  audioInputDevices: Device[];
  videoInputDevices: Device[];
  audioOutputDevices: AudioOutputDevice[];
};
