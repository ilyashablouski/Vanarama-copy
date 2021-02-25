import React from 'react';
// import dynamic from 'next/dynamic';
import Image from 'core/atoms/image';
import { GetFleetLandingPage_fleetLandingPage_sections_hero as IHeroData } from '../../../../generated/GetFleetLandingPage';
import config from '../config';
import Hero, {
  HeroTitle,
  HeroHeading,
  HeroPrompt,
} from '../../../components/Hero';
// import Skeleton from '../../../components/Skeleton';

// const Image = dynamic(
//   () => import('core/atoms/image'),
//   {
//     loading: () => <Skeleton count={4} />,
//   },
// );
// const HeroHeading = dynamic(
//   // @ts-ignore
//   () => import('../../../components/Hero').then(mod => mod.HeroHeading),
//   {
//     loading: () => <Skeleton count={2} />,
//   },
// );
// const HeroTitle = dynamic(
//   // @ts-ignore
//   () => import('../../../components/Hero').then(mod => mod.HeroTitle),
//   {
//     loading: () => <Skeleton count={2} />,
//   },
// );

const optimisationOptions = {
  height: 620,
  width: 620,
  quality: 59,
};

const HeroSection = ({ title, body, image, heroLabel }: IHeroData) => (
  <Hero withRequestCallbackForm>
    <HeroHeading text={title || ''} />
    <HeroTitle text={body || ''} />
    <div>
      <Image
        loadImage
        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
        optimisationOptions={optimisationOptions}
        dataTestId="fleet_hero-image"
        size="expand"
        src={image?.file?.url || config.heroImage.src}
        plain
        className="hero--image"
      />
    </div>
    {heroLabel?.[0]?.visible && (
      <HeroPrompt
        label={heroLabel?.[0]?.link?.text || ''}
        url={heroLabel?.[0]?.link?.url || ''}
        text={heroLabel?.[0]?.text || ''}
        btnVisible={heroLabel?.[0]?.link?.visible}
      />
    )}
  </Hero>
);

export default React.memo(HeroSection);
