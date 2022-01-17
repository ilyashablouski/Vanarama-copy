import React from 'react';

import ImageV2 from 'core/atoms/image/ImageV2';

import { HomePageData } from '../../../generated/HomePageData';
import { filterList as IFilterList } from '../../../generated/filterList';
import { freeInsuranceSmallPrint } from '../../pages/car-leasing/free-car-insurance';
import { getSectionsData } from '../../utils/getSectionsData';

import Hero, { HeroPrompt } from '../../components/Hero';

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
  const heroImage = data?.homePage?.sections?.hero?.image?.file;
  const heroLabel = getSectionsData(
    ['hero', 'heroLabel'],
    data?.homePage?.sections,
  )?.[0];

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
        <ImageV2
          className="hero--image -pt-000"
          width={heroImage?.details.image.width}
          height={heroImage?.details.image.height}
          src={heroImage?.url || ''}
          lazyLoad={false}
          size="expand"
          quality={60}
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
