const DEFAULT_INTERVAL = 100;

export const makeDelayFunction = (timeout) => (method) => setTimeout(method, timeout);
const defaultDelayFunction = makeDelayFunction(DEFAULT_INTERVAL);

export const makeThrottler = (delayFunction = defaultDelayFunction) => (decoratedMethod) => {
  let isScheduled = false;
  let isFirstRun = true;
  let memoizedValue;

  const makeDecoratedMethodThunk = (...args) => () => {
    isScheduled = false;
    memoizedValue = decoratedMethod(...args);
  };

  return (...args) => {
    if (!isScheduled) {
      isScheduled = true;
      delayFunction(makeDecoratedMethodThunk(...args));
    }

    if (isFirstRun) {
      isFirstRun = false;
      memoizedValue = decoratedMethod(...args);
    }

    return memoizedValue;
  };
};

export const throttleWithRAF = makeThrottler(typeof window !== 'undefined' ? window.requestAnimationFrame : defaultDelayFunction);

/*
 * Throttle.
 */
export default function throttle(decoratedMethod, interval = DEFAULT_INTERVAL) {
  return makeThrottler((method) => setTimeout(method, interval))(decoratedMethod);
}
