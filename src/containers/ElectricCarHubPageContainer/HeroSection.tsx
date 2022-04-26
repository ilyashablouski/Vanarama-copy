import React, { FC, memo } from 'react';
import dynamic from 'next/dynamic';
import { HeroEv as Hero, HeroPrompt } from '../../components/Hero';
import NewLeaseOfLifePriceHeader from '../../components/NewLeaseOfLifePriceHeader';
import Skeleton from '../../components/Skeleton';
import { GenericPageQuery_genericPage_sectionsAsArray } from '../../../generated/GenericPageQuery';
import { Nullable } from '../../types/common';

const ImageV2 = dynamic(() => import('core/atoms/image/ImageV2'), {
  loading: () => <Skeleton count={4} />,
});
interface IProps {
  sectionsAsArray: Nullable<GenericPageQuery_genericPage_sectionsAsArray>;
}

const HeroSection: FC<IProps> = ({ sectionsAsArray }) => {
  const heroSection = sectionsAsArray?.hero?.[0];
  const heroImage = heroSection?.image?.file;

  return (
    <Hero>
      <div className="hero--left">
        <NewLeaseOfLifePriceHeader
          title={heroSection?.title}
          body={heroSection?.body}
        />
        {heroSection?.heroLabel?.[0]?.visible && (
          <HeroPrompt
            label={heroSection?.heroLabel?.[0]?.link?.text || ''}
            url={heroSection?.heroLabel?.[0]?.link?.url || ''}
            text={heroSection?.heroLabel?.[0]?.text || ''}
            btnVisible={heroSection?.heroLabel?.[0]?.link?.visible}
          />
        )}
      </div>
      <div className="hero--right">
        <ImageV2
          plain
          quality={70}
          size="expand"
          optimisedHost
          lazyLoad={false}
          className="hero--image -pt-000"
          width={heroImage?.details.image.width ?? 1710}
          height={heroImage?.details.image.height ?? 1278}
          src={
            heroImage?.url ||
            `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`
          }
        />
      </div>
    </Hero>
  );
};

export default memo(HeroSection);
