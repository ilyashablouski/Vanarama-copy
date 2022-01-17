import dynamic from 'next/dynamic';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const Image = dynamic(() => import('core/atoms/image'), {
  loading: () => <Skeleton count={1} />,
});

interface IPartnershipLogo {
  title?: string;
  logo: string;
  imageAlt?: string;
}

const PartnershipLogo = ({ title, logo, imageAlt }: IPartnershipLogo) => (
  <div className="partnership-logo">
    <p className="partnership-logo--heading">
      {title || 'In partnership with'}
    </p>
    <Image
      optimisedHost={process.env.IMG_OPTIMISATION_HOST}
      alt={imageAlt || 'Partnership Image'}
      dataTestId="partnership_hero-logo"
      src={logo}
      plain
      className="partnership-logo--heading"
      size="large"
      dataUiTestId="partnership_hero-logo"
    />
  </div>
);

export default PartnershipLogo;
