import { IBaseProps } from 'core/interfaces/base';
import { TColor } from '../../../types/color';
import { TSize } from '../../../types/size';

export interface ITextProps extends IBaseProps {
  size?: TSize;
  color?: TColor;
  tag?: 'span' | 'p' | 'label' | 'div';
  htmlFor?: string;
  children?: React.ReactNode;
  invalid?: boolean;
}
