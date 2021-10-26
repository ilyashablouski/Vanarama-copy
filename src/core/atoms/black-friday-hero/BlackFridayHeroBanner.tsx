import React from 'react';

import Icon from 'core/atoms/icon';
import Image from 'core/atoms/image';
import Text from 'core/atoms/text/Text';
import Heading from 'core/atoms/heading';

import ArrowForward from 'core/assets/icons/ArrowForward';
import RouterLink from '../../../components/RouterLink';

const OFFERS_LINK = {
  label: 'See Our Hot Offers',
  href: '/leasing-offers',
};

const BlackFridayHeroBanner = () => (
  <div className="bf-hero">
    <div className="bf-hero__car">
      <img
        className="-vehicle"
        src="/Assets/images/black-friday/car.png"
        alt=""
      />
      <img
        className="-light"
        src="/Assets/images/black-friday/light.png"
        alt=""
      />
    </div>
    <div className="bf-hero__badge">
      <Image
        className="image"
        src="/Assets/images/black-friday/main-badge.svg"
        size="expand"
        plain
      />
      <Text className="-top">Black</Text>
      <Text className="-center">£250 Cashback</Text>
      <Text className="-bottom">Friday</Text>
    </div>
    <div className="bf-hero__details">
      <Heading className="bf-hero__title" tag="span">
        On Every Vehicle
      </Heading>
      <Text className="bf-hero__text">Ends 26th November</Text>
      <RouterLink className="bf-hero__link" link={OFFERS_LINK}>
        See Our Hot Offers
        <Icon
          icon={<ArrowForward />}
          className="-regular md hydrated"
          name="arrow-forward"
          color="white"
        />
      </RouterLink>
    </div>
  </div>
);

export default BlackFridayHeroBanner;
