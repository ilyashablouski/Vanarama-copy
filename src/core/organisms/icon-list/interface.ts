import { IBaseProps } from '../../interfaces/base';
import { TColor } from '../../../types/color';

export interface IIconListProps extends IBaseProps {
  textColor?: TColor;
}

export interface IIconListItemProps extends IBaseProps {
  iconColor?: TColor;
  listIcon?: React.ReactNode;
}
