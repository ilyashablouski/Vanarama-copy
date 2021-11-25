import React, { memo } from 'react';
import cx from 'classnames';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { NavigationOptions, PaginationOptions } from 'swiper/types';
import { Swiper } from 'swiper/react';

import { ICarouselProps } from 'core/organisms/carousel/interface';

import ArrowBackSharp from 'core/assets/icons/ArrowBackSharp';
import ArrowForwardSharp from 'core/assets/icons/ArrowForwardSharp';

import Icon from 'core/atoms/icon';

SwiperCore.use([Navigation, Pagination]);

const navigationDefaultOptions: NavigationOptions = {
  prevEl: `.swiper-prev`,
  nextEl: `.swiper-next`,
};
const paginationDefaultOptions: PaginationOptions = {
  el: '.swiper-pagination',
  type: 'bullets',
  clickable: true,
};
const noSwipingSelector: string =
  'input, select, option, textarea, button, .button, video, label';

function CarouselSwiper({
  loop,
  countItems,
  watchOverflow,
  disableNavigation,
  className,
  children,
  onSlideChange,
  paginationComponent,
  navigationOptions = navigationDefaultOptions,
  paginationOptions = paginationDefaultOptions,
}: ICarouselProps) {
  return (
    <div className={cx('carousel', className)}>
      <Swiper
        slidesPerView="auto"
        loop={loop ?? countItems > 1}
        watchOverflow={watchOverflow}
        navigation={navigationOptions}
        pagination={paginationOptions}
        noSwipingSelector={noSwipingSelector}
        touchEventsTarget="wrapper"
        onSlideChange={onSlideChange}
      >
        {children}
        {paginationComponent || (
          <div
            className={cx('carousel--nav', {
              '-disabled': disableNavigation,
            })}
          >
            <button className="carousel--nav-arrow swiper-prev" type="button">
              <Icon icon={<ArrowBackSharp />} color="darker" size="regular" />
            </button>

            <div className="swiper-pagination" />

            <button className="carousel--nav-arrow swiper-next" type="button">
              <Icon
                icon={<ArrowForwardSharp />}
                color="darker"
                size="regular"
              />
            </button>
          </div>
        )}
      </Swiper>
    </div>
  );
}

export default memo(CarouselSwiper);
