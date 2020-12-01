import React, { FC } from 'react';
import Footer from '../../components/Footer';
import { FOOTER_DATA } from '../../utils/hardcodedData';

const FooterContainer: FC = () => (
  <Footer primaryFooter={FOOTER_DATA.primaryFooter} />
);

export default FooterContainer;
