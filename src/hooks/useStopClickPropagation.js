import { useCallback } from 'react';

const useStopClickPropagation = () => useCallback((event) => event.stopPropagation(), []);

export default useStopClickPropagation;
