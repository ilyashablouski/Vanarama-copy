import { IIconProps } from '@vanarama/uibook/lib/components/atoms/icon/interfaces';
import { TIcon } from '@vanarama/uibook/lib/components/molecules/cards/CardIcons';
import { ComponentType } from 'react';

export const features = (
  keyInformation: any[],
  capId: string,
  Icon?: ComponentType<IIconProps>,
): TIcon[] => {
  return keyInformation.map(information => ({
    icon: Icon ? (
      <Icon name={information.name.replace(' ', '')} color="dark" />
    ) : null,
    label: information.value,
    index: `${capId}_${information.name}`,
  }));
};

export default features;
