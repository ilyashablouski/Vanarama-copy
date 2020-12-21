import { IBaseProps } from '../../interfaces/base';
import { TSize } from '../../../types/size';

export interface IAvatarProps extends IBaseProps {
  src?: string;
  size?: TSize;
  altText?: string;
}
