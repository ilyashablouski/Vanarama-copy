import { TSize } from '../types/size';
import { TColor } from '../types/color';

export interface IClassNamesProps {
  size?: TSize;
  color?: TColor;
  position?: 'left' | 'right';
  plain?: boolean;
  solid?: boolean;
  clear?: boolean;
}
