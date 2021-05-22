import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';
import Skeleton from '../../components/Skeleton';
import {
  getLocalStorage,
  removeLocalStorage,
} from '../../utils/windowLocalStorage';
// eslint-disable-next-line import/no-unresolved
const FOOTER_DATA = require('../../deps/data/footerData.json');

const Footer = dynamic(() => import('../../components/Footer'), {
  loading: () => <Skeleton count={9} />,
});

const FooterContainer = () => {
  const [footerData, setFooterData] = useState(FOOTER_DATA.primaryFooter);
  useEffect(() => {
    const activePartnership = Cookies.get('activePartnership');
    const partnerFooterData = getLocalStorage('partnerFooter');
    if (activePartnership && partnerFooterData) {
      setFooterData(JSON.parse(partnerFooterData));
    }
    // if partnership is no longer active clear partner local storage
    if (!activePartnership && partnerFooterData) {
      removeLocalStorage('partnerFooter');
    }
  }, []);
  return <Footer primaryFooter={footerData} />;
};

export default FooterContainer;
