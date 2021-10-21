import React from 'react';
import dynamic from 'next/dynamic';
import config from '../../InsurancePageContainer/config';
import Skeleton from '../../../components/Skeleton';
import HeroCurve from '../../../components/Hero/HeroCurve';
import { GenericPageQuery_genericPage_sections_hero_image as IHeroImage } from '../../../../generated/GenericPageQuery';
import { HeroHeading, HeroTitle } from '../../../components/Hero';

const Image = dynamic(() => import('core/atoms/image'), {
  loading: () => <Skeleton count={2} />,
});

interface IProps {
  title: string;
  body: string;
  image: IHeroImage | null;
}

const DerangedHeroSection: React.FC<IProps> = ({ title, body, image }) => {
  return (
    <div className="row:bg-hero">
      <div className="row:hero">
        <div className="hero--left">
          <Image
            src="/Assets/images/deranged/deranged-logo.png"
            size="small"
            alt="Deranged icon"
            plain
          />
          <div className="row:title">
            <HeroHeading
              text={title || ''}
              color="black"
              className="hero--deranged-text"
            />
            <HeroTitle text={body || ''} className="hero--deranged-text" />
          </div>
        </div>
        <div className="hero--right hero--deranged-null-order">
          <Image
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            alt="Hero Image"
            size="expand"
            src={image?.file?.url || config.heroImage.src}
            plain
            className="hero--image hero--deranged-image"
          />
        </div>
        <div className="hero--decals">
          <HeroCurve />
        </div>
      </div>
    </div>
  );
};

export default React.memo(DerangedHeroSection);
