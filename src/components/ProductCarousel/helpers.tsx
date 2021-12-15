import React, { ComponentType } from 'react';

import { TIcon } from 'core/molecules/cards/CardIcons';
import { IIconProps } from 'core/atoms/icon/interfaces';

import { GetProductCard_productCard_keyInformation as IKeyInformation } from '../../../generated/GetProductCard';
import { Nullable } from '../../types/common';
import IconMap from '../../utils/cardIconMap';

export const features = (
  keyInformation: Nullable<IKeyInformation>[],
  capId: string,
  Icon?: ComponentType<IIconProps>,
): TIcon[] =>
  keyInformation.map(item => ({
    icon: Icon ? (
      <Icon
        key={item?.name}
        icon={IconMap.get(item?.name?.replace(/\s+/g, ''))}
        color="dark"
      />
    ) : null,
    name: item?.name ?? '',
    label: item?.value ?? '',
    index: `${capId}_${item?.name}`,
  }));

export default features;
