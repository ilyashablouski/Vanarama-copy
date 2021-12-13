import { ImageProps } from 'next/image';

import { IBaseProps } from '../../interfaces/base';
import { TSize } from '../../../types/size';

import { ICloudflareOptimisation } from '../../../helpers/imageOptimiseUtils/interfaces';

export interface IImageProps extends IBaseProps {
  src: string;
  optimisedHost?: string;
  optimisationOptions?: ICloudflareOptimisation;
  alt?: string;
  size?: TSize;
  round?: boolean;
  plain?: boolean;
  inline?: boolean;
  width?: string | number;
  height?: string | number;
  lazyLoad?: boolean;
  dataTestId?: string;
  objectFit?: ImageProps['objectFit'];
  objectPosition?: ImageProps['objectPosition'];
}

export interface IImagePropsV2 extends IBaseProps {
  width?: string | number;
  height?: string | number;
  optimisedHost?: string;
  optimisationOptions?: ICloudflareOptimisation;
  src: string;
  alt?: string;
  size?: TSize;
  round?: boolean;
  inline?: boolean;
  lazyLoad?: boolean;
  objectFit?: ImageProps['objectFit'];
  plain?: boolean;
}
