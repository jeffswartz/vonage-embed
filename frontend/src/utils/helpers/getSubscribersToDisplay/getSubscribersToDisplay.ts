import { SubscriberWrapper } from '../../../types/session';
import { isMobile } from '../../../util';

/**
 * Util to get the maximum number of subscribers we should show on screen based on layout mode and device type
 * @param {boolean} isViewingLargeTile - is there a screenshare of large active speaker tile on screen
 * @returns {number} maxSubscriberOnScreenCount - maximum number of subscribers to display
 */
const getMaxSubscriberOnScreenCount = (isViewingLargeTile: boolean): number => {
  if (isMobile()) {
    return isViewingLargeTile ? 2 : 3;
  }
  return isViewingLargeTile ? 5 : 9;
};

/**
 * Util to separate subscribers into two arrays, the subscribers to display and subscribers that are hidden
 * @param {SubscriberWrapper[]} subscriberWrappers - SubscriberWrapper in display priority order
 * @param {boolean} isViewingLargeTile - is there a large tile (screenshare or active-speaker)
 * @returns {*}  {{
 *   hiddenSubscribers: SubscriberWrapper[]; - Subscribers to be hidden
 *   subscribersOnScreen: SubscriberWrapper[]; - Subscribers to be shown
 * }}
 */
const getSubscribersToDisplay = (
  subscriberWrappers: SubscriberWrapper[],
  isViewingLargeTile: boolean
): {
  hiddenSubscribers: SubscriberWrapper[];
  subscribersOnScreen: SubscriberWrapper[];
} => {
  const maxSubscribersOnScreenCount = getMaxSubscriberOnScreenCount(isViewingLargeTile);
  const shouldHideSubscribers = subscriberWrappers.length > maxSubscribersOnScreenCount;

  // If hiding subscribers we slice at max - 1 to make room for hidden participant tile.
  // E.g we either show 3 subs or 2 and a hidden participants tile, hence visible subscriber array length is
  // shorter by one when hiding
  const subscribersOnScreen = shouldHideSubscribers
    ? subscriberWrappers.slice(0, maxSubscribersOnScreenCount - 1)
    : subscriberWrappers;

  const hiddenSubscribers = shouldHideSubscribers
    ? subscriberWrappers.slice(maxSubscribersOnScreenCount - 1, subscriberWrappers.length)
    : [];
  return { subscribersOnScreen, hiddenSubscribers };
};

export default getSubscribersToDisplay;
