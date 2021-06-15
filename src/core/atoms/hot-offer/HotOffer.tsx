import React from 'react';
import cx from 'classnames';

import Icon from 'core/atoms/icon';
import Text from 'core/atoms/text/Text';
import Flame from 'core/assets/icons/Flame';

import { IHotOffersProps } from './interfaces';

function HotOffer({
  className,
  iconSize,
  textSize,
  color,
  totalCount,
}: IHotOffersProps) {
  return (
    <Text className={cx('hot-offer', className)} size={textSize} color={color}>
      <Icon icon={<Flame />} size={iconSize} color={color} />
      {totalCount} Hot Offers
    </Text>
  );
}

export default HotOffer;
