import { useEffect } from 'react';

/**
 * Returns whether smooth scrolling is or isn't natively supported.
 *
 * @returns {Boolean} Supported flag.
 */
const isSmoothScrollSupported = () => 'scrollBehavior' in document.documentElement.style;

const useSmoothScrollPolyfill = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && !isSmoothScrollSupported()) {
      // Need to use require.ensure, since dynamic import syntax is not supported  on node modules by our babel config.
      require.ensure(['smoothscroll-polyfill'], (require) => {
        const { polyfill } = require('smoothscroll-polyfill');

        polyfill();
      });
    }
  });
};

export default useSmoothScrollPolyfill;
