import { IBaseProps } from '../../interfaces/base';
import { TColor } from '../../../types/color';

export interface ITileProps extends IBaseProps {
  color?: TColor;
  centered?: boolean;
  scrollable?: boolean;
  plain?: boolean;
}
