import { IBaseProps } from '../../interfaces/base';
import { TColor } from '../../../types/color';
import { TSize } from '../../../types/size';

export interface IBadgeProps extends IBaseProps {
  size?: TSize;
  color?: TColor;
  label?: string;
}
