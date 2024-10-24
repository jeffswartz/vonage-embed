import { Device } from '@opentok/client';

/**
 * Returns a CSS background style based on the audio level input received.
 * The color transitions from a solid blue fill to transparent depending on the audio level.
 * @param {number} level - The audio level received by the microphone.
 * @returns {string} - A CSS background style string.
 */
export const getBackgroundGradient = (level: number) => {
  const fillPercentage = level; // level is already from 0 to 100
  return `linear-gradient(to top, rgba(26,115,232,.9) ${fillPercentage}%, transparent ${fillPercentage}%)`;
};

/**
 * Returns the device ID for the current audio input source.
 * @param {Device[]} audioInputDevices - An array of audio input devices.
 * @param {MediaStreamTrack} currentAudioSource - The current audio source.
 * @returns {string} - Returns device ID for the matching audio input device, or an empty string if there is no match or the input parameters are invalid.
 */
export const getAudioSourceDeviceId = (
  audioInputDevices: Device[],
  currentAudioSource: MediaStreamTrack
) => {
  let toReturn = '';
  if (!audioInputDevices || !currentAudioSource) {
    return toReturn;
  }
  for (let i = 0; i < audioInputDevices.length; i += 1) {
    if (audioInputDevices[i].label === currentAudioSource.label) {
      toReturn = audioInputDevices[i].deviceId;
      break;
    }
  }
  return toReturn;
};

/**
 * Checks if the current browser is WebKit.
 * @returns {boolean} - Returns `true` if the current browser is WebKit, else `false`.
 */
export const isWebKit = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes('safari') && !userAgent.includes('chrome');
};

/**
 * Checks if the current device is mobile.
 * @returns {boolean} - Returns `true` if the current device is mobile, else `false`.
 */
export const isMobile = () => {
  let hasTouchScreen = false;
  if ('maxTouchPoints' in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0;
  } else {
    // Ignoring this error which says matchMedia is always present, hence the statement is always true
    // But this breaks in travis where matchMedia throws a Reference error
    // @ts-expect-error: see above
    const mQ = window.matchMedia && matchMedia('(pointer:coarse)');
    if (mQ && mQ.media === '(pointer:coarse)') {
      hasTouchScreen = mQ.matches;
    } else if ('orientation' in window) {
      hasTouchScreen = true; // deprecated, but good fallback
    } else {
      // Only as a last resort, fall back to user agent sniffing
      // @ts-expect-error: ignoring for now due to navigator not being natively supported
      const UA = navigator.userAgent;
      hasTouchScreen =
        /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
        /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
    }
  }
  return hasTouchScreen;
};
