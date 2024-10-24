/**
 * The base URL determined by the current environment.
 * @constant {string}
 */
export const API_URL = window.location.origin.includes('localhost')
  ? 'http://localhost:3345'
  : window.location.origin;

/**
 * An object representing various states for device access.
 * @constant {object}
 * @property {string} PENDING - Status when the access to the device is pending.
 * @property {string} ACCEPTED - Status when the access to the device has been granted.
 * @property {string} REJECTED - Status when the access to the device was denied.
 */
export const DEVICE_ACCESS_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
};

/**
 * A message to alert the user that their microphone is muted.
 * @constant {string}
 */
export const MUTED_ALERT_MESSAGE =
  'Are you talking? Your mic is off. Click on the mic to turn it on.';

/**
 * The text shadow style used for display purposes.
 * @constant {string}
 */
export const TEXT_SHADOW = '[text-shadow:_0_1px_2px_rgb(0_0_0_/_60%)]';

/**
 * The duration in milliseconds for which emojis are displayed.
 * @constant {number}
 */
export const EMOJI_DISPLAY_DURATION = 5_000;
