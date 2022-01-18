import React from 'react';
import cx from 'classnames';

import Text from 'core/atoms/text';
import ImageV2 from 'core/atoms/image/ImageV2';

import SearchPodContainer from '../../containers/SearchPodContainer';
import RouterLink from '../RouterLink';

import { IHeroProps } from './interface';

const TERMS_LINK = {
  label: 'Terms and conditions apply',
  href: '/legal/terms-and-conditions/january-sale-2022-terms-and-conditions',
};

const TERM_TEXT_VARIANTS = {
  full:
    'Terms and conditions apply. Free insurance available on selected car hot offers only & subject to availability.',
  short: 'Terms & conditions apply.',
};

const HERO_BANNER_VARIANTS = {
  cars: {
    classNameMod: '-cars-hub',
    extraOfferText: '+1 Year’s FREE Insurance',
    termsText: TERM_TEXT_VARIANTS.full,
    vehicleImage: {
      name: `car`,
      width: 605,
      height: 543,
    },
  },
  vans: {
    classNameMod: '-vans-hub',
    extraOfferText: '+FREE 30 Day Returns',
    termsText: TERM_TEXT_VARIANTS.short,
    vehicleImage: {
      name: `van`,
      width: 605,
      height: 539,
    },
  },
  pickups: {
    classNameMod: '-pickups-hub',
    extraOfferText: '+FREE 30 Day Returns',
    termsText: TERM_TEXT_VARIANTS.short,
    vehicleImage: {
      name: `pickup`,
      width: 605,
      height: 539,
    },
  },
  electric: {
    classNameMod: '-electric-hub',
    extraOfferText: '+FREE Home Charger',
    termsText: TERM_TEXT_VARIANTS.short,
    vehicleImage: {
      name: `electric`,
      width: 605,
      height: 539,
    },
  },
};

const baseImageUrl = `${process.env.HOST_DOMAIN}/Assets/images/jan-sale`;

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
    vehicleImage,
    extraOfferText,
    termsText,
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
            <ImageV2
              quality={70}
              optimisedHost
              lazyLoad={false}
              width={vehicleImage.width}
              height={vehicleImage.height}
              src={`${baseImageUrl}/${vehicleImage.name}.png`}
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
          <RouterLink className="terms-link" link={TERMS_LINK}>
            * {termsText}
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

export default HeroJanSale;
