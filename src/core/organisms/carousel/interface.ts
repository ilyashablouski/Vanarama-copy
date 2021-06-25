import { CSSProperties } from 'react';
import { IBaseProps } from '../../interfaces/base';

export interface ICarouselProps extends IBaseProps {
  countItems: number;
  skeletonHeight?: string | number;
  skeletonWidth?: string | number;
  skeletonStyles?: CSSProperties;
}
