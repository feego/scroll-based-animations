import React, { createContext, useCallback, useContext, useMemo, useRef } from 'react';

export const initialScrollPosition = {
  scrollTop: 0,
  scrollLeft: 0,
  scrollWidth: 0,
  scrollHeight: 0,
};

export const initialBoundingRect = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: 0,
  height: 0,
};

const defaultScrollerAPI = {
  registerScrollListener: () => {},
  unregisterScrollListener: () => {},
  getScrollPosition: () => initialScrollPosition,
  getBoundingRect: () => initialBoundingRect,
  scrollTo: () => {},
};

const defaultContextValue = {
  // Scroll container instances highest in the component tree set this flag to true,
  // which we then use to prevent the rubber band scroll animations in iOS.
  hasRootContainer: false,
  closestScroller: defaultScrollerAPI,
  rootScroller: defaultScrollerAPI,
};

/**
 * Scroll context object, that contains both ScrollContext.Provider and ScrollContext.Consumer.
 */
const ScrollContext = createContext(defaultContextValue);

export const useScrollerAPI = ({ getScrollPosition, getBoundingRect, scrollTo }) => {
  const registeredScrollListenersRef = useRef([]);

  /**
   * Register a given component that wants to be notified when scroll events occur.
   *
   * @param {Component} component - Component instance.
   * @param {Function} handler - Component handler.
   *
   * @returns {undefined} Undefined.
   */
  const registerScrollListener = useCallback((component, handler) => registeredScrollListenersRef.current.push({ component, handler }), [
    registeredScrollListenersRef,
  ]);

  /**
   * Unregisters a given component that no longer wants to be notified when scroll events occur.
   *
   * @param {Component} component - Component instance.
   *
   * @returns {undefined} Undefined.
   */
  const unregisterScrollListener = useCallback(
    (component) => {
      registeredScrollListenersRef.current = registeredScrollListenersRef.current.filter(
        (subscription) => subscription.component !== component
      );
    },
    [registeredScrollListenersRef]
  );

  /**
   * Calls the handlers of all registered scroll event listeners.
   */
  const notifySubscribedListeners = useCallback(() => {
    for (const subscription of registeredScrollListenersRef.current) {
      subscription.handler();
    }
  }, [registeredScrollListenersRef]);

  /**
   * Builds the context API for interacting with this scroll container.
   */
  const scrollerAPI = useMemo(
    () => ({
      registerScrollListener,
      unregisterScrollListener,
      getScrollPosition,
      getBoundingRect,
      scrollTo,
    }),
    [registerScrollListener, unregisterScrollListener, getScrollPosition, getBoundingRect, scrollTo]
  );

  return [scrollerAPI, notifySubscribedListeners];
};

export const ScrollContextProvider = ({ scrollerAPI, children }) => {
  const scrollContext = useContext(ScrollContext);
  const scrollContextToPassDown = useMemo(
    () =>
      scrollContext.hasRootContainer
        ? { ...scrollContext, closestScroller: scrollerAPI }
        : { hasRootContainer: true, closestScroller: scrollerAPI, rootScroller: scrollerAPI },
    [scrollerAPI, scrollContext.hasRootContainer]
  );

  return <ScrollContext.Provider value={scrollContextToPassDown}>{children}</ScrollContext.Provider>;
};

export default ScrollContext;
