import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import Skeleton from '../../components/Skeleton';
// eslint-disable-next-line import/no-unresolved
const FOOTER_DATA = require('../../deps/data/footerData.json');

const Footer = dynamic(() => import('../../components/Footer'), {
  loading: () => <Skeleton count={9} />,
});

const FooterContainer: FC = () => (
  <Footer primaryFooter={FOOTER_DATA.primaryFooter} />
);

export default FooterContainer;
