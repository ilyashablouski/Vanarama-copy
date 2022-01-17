import React from 'react';
import dynamic from 'next/dynamic';
import Skeleton from 'react-loading-skeleton';

import { Partner_partner_logo_file as IPartnerLogoFile } from '../../../../generated/Partner';
import { Nullish } from '../../../types/common';

const ImageV2 = dynamic(() => import('core/atoms/image/ImageV2'), {
  loading: () => <Skeleton count={1} />,
});

interface IPartnershipLogo {
  title?: string;
  logo: Nullish<IPartnerLogoFile>;
  imageAlt?: string;
}

const PartnershipLogo = ({ title, logo, imageAlt }: IPartnershipLogo) => (
  <div className="partnership-logo">
    <p className="partnership-logo--heading">
      {title || 'In partnership with'}
    </p>
    <ImageV2
      lazyLoad={false}
      className="partnership-logo--heading"
      dataTestId="partnership_hero-logo"
      width={logo?.details.image.width}
      height={logo?.details.image.height}
      src={logo?.url ?? ''}
      alt={imageAlt ?? 'Partnership Image'}
      size="large"
      plain
    />
  </div>
);

export default PartnershipLogo;
