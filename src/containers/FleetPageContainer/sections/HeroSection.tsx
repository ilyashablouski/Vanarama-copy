import React from 'react';
import dynamic from 'next/dynamic';
import Hero from '../../../components/Hero';
import { GetFleetLandingPage_fleetLandingPage_sections_hero as IHeroData } from '../../../../generated/GetFleetLandingPage';
import config from '../config';
import Skeleton from '../../../components/Skeleton';

const Image = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/image'),
  {
    loading: () => <Skeleton count={4} />,
  },
);
const HeroHeading = dynamic(
  // @ts-ignore
  () => import('../../../components/Hero').then(mod => mod.HeroHeading),
  {
    loading: () => <Skeleton count={2} />,
  },
);
const HeroTitle = dynamic(
  // @ts-ignore
  () => import('../../../components/Hero').then(mod => mod.HeroTitle),
  {
    loading: () => <Skeleton count={2} />,
  },
);

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
