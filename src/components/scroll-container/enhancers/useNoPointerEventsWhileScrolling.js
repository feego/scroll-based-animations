import { useCallback } from 'react';

/**
 * Hook that enhances ScrollContainer's behavior disabling the pointer events in it while scrolling.
 */
const useNoPointerEventsWhileScrolling = (props) => {
  const onScroll = useCallback(
    (...args) => {
      props.disablePointerEvents();
      props.onScroll(...args);
    },
    [props.disablePointerEvents, props.onScroll]
  );
  const onScrollEnd = useCallback(
    (...args) => {
      props.enablePointerEvents();
      props.onScrollEnd(...args);
    },
    [props.enablePointerEvents, props.onScrollEnd]
  );

  return {
    ...props,
    onScroll,
    onScrollEnd,
  };
};

export default useNoPointerEventsWhileScrolling;
