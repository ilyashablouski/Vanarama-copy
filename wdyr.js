/**
 * WDYR (why-did-you-render) helps locate unnecessary re-renders.
 *
 * @see https://github.com/welldone-software/why-did-you-render
 * @see https://github.com/vercel/next.js/tree/canary/examples/with-why-did-you-render
 */
import React from 'react';

if (process.env.NODE_ENV === 'development') {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line global-require
    const whyDidYouRender = require('@welldone-software/why-did-you-render');

    whyDidYouRender(React, {
      // tracking is disabled by default
      trackAllPureComponents: false,
      trackHooks: false,
    });
  }
}
