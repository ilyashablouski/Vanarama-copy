import React from 'react';
import cx from 'classnames';

import Icon from 'core/atoms/icon';
import Text from 'core/atoms/text/Text';

import BadgeIcon from 'core/assets/icons/black-friday/BadgeIcon';
import EarLeftIcon from 'core/assets/icons/black-friday/EarLeftLarge';
import EarRightIcon from 'core/assets/icons/black-friday/EarRightLarge';

import { IBaseProps } from 'core/interfaces/base';
import Image from 'core/atoms/image/Image';
import { isExtensionBlackFridayCampaignEnabled } from '../../../utils/helpers';

const BASE_IMAGE_URL = `${process.env.HOST_DOMAIN}/Assets/images/black-friday`;
export const BANNER_VARIANTS = {
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

interface IProps extends IBaseProps {
  variant: keyof typeof BANNER_VARIANTS;
}

const BlackFridayHotOffersBanner = ({ variant }: IProps) => {
  const { classNameMod, vehicleImageName } = BANNER_VARIANTS[variant];

  return (
    <div className={cx('bf-banner bf-banner--hot-offers', classNameMod)}>
      <Icon
        className="bf-banner__ear"
        icon={<EarLeftIcon />}
        size="initial-size"
      />
      <div className="bf-banner__inner">
        <div className="bf-banner__container">
          <div className="bf-banner__car -vehicle">
            <Image
              className="image"
              src={`${BASE_IMAGE_URL}/${vehicleImageName}`}
              size="expand"
              plain
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            />
          </div>
          <div className="bf-banner__car -light">
            <Image
              className="image"
              src={`${BASE_IMAGE_URL}/light.png`}
              size="expand"
              plain
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            />
          </div>
          <div className="bf-banner__group -first">
            <div className="bf-banner__badge">
              <Icon icon={<BadgeIcon />} size="initial-size" />
              <Text size="xlarge" tag="span">
                Black Friday
              </Text>
            </div>
            <Text className="bf-banner__subtext" tag="span">
              {isExtensionBlackFridayCampaignEnabled()
                ? 'Extended To 29th Nov'
                : 'Ends 26th November'}
            </Text>
          </div>
          <div className="bf-banner__group -second">
            <Text className="bf-banner__text" tag="span">
              <span>£250</span>Cashback
            </Text>
            <Text className="bf-banner__subtext" tag="span">
              {isExtensionBlackFridayCampaignEnabled()
                ? 'Extended To 29th Nov'
                : 'Ends 26th November'}
            </Text>
          </div>
        </div>
      </div>
      <Icon
        className="bf-banner__ear"
        icon={<EarRightIcon />}
        size="initial-size"
      />
    </div>
  );
};

export default BlackFridayHotOffersBanner;
