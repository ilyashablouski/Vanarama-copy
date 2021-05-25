// import Cookies from 'js-cookie';
import React, { FC, memo } from 'react';

const DataLayer: FC = () => {
  const code = `
  (function(window, document, section) {
    window.dataLayer = window.dataLayer || [];
    
    const dataLayerPush = window.dataLayer.push; 
    
    window.dataLayerHasGtmDomEvent = (dataLayer) => {
      return !!dataLayer.find(({event}) => event === 'gtm.dom');
    }
    
    window.dataLayer.push = function(...args) {
      const result = dataLayerPush.apply(this, args);

      if (window.dataLayerHasGtmDomEvent(args) && window.dataLayerCallback) {
        window.dataLayerCallback();
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
