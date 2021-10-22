import React from 'react';

import Text from 'core/atoms/text';

import { IClassNamesProps } from '../../models/IClassNamesProps';
import { ILinkProps } from '../../components/RouterLink/interface';

import RouterLink from '../../components/RouterLink';

const INSURANCE_LINK: ILinkProps = {
  href: '/car-leasing/free-car-insurance',
  label: 'Find Out More',
};
const LINK_CLASS_NAMES: IClassNamesProps = {
  color: 'black',
  size: 'regular',
};

const FreeInsuranceBanner = () => (
  <div className="pdp-free-insurance-banner">
    <Text className="pdp-free-insurance-banner--text" tag="span" color="black">
      1 Year&apos;s FREE Insurance
    </Text>
    <RouterLink
      className="pdp-free-insurance-banner--link"
      link={INSURANCE_LINK}
      classNames={LINK_CLASS_NAMES}
    />
  </div>
);

export default FreeInsuranceBanner;
