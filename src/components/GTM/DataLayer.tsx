// import Cookies from 'js-cookie';
import React, { FC, memo } from 'react';

const DataLayer: FC = () => {
  const code = `
  (function(window, document, section) {
    window.dataLayer = window.dataLayer || [];
    
    const pushEvent = window.dataLayer.push; 
    
    window.hasGtmDomEvent = (dataLayer) => {
      return !!dataLayer.find(({event}) => event === 'gtm.dom');
    }
    
    window.dataLayerCallback = null;
    window.dataLayer.push = function(...args) {
      const result = pushEvent.apply(this, args);

      if (window.hasGtmDomEvent(args)) {
        window.dataLayerCallback && window.dataLayerCallback();
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
