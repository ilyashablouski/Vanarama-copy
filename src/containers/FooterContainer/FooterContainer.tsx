import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import { FOOTER_DATA } from '../../utils/hardcodedData';
import Skeleton from '../../components/Skeleton';

const Footer = dynamic(() => import('../../components/Footer'), {
  loading: () => <Skeleton count={9} />,
});

const FooterContainer: FC = () => (
  <Footer primaryFooter={FOOTER_DATA.primaryFooter} />
);

export default FooterContainer;
