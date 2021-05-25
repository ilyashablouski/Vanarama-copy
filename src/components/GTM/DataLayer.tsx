// import Cookies from 'js-cookie';
import React, { FC, memo } from 'react';

const DataLayer: FC = () => {
  const code = `
  (function(window, document, section) {
    window.dataLayer = window.dataLayer || [];
    
    const pushEvent = window.dataLayer.push;
    
    function isDomReady() {
      return !!this.find(({event}) => event === 'gtm.dom');
    }
    
    window.dataLayer.isDomReady = isDomReady;
    window.dataLayer.push = function(...args) {
      const result = pushEvent.apply(this, args);

      if (isDomReady.call(args)) {
        this.callback && this.callback();
      }

      return result;
    };
  })(window, document);
  `;

  return process.env.GTM_ID ? (
    <script
      type="text/javascript"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: code,
      }}
    />
  ) : null;
};

export default memo(DataLayer);
