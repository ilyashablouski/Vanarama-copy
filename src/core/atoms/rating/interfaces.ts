import { IBaseProps } from '../../interfaces/base';
import { TColor } from '../../../types/color';
import { TSize } from '../../../types/size';

export interface IRatingProps extends IBaseProps {
  size?: TSize;
  color?: TColor;
  score: number;
  max?: number;
  labelColor?: TColor;
  onClick?: (index: number) => void;
  noLabel?: boolean;
}

export interface IIconWrapperProps {
  children: React.ReactNode;
  index: number;
  onClick?: (index: number) => void;
}
