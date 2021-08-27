import React, { memo } from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper } from 'swiper/react';

import { ICarouselProps } from 'core/organisms/carousel/interface';
import cx from 'classnames';
import Icon from 'core/atoms/icon';
import ArrowBackSharp from 'core/assets/icons/ArrowBackSharp';
import ArrowForwardSharp from 'core/assets/icons/ArrowForwardSharp';
import { useMediaQuery } from 'react-responsive';

SwiperCore.use([Navigation, Pagination]);

function CarouselSwiper({
  countItems,
  countShow = 3,
  className,
  children,
}: ICarouselProps) {
  const isMediumScreen = useMediaQuery({ minWidth: 768, maxWidth: 1215 });
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  let slidesToShow = countShow;
  if (isSmallScreen) {
    slidesToShow = 1;
  } else if (isMediumScreen) {
    slidesToShow = 2;
  }

  return (
    <div className={cx('carousel', className)}>
      <Swiper
        slidesPerView={
          countItems && countItems < slidesToShow ? countItems : slidesToShow
        }
        spaceBetween={20}
        autoHeight
        loop={countItems > 1}
        navigation={{
          prevEl: `.swiper-prev`,
          nextEl: `.swiper-next`,
        }}
        pagination={{
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
        }}
        preventClicks={false}
        preventClicksPropagation={false}
      >
        {children}
      </Swiper>

      <div className="carousel--nav">
        <button className="carousel--nav-arrow swiper-prev" type="button">
          <Icon icon={<ArrowBackSharp />} color="darker" size="regular" />
        </button>

        <div className="swiper-pagination" />

        <button className="carousel--nav-arrow swiper-next" type="button">
          <Icon icon={<ArrowForwardSharp />} color="darker" size="regular" />
        </button>
      </div>
    </div>
  );
}

export default memo(CarouselSwiper);
