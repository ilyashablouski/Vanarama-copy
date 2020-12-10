import React, { FC, memo, useEffect } from 'react';
import Cookies from 'js-cookie';

const initialData = {
  customerId: undefined,
  BCUID: undefined,
  pageType: undefined,
  siteSection: undefined,
  visitorEmail: undefined,
  deviceType: undefined,
};

const DataLayer: FC = () => {
  useEffect(() => {
    const preparedData = { ...initialData, BCUID: Cookies.get('BCSessionID') };
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(preparedData);
    }
  }, []);
  return <></>;
};

export default memo(DataLayer);
