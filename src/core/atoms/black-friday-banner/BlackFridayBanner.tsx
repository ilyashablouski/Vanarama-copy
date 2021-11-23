import React from 'react';
import cx from 'classnames';

import Text from 'core/atoms/text';
import Icon from 'core/atoms/icon';

import BadgeIcon from 'core/assets/icons/black-friday/BadgeIcon';
import EarLeftIcon from 'core/assets/icons/black-friday/EarLeft';
import EarRightIcon from 'core/assets/icons/black-friday/EarRight';

import { IBaseProps } from 'core/interfaces/base';
import { isExtensionBlackFridayCampaignEnabled } from '../../../utils/helpers';

interface IProps extends IBaseProps {
  rightText: string;
}

const BlackFridayBanner = ({ className, rightText }: IProps) => (
  <section className={cx('bf-banner', className)}>
    <Icon
      className="bf-banner__ear"
      icon={<EarLeftIcon />}
      size="initial-size"
    />
    <div className="bf-banner__inner">
      <Text className="bf-banner__text -before" size="large">
        £250 Cashback
      </Text>
      <div className="bf-banner__badge">
        <Icon icon={<BadgeIcon />} size="initial-size" />
        <Text size="xlarge" tag="span">
          Black Friday
        </Text>
      </div>
      <Text
        className={cx('bf-banner__text', ' -after', {
          '-extensionBlackFriday ': isExtensionBlackFridayCampaignEnabled(),
        })}
        size="large"
      >
        <span>£250 Cashback</span>
        {rightText}
      </Text>
    </div>
    <Icon
      className="bf-banner__ear"
      icon={<EarRightIcon />}
      size="initial-size"
    />
  </section>
);

export default BlackFridayBanner;
