import { ButtonHTMLAttributes } from 'react';
import { IBaseProps } from '../../interfaces/base';
import { TColor } from '../../../types/color';
import { TSize } from '../../../types/size';

export interface IButtonProps
  extends IBaseProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  color?: TColor | string;
  fill?: 'solid' | 'outline' | 'clear';
  icon?: React.ReactNode;
  iconColor?: TColor;
  iconPosition?: 'before' | 'after';
  label?: string | React.ReactNode;
  round?: boolean;
  size?: TSize;
  withoutDefaultClass?: boolean;
  customCTAColor?: string;
  iconClassName?: string;
}
