import { IBaseProps } from '../../interfaces/base';
import { TColor } from '../../../types/color';

export interface ITooltipProps extends IBaseProps {
  color?: TColor;
  text: string;
  icon?: React.ReactNode;
  position?: string;
}
