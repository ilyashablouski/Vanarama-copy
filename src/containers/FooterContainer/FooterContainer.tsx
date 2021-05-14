import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { getObjectFromSessionStorage } from 'utils/windowSessionStorage';
import Skeleton from '../../components/Skeleton';
// eslint-disable-next-line import/no-unresolved
const FOOTER_DATA = require('../../deps/data/footerData.json');

const Footer = dynamic(() => import('../../components/Footer'), {
  loading: () => <Skeleton count={9} />,
});

const FooterContainer = () => {
  const [footerData, setFooterData] = useState(FOOTER_DATA.primaryFooter);
  useEffect(() => {
    const partnerFooterData = getObjectFromSessionStorage('partnerFooter');
    if (partnerFooterData) {
      setFooterData(partnerFooterData);
    }
  }, []);
  return <Footer primaryFooter={footerData} />;
};

export default FooterContainer;
