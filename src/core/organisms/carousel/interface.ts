import { IBaseProps } from '../../interfaces/base';

export interface ICarouselProps extends IBaseProps {
  countItems: number;
  children?: React.ReactNode;
  countShow?: number;
  initialSlideHeight?: number;
}
