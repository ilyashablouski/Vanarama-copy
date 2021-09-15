import { IBaseProps } from '../../interfaces/base';

export interface ICarouselProps extends IBaseProps {
  countItems: number;
  watchOverflow?: boolean;
  loop?: boolean;
  disableNavigation?: boolean;
  children?: React.ReactNode;
}
