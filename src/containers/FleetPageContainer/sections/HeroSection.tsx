import React from 'react';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Hero, { HeroHeading, HeroTitle } from '../../../components/Hero';
import { GetFleetLandingPage_fleetLandingPage_sections_hero as IHeroData } from '../../../../generated/GetFleetLandingPage';
import config from '../config';

const HeroSection = ({ title, body, image }: IHeroData) => (
  <Hero withRequestCallbackForm>
    <HeroHeading text={title || ''} />
    <HeroTitle text={body || ''} />
    <Image
      optimisedHost={process.env.IMG_OPTIMISATION_HOST}
      dataTestId="fleet_hero-image"
      size="expand"
      src={image?.file?.url || config.heroImage.src}
      plain
      className="hero--image"
    />
  </Hero>
);

export default React.memo(HeroSection);
