import Cookies from 'js-cookie';
import React, { FC, memo } from 'react';

// keep default values undefined as JSON.stringify removes undefined props from the object;
const initialData = {
  customerId: undefined,
  BCUID: undefined,
  pageType: undefined,
  siteSection: undefined,
  visitorEmail: undefined,
  deviceType: undefined,
};

const DataLayer: FC = () => {
  const preparedData = {
    ...initialData,
    BCUID: Cookies.get('BCSessionID'),
  };

  const code = `window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(${JSON.stringify(preparedData)});
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
