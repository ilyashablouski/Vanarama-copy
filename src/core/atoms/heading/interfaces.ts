import { IBaseProps } from '../../interfaces/base';
import { TColor } from '../../../types/color';
import { TSize } from '../../../types/size';

export interface IHeadingProps extends IBaseProps {
  size?: TSize;
  color?: TColor;
  href?: string;
  tag?: keyof JSX.IntrinsicElements;
  position?: string;
}
