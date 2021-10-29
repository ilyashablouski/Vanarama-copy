import React from 'react';
import cx from 'classnames';

import BlackFridayHeroBanner from 'core/atoms/black-friday-hero';
import { BANNER_VARIANTS } from 'core/atoms/black-friday-banner/BlackFridayHotOffersBanner';
import SearchPodContainer from '../../containers/SearchPodContainer';

import { IHeroProps } from './interface';

interface IProps extends IHeroProps {
  variant: keyof typeof BANNER_VARIANTS;
  withoutSearchPod?: boolean;
}

const HeroBlackFriday: React.FC<IProps> = ({
  searchPodCarsData,
  searchPodVansData,
  activeSearchIndex,
  searchType,
  variant,
  withoutSearchPod,
}) => {
  const { classNameMod, vehicleImageName } = BANNER_VARIANTS[variant];

  return (
    <div className={cx('row:bg-bf-hero', classNameMod)}>
      <div className="row:hero">
        <div className="hero--left">
          <BlackFridayHeroBanner vehicleImageName={vehicleImageName} />
        </div>
        {!withoutSearchPod && (
          <div className="hero--right">
            <SearchPodContainer
              searchPodCarsData={searchPodCarsData}
              searchPodVansData={searchPodVansData}
              activeSearchIndex={activeSearchIndex}
              searchType={searchType}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroBlackFriday;
