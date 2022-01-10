import React from 'react';
import cx from 'classnames';

import Text from 'core/atoms/text';
import Image from 'core/atoms/image';

import SearchPodContainer from '../../containers/SearchPodContainer';

import { IHeroProps } from './interface';

const HERO_BANNER_VARIANTS = {
  cars: {
    vehicleImageName: `car`,
    classNameMod: '-cars-hub',
    extraOfferText: '+1 Year’s FREE Insurance',
  },
  vans: {
    vehicleImageName: `van`,
    classNameMod: '-vans-hub',
    extraOfferText: '+FREE 30 Day Returns',
  },
  pickups: {
    vehicleImageName: `pickup`,
    classNameMod: '-pickups-hub',
    extraOfferText: '+FREE 30 Day Returns',
  },
  electric: {
    vehicleImageName: `electric`,
    classNameMod: '-electric-hub',
    extraOfferText: '+FREE Home Charger',
  },
};

interface IProps extends IHeroProps {
  variant: keyof typeof HERO_BANNER_VARIANTS;
}

const HeroJanSale: React.FC<IProps> = ({
  searchPodCarsData,
  searchPodVansData,
  activeSearchIndex,
  searchType,
  variant,
}) => {
  const {
    classNameMod,
    vehicleImageName,
    extraOfferText,
  } = HERO_BANNER_VARIANTS[variant];

  return (
    <div className={cx('row:bg-js-hero', classNameMod)}>
      <div className="decoration">
        <div className="decoration__circle -left" />
        <div className="decoration__circle -center" />
        <div className="decoration__circle -right" />
      </div>
      <div className="row:hero">
        <div className="hero--left">
          <div className="js-hero">
            <Image
              src={`/Assets/images/jan-sale/${vehicleImageName}.png`}
              size="expand"
              plain
            />
            <div className="js-hero__inner">
              <Text className="-cashback">
                £250
                <br />
                Cashback
              </Text>
              <Text className="-vehicle-type">On Every Vehicle</Text>
              <Text className="-extra-offer">{extraOfferText}</Text>
              <Text className="-date">Ends 31st January</Text>
            </div>
          </div>
          <Text className="terms-and-conditions">
            * T&Cs apply. Free insurance available on selected car hot offers
            only.
          </Text>
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

export default HeroJanSale;
