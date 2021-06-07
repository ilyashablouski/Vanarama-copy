import { IBaseProps } from 'core/interfaces/base';
import { TColor } from '../../../types/color';
import { TSize } from '../../../types/size';

export interface IHotOffersProps extends IBaseProps {
  iconSize?: TSize;
  textSize?: TSize;
  color?: TColor;
  count?: number;
  children?: React.ReactNode;
}
