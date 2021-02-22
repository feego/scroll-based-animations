import React, { useCallback, useRef } from 'react';
import { requestAnimationTimeout, cancelAnimationTimeout } from '../util/requestAnimationTimeout';

/**
 * Default timeout value for restoring pointer events after the scroll ends.
 */
export const DEFAULT_SCROLLING_TIMEOUT = 100;

const useOnScrollEndHandler = ({ scrollingTimeout = DEFAULT_SCROLLING_TIMEOUT, ...props }) => {
  const scrollingTimeoutIdRef = useRef();

  /**
   * Restores the scroll container's pointer events.
   */
  const handleScrollEnd = useCallback(() => {
    scrollingTimeoutIdRef.current = undefined;
    props.onScrollEnd();
  }, [scrollingTimeoutIdRef, props.onScrollEnd]);

  /**
   * Clears an ongoing timeout, if one exists, triggered by a scroll event and registers a new one.
   */
  const refreshScrollingTimeoutId = useCallback(() => {
    if (scrollingTimeoutIdRef.current !== undefined) {
      cancelAnimationTimeout(scrollingTimeoutIdRef.current);
    }

    scrollingTimeoutIdRef.current = requestAnimationTimeout(handleScrollEnd, props.scrollingTimeout);
  }, [scrollingTimeoutIdRef, handleScrollEnd, props.scrollingTimeout]);

  const handleScroll = useCallback(
    (...args) => {
      refreshScrollingTimeoutId();
      props.onScroll(...args);
    },
    [refreshScrollingTimeoutId, props.onScroll]
  );

  return { ...props, scrollingTimeout, onScroll: handleScroll };
};

export default useOnScrollEndHandler;
