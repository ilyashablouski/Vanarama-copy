import React from 'react';
import cx from 'classnames';

import BlackFridayHeroBanner from 'core/atoms/black-friday-hero';
import SearchPodContainer from '../../containers/SearchPodContainer';

import { IHeroProps } from './interface';

const HERO_BANNER_VARIANTS = {
  cars: {
    vehicleImageName: `car.png`,
    classNameMod: '-cars-hub',
  },
  vans: {
    vehicleImageName: `van.png`,
    classNameMod: '-vans-hub',
  },
  pickups: {
    vehicleImageName: `pickup.png`,
    classNameMod: '-pickups-hub',
  },
  electric: {
    vehicleImageName: `car.png`,
    classNameMod: '-electric-hub',
  },
};

interface IProps extends IHeroProps {
  variant: keyof typeof HERO_BANNER_VARIANTS;
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
  const { classNameMod, vehicleImageName } = HERO_BANNER_VARIANTS[variant];

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
