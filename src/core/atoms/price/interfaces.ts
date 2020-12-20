import { IBaseProps } from '../../interfaces/base';
import { TColor } from '../../../types/color';
import { TSize } from '../../../types/size';

export interface IPriceProps extends IBaseProps {
  color?: TColor;
  size?: TSize;
  price?: number | null;
  separator?: string;
  hidePence?: boolean;
  priceLabel?: string;
  priceDescription?: string;
}
