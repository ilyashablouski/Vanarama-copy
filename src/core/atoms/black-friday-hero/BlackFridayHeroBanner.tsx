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
const TERMS_LINK = {
  label: 'Terms and conditions apply',
  href: '/legal/terms-and-conditions/black-friday-2021-terms-and-conditions',
};

const BASE_IMAGE_URL = '/Assets/images/black-friday';

interface IProps {
  vehicleImageName: string;
}

const BlackFridayHeroBanner: React.FC<IProps> = ({ vehicleImageName }) => (
  <div className="bf-hero">
    <div className="bf-hero__inner">
      <div className="bf-hero__group">
        <div className="bf-hero__car -vehicle">
          <img src={`${BASE_IMAGE_URL}/${vehicleImageName}`} alt="" />
        </div>
        <div className="bf-hero__car -light">
          <img src={`${BASE_IMAGE_URL}/light.png`} alt="" />
        </div>
        <div className="bf-hero__badge">
          <Image
            className="image"
            src={`${BASE_IMAGE_URL}/main-badge.svg`}
            size="expand"
            plain
          />
          <Text className="-top">Black</Text>
          <Text className="-center">£250 Cashback</Text>
          <Text className="-bottom">Friday</Text>
        </div>
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
    <RouterLink className="bf-hero__terms" link={TERMS_LINK}>
      *Terms and conditions apply.
    </RouterLink>
  </div>
);

export default BlackFridayHeroBanner;
