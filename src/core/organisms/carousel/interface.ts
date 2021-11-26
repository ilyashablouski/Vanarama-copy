import SwiperClass from 'swiper/types/swiper-class';
import { IBaseProps } from 'core/interfaces/base';
import { NavigationOptions, PaginationOptions } from 'swiper/types';
import { Component } from '../../../types/common';

export interface ICarouselProps extends IBaseProps {
  countItems: number;
  watchOverflow?: boolean;
  loop?: boolean;
  disableNavigation?: boolean;
  children?: React.ReactNode;
  onSlideChange?: (swiper: SwiperClass) => void;
  paginationComponent?: Component;
  navigationOptions?: NavigationOptions;
  paginationOptions?: PaginationOptions;
}
