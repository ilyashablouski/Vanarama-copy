import React, { FC, memo } from 'react';
import dynamic from 'next/dynamic';
import { HeroEv as Hero, HeroPrompt } from '../../components/Hero';
import NewLeaseOfLifePriceHeader from '../../components/NewLeaseOfLifePriceHeader';
import Skeleton from '../../components/Skeleton';
import { GenericPageQuery_genericPage_sectionsAsArray } from '../../../generated/GenericPageQuery';
import { Nullable } from '../../types/common';

const Image = dynamic(() => import('core/atoms/image'), {
  loading: () => <Skeleton count={4} />,
});
interface IProps {
  sectionsAsArray: Nullable<GenericPageQuery_genericPage_sectionsAsArray>;
}
const optimisationOptions = {
  height: 620,
  width: 620,
  quality: 59,
};

const HeroSection: FC<IProps> = ({ sectionsAsArray }) => (
  <Hero>
    <div className="hero--left">
      <NewLeaseOfLifePriceHeader
        title={sectionsAsArray?.hero?.[0]?.title}
        body={sectionsAsArray?.hero?.[0]?.body}
      />
      {sectionsAsArray?.hero?.[0]?.heroLabel?.[0]?.visible && (
        <HeroPrompt
          label={sectionsAsArray?.hero?.[0]?.heroLabel?.[0]?.link?.text || ''}
          url={sectionsAsArray?.hero?.[0]?.heroLabel?.[0]?.link?.url || ''}
          text={sectionsAsArray?.hero?.[0]?.heroLabel?.[0]?.text || ''}
          btnVisible={sectionsAsArray?.hero?.[0]?.heroLabel?.[0]?.link?.visible}
        />
      )}
    </div>
    <div className="hero--right">
      <Image
        lazyLoad
        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
        optimisationOptions={optimisationOptions}
        className="hero--image"
        plain
        size="expand"
        src={
          sectionsAsArray?.hero?.[0]?.image?.file?.url ||
          'https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/connect.png'
        }
      />
    </div>
  </Hero>
);

export default memo(HeroSection);
