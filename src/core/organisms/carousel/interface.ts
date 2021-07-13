import { IBaseProps } from '../../interfaces/base';

export interface ICarouselProps extends IBaseProps {
  countItems: number;
  countShow?: number;
  initialSlideHeight?: number;
}
