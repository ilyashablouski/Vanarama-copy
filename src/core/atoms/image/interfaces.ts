import { SyntheticEvent } from 'react';
import { IBaseProps } from '../../interfaces/base';
import { TSize } from '../../../types/size';

import { ICloudflareOptimisation } from '../../../helpers/imageOptimiseUtils/interfaces';

export interface IImageProps extends IBaseProps {
  src: string;
  optimisedHost?: string;
  optimisationOptions?: ICloudflareOptimisation;
  onError?: (event: SyntheticEvent) => void;
  alt?: string;
  size?: TSize;
  round?: boolean;
  plain?: boolean;
  inline?: boolean;
  width?: string;
  height?: string;
  loadImage?: boolean;
}