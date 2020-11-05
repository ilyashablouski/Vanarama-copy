import { IIconProps } from '@vanarama/uibook/lib/components/atoms/icon/interfaces';
import { ComponentType } from 'react';

export const features = (
  keyInformation: any[],
  capId: string,
  Icon: ComponentType<IIconProps>,
) => {
  return keyInformation.map(information => ({
    icon: <Icon name={information.name.replace(' ', '')} color="dark" />,
    label: information.value,
    index: `${capId}_${information.name}`,
  }));
};

export default features;
