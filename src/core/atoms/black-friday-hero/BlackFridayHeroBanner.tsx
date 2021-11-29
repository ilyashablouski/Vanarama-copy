import React from 'react';
import cx from 'classnames';

import Icon from 'core/atoms/icon';
import Text from 'core/atoms/text/Text';
import Heading from 'core/atoms/heading';
import ImageV2 from 'core/atoms/image/ImageV2';

import ArrowForward from 'core/assets/icons/ArrowForward';
import { isExtensionBlackFridayCampaignEnabled } from '../../../utils/helpers';
import RouterLink from '../../../components/RouterLink';

const OFFERS_LINK = {
  label: 'See Our Hot Offers',
  href: '/leasing-offers',
};
const TERMS_LINK = {
  label: 'Terms and conditions apply',
  href: '/legal/terms-and-conditions/black-friday-2021-terms-and-conditions',
};

const BASE_IMAGE_URL = `${process.env.HOST_DOMAIN}/Assets/images/black-friday`;

interface IProps {
  vehicleImageName: string;
}

const BlackFridayHeroBanner: React.FC<IProps> = ({ vehicleImageName }) => (
  <div className="bf-hero">
    <div className="bf-hero__inner">
      <div className="bf-hero__group">
        <div className="bf-hero__car -vehicle">
          <ImageV2
            src={`${BASE_IMAGE_URL}/${vehicleImageName}`}
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            size="expand"
            plain
          />
        </div>
        <div className="bf-hero__car -light">
          <ImageV2
            src={`${BASE_IMAGE_URL}/light.png`}
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            size="expand"
            plain
          />
        </div>
        <div className="bf-hero__badge">
          <ImageV2
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
        <Text
          className={cx('bf-hero__text', {
            '-extensionBlackFriday': isExtensionBlackFridayCampaignEnabled(),
          })}
        >
          {isExtensionBlackFridayCampaignEnabled()
            ? 'Extended To 29th Nov'
            : 'Ends 26th November'}
        </Text>
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
