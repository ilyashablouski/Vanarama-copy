import React from 'react';

import Image from 'core/atoms/image/Image';

import { HomePageData } from '../../../generated/HomePageData';
import { filterList as IFilterList } from '../../../generated/filterList';
import { freeInsuranceSmallPrint } from '../../pages/car-leasing/free-car-insurance';
import { getSectionsData } from '../../utils/getSectionsData';

import Hero, { HeroPrompt } from '../../components/Hero';

const optimisationOptions = {
  height: 620,
  width: 620,
  quality: 59,
};

export interface IHomePageHero {
  data: HomePageData | undefined;
  searchPodVansData?: IFilterList;
  searchPodCarsData?: IFilterList;
}

const HomePageHero: React.FC<IHomePageHero> = ({
  data,
  searchPodCarsData,
  searchPodVansData,
}) => {
  const heroLabel = getSectionsData(
    ['hero', 'heroLabel'],
    data?.homePage?.sections,
  )?.[0];
  const heroImageSrc = getSectionsData(
    ['hero', 'image', 'file', 'url'],
    data?.homePage?.sections,
  );

  return (
    <Hero
      activeSearchIndex={2}
      searchPodVansData={searchPodVansData}
      searchPodCarsData={searchPodCarsData}
      smallPrint={freeInsuranceSmallPrint}
      customCTALink="/car-leasing/free-car-insurance"
    >
      <div className="nlol nlol-free-insurance">
        <p>Find Your New Lease Of Life</p>
        <h2>1 Year&apos;s FREE Insurance</h2>
        <p>On Car Hot Offers</p>
      </div>
      <div>
        <Image
          className="hero--image"
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          optimisationOptions={optimisationOptions}
          src={heroImageSrc}
          size="expand"
          plain
        />
      </div>
      {heroLabel?.visible && (
        <HeroPrompt
          btnVisible={heroLabel?.link?.visible}
          label={heroLabel?.link?.text ?? ''}
          url={heroLabel?.link?.url ?? ''}
          text={heroLabel?.text ?? ''}
        />
      )}
    </Hero>
  );
};

export default HomePageHero;
