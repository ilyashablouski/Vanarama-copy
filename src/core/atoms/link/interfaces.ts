import { IBaseProps } from '../../interfaces/base';
import { TColor } from '../../../types/color';
import { TSize } from '../../../types/size';

export interface ILinkProps extends IBaseProps {
  size?: TSize;
  color?: TColor;
  href?: string;
  position?: 'left' | 'right';
  plain?: boolean;
  solid?: boolean;
  children?: React.ReactNode;
  onClick?(event: React.MouseEvent): void;
}
