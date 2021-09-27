import React, { memo } from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper } from 'swiper/react';

import { ICarouselProps } from 'core/organisms/carousel/interface';
import cx from 'classnames';
import Icon from 'core/atoms/icon';
import ArrowBackSharp from 'core/assets/icons/ArrowBackSharp';
import ArrowForwardSharp from 'core/assets/icons/ArrowForwardSharp';

SwiperCore.use([Navigation, Pagination]);

function CarouselSwiper({
  loop,
  countItems,
  watchOverflow,
  disableNavigation,
  className,
  children,
}: ICarouselProps) {
  return (
    <div className={cx('carousel', className)}>
      <Swiper
        slidesPerView="auto"
        loop={loop ?? countItems > 1}
        watchOverflow={watchOverflow}
        navigation={{
          prevEl: `.swiper-prev`,
          nextEl: `.swiper-next`,
        }}
        pagination={{
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
        }}
        noSwipingSelector="input, select, option, textarea, button, video, label"
        touchEventsTarget="wrapper"
      >
        {children}
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
            <Icon icon={<ArrowForwardSharp />} color="darker" size="regular" />
          </button>
        </div>
      </Swiper>
    </div>
  );
}

export default memo(CarouselSwiper);
