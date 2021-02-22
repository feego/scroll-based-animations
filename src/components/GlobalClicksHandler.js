import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react';

const GlobalClicksHandlerContext = createContext({ subscribe: () => {}, unsubscribe: () => {} });

function GlobalClicksHandler(props) {
  const subscriptionsHandlersRef = useRef([]);
  const subscribe = useCallback(
    (handler) => {
      subscriptionsHandlersRef.current = [...subscriptionsHandlersRef.current, handler];
    },
    [subscriptionsHandlersRef]
  );
  const unsubscribe = useCallback(
    (handlerToUnsubscribe) => {
      subscriptionsHandlersRef.current = subscriptionsHandlersRef.current.filter((handler) => handler !== handlerToUnsubscribe);
    },
    [subscriptionsHandlersRef]
  );
  const onClick = useCallback((event) => {
    event.stopPropagation();
    subscriptionsHandlersRef.current.map((handler) => handler(event));
  }, []);
  const contextAPI = useMemo(() => ({ subscribe, unsubscribe }), [subscribe, unsubscribe]);

  return (
    <GlobalClicksHandlerContext.Provider value={contextAPI}>
      <div css={props.wrapperCSS} onClick={onClick} role="presentation">
        {props.children}
      </div>
    </GlobalClicksHandlerContext.Provider>
  );
}

export const useGlobalClicksHandler = (handler, dependencies) => {
  const globalClicksHandlerAPI = useContext(GlobalClicksHandlerContext);
  useEffect(() => {
    globalClicksHandlerAPI.subscribe(handler);
    return () => globalClicksHandlerAPI.unsubscribe(handler);
  }, dependencies);
};

export default GlobalClicksHandler;
