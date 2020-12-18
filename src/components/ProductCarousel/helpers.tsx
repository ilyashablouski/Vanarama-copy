import { IIconProps } from '@vanarama/uibook/lib/components/atoms/icon/interfaces';
import { TIcon } from '@vanarama/uibook/lib/components/molecules/cards/CardIcons';
import { ComponentType } from 'react';

export const features = (
  keyInformation: any[],
  capId: string,
  Icon?: ComponentType<IIconProps>,
): TIcon[] => {
  return keyInformation.map(info => ({
    icon: Icon ? (
      <Icon key={info.name} name={info.name.replace(' ', '')} color="dark" />
    ) : null,
    label: info.value,
    index: `${capId}_${info.name}`,
  }));
};

export default features;
