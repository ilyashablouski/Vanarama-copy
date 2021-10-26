import React from 'react';

import BlackFridayHeroBanner from 'core/atoms/black-friday-hero';
import SearchPodContainer from '../../containers/SearchPodContainer';
import RouterLink from '../RouterLink';

import { IHeroProps } from './interface';

const TERMS_LINK = {
  label: 'Terms and conditions apply',
  href: '/legal/terms-and-conditions/black-friday-2021-terms-and-conditions',
};

const HeroBlackFriday: React.FC<IHeroProps> = ({
  searchPodCarsData,
  searchPodVansData,
  activeSearchIndex,
  searchType,
}) => {
  return (
    <div className="row:bg-bf-hero">
      <div className="row:hero">
        <div className="hero--left">
          <BlackFridayHeroBanner />
          <RouterLink className="terms-and-conditions" link={TERMS_LINK}>
            *Terms and conditions apply.
          </RouterLink>
        </div>
        <div className="hero--right">
          <SearchPodContainer
            searchPodCarsData={searchPodCarsData}
            searchPodVansData={searchPodVansData}
            activeSearchIndex={activeSearchIndex}
            searchType={searchType}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroBlackFriday;
