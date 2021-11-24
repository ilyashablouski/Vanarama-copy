import React from 'react';
import cx from 'classnames';

import Text from 'core/atoms/text';
import Icon from 'core/atoms/icon';

import BadgeIcon from 'core/assets/icons/black-friday/BadgeIcon';
import EarLeftIcon from 'core/assets/icons/black-friday/EarLeft';
import EarRightIcon from 'core/assets/icons/black-friday/EarRight';

import { IBaseProps } from 'core/interfaces/base';

interface IProps extends IBaseProps {
  rightText: string | JSX.Element;
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
      <Text className="bf-banner__text -after" size="large">
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
