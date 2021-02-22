import React, { useCallback, useMemo, useRef, useState } from 'react';
import { defaultScrollPosition, defaultBoundingRect, serializeScrollPosition, serializeBoundingRect } from '../util/dimensions';
import Styles from './styles';

const useScrollerController = ({
  lock,
  className,
  contentStyle,
  contentCSS,
  children,
  passiveScrollEvent,
  innerRef = () => {},
  noPointerEventsWhileScrolling,
  scrollContainers,
  scrollingTimeout,
  onScroll,
  onScrollEnd,
  hasRootContainer,
  useBodyScroller,
  ...remainingProps
}) => {
  const containerRef = useRef(null);
  const [state, setState] = useState({ pointerEvents: null });

  /**
   * Returns an object with the dimensions of the wrapped scroll container.
   *
   * @returns {Object} Scroll container dimensions.
   */
  const getBoundingRect = useCallback(
    () => (containerRef.current ? serializeBoundingRect(containerRef.current.getBoundingClientRect()) : defaultBoundingRect),
    [containerRef]
  );

  /**
   * Returns the scroll position data of the wrapped scroll container.
   *
   * @returns {Object} Scroll position data.
   */
  const getScrollPosition = useCallback(
    () => (containerRef.current ? serializeScrollPosition(containerRef.current) : defaultScrollPosition),
    [containerRef]
  );

  /**
   * Scrolls the scroll container.
   *
   * @returns {undefined} Undefined.
   */
  const scrollTo = useCallback((...args) => containerRef.current.scroll(...args), [containerRef]);

  /**
   * Disables the pointer events of the scroll container.
   *
   * @returns {undefined} Undefined.
   */
  const disablePointerEvents = useCallback(() => setState({ pointerEvents: 'none' }), [setState]);

  /**
   * Restores the pointer events of the scroll container.
   *
   * @returns {undefined} Undefined.
   */
  const enablePointerEvents = useCallback(() => setState({ pointerEvents: null }), [setState]);

  /**
   * Attaches a given scroll event handler to the scroll container.
   *
   * @param {Function} scrollHandler - Scroll event handler.
   */
  const attachScrollListener = useCallback(
    (scrollHandler) => {
      if (containerRef.current) {
        containerRef.current.addEventListener('scroll', scrollHandler, { passive: passiveScrollEvent });
      }
    },
    [containerRef]
  );

  /**
   * Detaches a given scroll event handler from the scroll container.
   *
   * @param {Function} scrollHandler - Scroll event handler.
   */
  const detachScrollListener = useCallback(
    (scrollHandler) => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', scrollHandler);
      }
    },
    [containerRef]
  );

  /**
   * Stores the ref of the scroll container element.
   *
   * @param {Object} ref - Element ref.
   */
  const handleRef = useCallback(
    (ref) => {
      containerRef.current = ref;
      innerRef(ref);
    },
    [containerRef, innerRef]
  );

  const contentStyleValue = useMemo(
    () => ({
      ...contentStyle,
      pointerEvents: state.pointerEvents,
    }),
    [state.pointerEvents]
  );

  return {
    ...remainingProps,
    scrollTo,
    getBoundingRect,
    getScrollPosition,
    attachScrollListener,
    detachScrollListener,
    disablePointerEvents,
    enablePointerEvents,
    children: (
      <div ref={handleRef} css={[Styles.wrapper, lock && Styles.lockScroll]} {...remainingProps}>
        <div css={[Styles.content, contentCSS]} style={contentStyleValue}>
          {children}
        </div>
      </div>
    ),
  };
};

export default useScrollerController;
