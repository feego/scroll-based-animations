import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { throttleWithRAF } from '../../utils/throttle';
import ScrollContext from './ScrollContext';
import scrollerTypes from './scrollerTypes';

/**
 * Creates a hook that connects the scroll context api for a given scroller type.
 *
 * @param {String} scrollerType - Scroller type.
 *
 * @returns {Function} Hook.
 */
const createUseScrollerAPI = (scrollerType) => () => useContext(ScrollContext)[scrollerType];

/**
 * Hook that connects the scroll context api of the app's root scroller.
 */
export const useRootScrollerAPI = createUseScrollerAPI(scrollerTypes.ROOT);

/**
 * Hook that connects the scroll context api of the scroller closest up in the component tree.
 */
export const useClosestScrollerAPI = createUseScrollerAPI(scrollerTypes.CLOSEST);

/**
 * Builds the props to be injected according to the current scrolling state and the component props.
 *
 * @param {Object} state - State object.
 * @param {Object} scrollState - Scroll state.
 *
 * @returns {Object} Props to be injected.
 */
export const defaultScrollStateReducer = (state, scrollState) => scrollState;

const createUseScrollValues = (scrollerType) => {
  const useScrollerAPI = createUseScrollerAPI(scrollerType);

  return (scrollStateReducer = defaultScrollStateReducer, scrollEventThrottler = throttleWithRAF) => {
    const listenerRef = useRef();
    const scrollerAPI = useScrollerAPI();
    const getScrollValues = useCallback(
      () => ({
        position: scrollerAPI.getScrollPosition(),
        boundingRect: scrollerAPI.getBoundingRect(),
      }),
      [scrollerAPI]
    );
    const [state, setState] = useState(scrollStateReducer(undefined, getScrollValues()));
    const handleScroll = useCallback(
      scrollEventThrottler(() => setState((state) => scrollStateReducer(state, getScrollValues()))),
      [getScrollValues, setState, scrollStateReducer, scrollEventThrottler]
    );

    useEffect(() => {
      scrollerAPI.registerScrollListener(listenerRef, handleScroll);
      return () => scrollerAPI.unregisterScrollListener(listenerRef);
    });

    return state;
  };
};

export const useRootScrollValues = createUseScrollValues(scrollerTypes.ROOT);
export const useClosestScrollValues = createUseScrollValues(scrollerTypes.CLOSEST);
