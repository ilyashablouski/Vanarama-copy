import { TSize } from '@vanarama/uibook/lib/types/size';
import { TColor } from '@vanarama/uibook/lib/types/color';

export interface IClassNamesProps {
  size?: TSize;
  color?: TColor;
  position?: 'left' | 'right';
  plain?: boolean;
  solid?: boolean;
  clear?: boolean;
}
