import { useState, useEffect, createContext, useCallback, useContext } from 'react';
import { Breakpoints } from '../styles/contants';

const defaultBreakpoint = {
  name: Object.keys(Breakpoints)[0],
  value: Object.values(Breakpoints)[0],
  isServerValue: true,
};

export const MediaContext = createContext(defaultBreakpoint);

const matchMediaQueries =
  typeof window !== 'undefined'
    ? Object.entries(Breakpoints).map(([name, value]) => ({
        name,
        value,
        query: window.matchMedia(`(min-width: ${value}px)`),
      }))
    : [];

export const MediaContextProvider = ({ children }) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState(defaultBreakpoint);

  const handleWindowResize = useCallback(() => {
    for (const { name, value, query } of matchMediaQueries) {
      if (query.matches) {
        setCurrentBreakpoint({ name, value, isServerValue: false });
      }
    }
  });

  useEffect(() => {
    for (const { query } of matchMediaQueries) {
      query.addListener(handleWindowResize);
    }

    handleWindowResize();

    return () => {
      for (const { query } of matchMediaQueries) {
        query.removeListener(handleWindowResize);
      }
    };
  }, []);

  return <MediaContext.Provider value={currentBreakpoint}>{children}</MediaContext.Provider>;
};

const useMinWidthMediaQuery = () => useContext(MediaContext);

export default useMinWidthMediaQuery;
