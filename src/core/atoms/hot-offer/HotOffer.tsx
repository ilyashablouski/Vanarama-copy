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
  count,
}: IHotOffersProps) {
  return (
    <Text className={cx('hot-offer', className)} size={textSize} color={color}>
      <Icon icon={<Flame />} size={iconSize} color={color} />
      {count} Hot Offer
    </Text>
  );
}

export default HotOffer;
