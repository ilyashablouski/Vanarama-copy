import { HTMLAttributes } from 'react';
import { IBaseProps } from '../../interfaces/base';
import { TColor } from '../../../types/color';
import { TSize } from '../../../types/size';

export interface IIconProps extends IBaseProps, HTMLAttributes<HTMLElement> {
  icon?: React.ReactNode;
  size?: TSize;
  color?: TColor;
  name?: string;
}
