import { Dimensions } from '@opentok/client';
import { throttle } from 'lodash';
import ResizeObserverPolyfill from 'resize-observer-polyfill';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

/**
 * Util hook to observe element resize changes and get element dimensions as react state.
 * State changes are throttled for performance
 * @param {object} props - the props for this hook
 * @param {MutableRefObject<HTMLElement | null>} props.elementRef - HTMLElement ref object
 * @returns {Dimensions} - element dimensions
 */
const useElementDimensions = ({
  elementRef,
}: {
  elementRef: MutableRefObject<HTMLElement | null>;
}): Dimensions => {
  const [elementDimensions, setElementDimensions] = useState<Dimensions>({ width: 0, height: 0 });
  const resizeObserver = useRef<ResizeObserver | undefined>();

  useEffect(() => {
    const elementCurrent = elementRef.current;
    if (elementCurrent && !resizeObserver.current) {
      const throttledSetDimensions = throttle(() => {
        if (elementCurrent) {
          setElementDimensions({
            height: elementCurrent.offsetHeight!,
            width: elementCurrent.offsetWidth!,
          });
        }
      }, 20);
      resizeObserver.current = new ResizeObserverPolyfill(() => {
        throttledSetDimensions();
      });
      resizeObserver.current?.observe(elementCurrent);
    }
    return () => {
      if (elementCurrent) {
        resizeObserver.current?.unobserve(elementCurrent);
      }
    };
  }, [elementRef]);
  return elementDimensions;
};

export default useElementDimensions;
