import React from 'react';
import cx from 'classnames';

import Text from 'core/atoms/text';
import Icon from 'core/atoms/icon';

import LayerIcon from 'core/assets/icons/black-friday/Layer';

import { IBaseProps } from 'core/interfaces/base';

const BlackFridaySummaryBanner = ({ className }: IBaseProps) => (
  <div className={cx('bf-banner bf-banner--summary', className)}>
    <div className="bf-banner__inner">
      <div className="bf-banner__sticker">
        <Icon icon={<LayerIcon />} size="initial-size" />
        <Text size="xlarge" tag="span">
          Black Friday
        </Text>
      </div>
      <Text className="bf-banner__text -after" size="large">
        £250 Cashback
      </Text>
    </div>
  </div>
);

export default BlackFridaySummaryBanner;
