import { IIconProps } from 'core/atoms/icon/interfaces';
import { TIcon } from 'core/molecules/cards/CardIcons';
import { ComponentType } from 'react';
import IconMap from '../../utils/cardIconMap';

export const features = (
  keyInformation: any[],
  capId: string,
  Icon?: ComponentType<IIconProps>,
): TIcon[] => {
  return keyInformation.map(info => ({
    icon: Icon ? (
      <Icon
        key={info.name}
        icon={IconMap.get(info?.name.replace(/\s+/g, ''))}
        color="dark"
      />
    ) : null,
    label: info.value,
    index: `${capId}_${info.name}`,
  }));
};

export default features;
