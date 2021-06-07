import { IBaseProps } from 'core/interfaces/base';
import { TColor } from '../../../types/color';
import { TSize } from '../../../types/size';

export interface IHotOffersProps extends IBaseProps {
  iconSize?: TSize;
  textSize?: TSize;
  color?: TColor;
  totalCount: number;
  children?: React.ReactNode;
}
