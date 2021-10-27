import React from 'react';
import Image from 'core/atoms/image';
import {
  GenericPageQuery_genericPage_sections_hero_heroLabel as IHeroLabel,
  GenericPageQuery_genericPage_sections_hero_image as IHeroImage,
} from '../../../../generated/GenericPageQuery';
import config from '../config';
import Hero, {
  HeroTitle,
  HeroHeading,
  HeroPrompt,
} from '../../../components/Hero';

const optimisationOptions = {
  height: 620,
  width: 620,
  quality: 59,
};

interface IProps {
  title: string | null;
  body: string | null;
  image: IHeroImage | null;
  heroLabel?: (IHeroLabel | null)[] | null;
}

const HeroSection: React.FC<IProps> = ({ title, body, image, heroLabel }) => {
  return (
    <Hero withRequestCallbackForm>
      <HeroHeading text={title || ''} />
      <HeroTitle text={body || ''} />
      <div>
        <Image
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          optimisationOptions={optimisationOptions}
          dataTestId="fleet_hero-image"
          size="expand"
          src={image?.file?.url || config.heroImage.src}
          plain
          className="hero--image hero--image-fleet"
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
};

export default React.memo(HeroSection);
