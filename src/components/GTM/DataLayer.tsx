// import Cookies from 'js-cookie';
import React, { FC, memo } from 'react';

// keep default values undefined as JSON.stringify removes undefined props from the object;
const initialData = {
  customerId: undefined,
  BCUID: undefined,
  pageType: undefined,
  siteSection: undefined,
  visitorEmail: undefined,
};

const DataLayer: FC = () => {
  const preparedData = {
    ...initialData,
  };

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
        return v ? v[2] : null;
        }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        BCUID: getCookie('BCSessionID'),
        siteSection: section,
        visitorEmail: email,
        customerId: custId,
        pageType: pType
        deviceType: window.navigator.userAgent,
    });
  })(window, document, '${preparedData.siteSection}', '${preparedData.visitorEmail}', '${preparedData.customerId}', '${preparedData.pageType}');
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
