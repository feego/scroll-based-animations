import { useClosestScrollValues } from './scroll-container/scrollConnectors';
import { useResizeDetector } from 'react-resize-detector';
import { useCallback, useMemo, useState } from 'react';

const useContentScrollProgress = (refs) => {
  const scrollValues = useClosestScrollValues();
  const [contentMeasurements, setContentMeasurements] = useState(refs.map(() => ({ topPositionRelativeToScrollContainer: 0, height: 0 })));
  const updatePositions = useCallback(
    () =>
      setContentMeasurements(
        refs.map((ref) => {
          const boundingClientRect = ref.current.getBoundingClientRect();
          const topPositionRelativeToScrollContainer = boundingClientRect.top + scrollValues.position.scrollTop;
          return {
            topPositionRelativeToScrollContainer,
            height: boundingClientRect.height,
          };
        })
      ),
    [refs, setContentMeasurements]
  );
  const contentScrollProgress = useMemo(
    () =>
      refs.map((ref, index) => {
        const measurements = contentMeasurements[index];
        const offset = scrollValues.position.scrollTop - measurements.topPositionRelativeToScrollContainer;
        const progress = measurements.height > 0 ? offset / measurements.height : 0;

        return { measurements, progress, offset };
      }),
    [refs, scrollValues, contentMeasurements]
  );

  refs.map((ref) => useResizeDetector({ onResize: updatePositions, targetRef: ref }));

  return contentScrollProgress;
};

export const getGlobalScrollProgress = ([element, ...otherElements], progress = 0, firstElementProgress = element.progress) =>
  element.progress >= 0 && element.progress <= 1
    ? progress + element.progress
    : otherElements.length === 0
    ? firstElementProgress
    : getGlobalScrollProgress(otherElements, progress + 1, firstElementProgress);

export const useContentScrollBottomProgress = (contentScrollProgress) => {
  const windowHeight = useClosestScrollValues((state, scrollValues) => scrollValues.boundingRect.height);
  const offset = contentScrollProgress.offset + windowHeight - contentScrollProgress.measurements.height;
  const progress = contentScrollProgress.measurements.height > 0 ? offset / contentScrollProgress.measurements.height : 0;

  return { offset, progress };
};

export default useContentScrollProgress;
