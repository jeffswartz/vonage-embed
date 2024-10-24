import { useState } from 'react';
import { isEqual } from 'lodash';
import getSubscribersInDisplayOrder from '../utils/helpers/getSubscribersInDisplayOrder';
import { SubscriberWrapper } from '../types/session';

/**
 * Hook to get SubscriberWrappers in display order. This hook keeps the state of previous subscribers on screen
 * and uses this to determine how to display subscribers such that they maintain they're position on screen whilst
 * finding the optimal position to place new subscribers.
 * @param {SubscriberWrapper[]} subscribersOnScreen - an array of SubscriberWrappers that should be displayed
 * @returns {SubscriberWrapper[]} subscribersInDisplayOrder - SubscriberWrappers to be displayed in display order
 */
const useSubscribersInDisplayOrder = (subscribersOnScreen: SubscriberWrapper[]) => {
  const [previousDisplayOrder, setPreviousDisplayOrder] = useState<SubscriberWrapper[]>([]);

  const subscribersInDisplayOrder = getSubscribersInDisplayOrder(
    subscribersOnScreen,
    previousDisplayOrder
  );

  if (!isEqual(subscribersInDisplayOrder, previousDisplayOrder)) {
    // We must check that this value has changed before calling setState or we can cause an infinite render loop
    setPreviousDisplayOrder(subscribersInDisplayOrder);
  }
  return subscribersInDisplayOrder;
};

export default useSubscribersInDisplayOrder;
