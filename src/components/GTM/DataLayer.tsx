// import Cookies from 'js-cookie';
import React, { FC, memo } from 'react';

const DataLayer: FC = () => {
  /* React.useEffect(() => {
    Object.assign(preparedData, {
      deviceType: window.navigator.userAgent,
      BCUID: Cookies.get('BCSessionID'),
    });
  }, []); */

  /* const data = JSON.stringify(preparedData); */

  const code = `
  (function(window, document, section) {
    function getCookie(name) {
        var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : undefined;
        }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        BCUID: getCookie('BCSessionID'),
        deviceType: window.navigator.userAgent,
    });
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
