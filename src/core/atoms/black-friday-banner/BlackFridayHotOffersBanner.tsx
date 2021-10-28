import React from 'react';
import cx from 'classnames';

import Icon from 'core/atoms/icon';
import Text from 'core/atoms/text/Text';

import BadgeIcon from 'core/assets/icons/black-friday/BadgeIcon';
import EarLeftIcon from 'core/assets/icons/black-friday/EarLeftLarge';
import EarRightIcon from 'core/assets/icons/black-friday/EarRightLarge';

import { IBaseProps } from 'core/interfaces/base';

const BASE_IMAGE_URL = '/Assets/images/black-friday';

interface IProps extends IBaseProps {
  variant: string;
}

const BlackFridayHotOffersBanner = ({ className, variant }: IProps) => {
  return (
    <div className={cx('bf-banner bf-banner--hot-offers', className)}>
      <Icon
        className="bf-banner__ear"
        icon={<EarLeftIcon />}
        size="initial-size"
      />
      <div className="bf-banner__inner">
        <div className="bf-banner__container">
          <div className="bf-banner__car -vehicle">
            <img src={`${BASE_IMAGE_URL}/car.png`} alt="" />
          </div>
          <div className="bf-banner__car -light">
            <img src={`${BASE_IMAGE_URL}/light.png`} alt="" />
          </div>
          <div className="bf-banner__group -first">
            <div className="bf-banner__badge">
              <Icon icon={<BadgeIcon />} size="initial-size" />
              <Text size="xlarge" tag="span">
                Black Friday
              </Text>
            </div>
            <Text className="bf-banner__subtext" tag="span">
              Ends 26th November
            </Text>
          </div>
          <div className="bf-banner__group -second">
            <Text className="bf-banner__text" tag="span">
              <span>£250</span>Cashback
            </Text>
            <Text className="bf-banner__subtext" tag="span">
              Ends 26th November
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
