import React from 'react';
import ImageV2 from 'core/atoms/image/ImageV2';
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
        <ImageV2
          className="hero--image hero--image-fleet -pt-000"
          width={image?.file?.details.image.width ?? 840}
          height={image?.file?.details.image.height ?? 298}
          src={image?.file?.url || config.heroImage.src}
          dataTestId="fleet_hero-image"
          lazyLoad={false}
          optimisedHost
          size="expand"
          quality={70}
          plain
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
