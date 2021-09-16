import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import cx from 'classnames';
import Icon from 'core/atoms/icon';
import ChevronBack from 'core/assets/icons/ChevronBack';
import ChevronForward from 'core/assets/icons/ChevronForward';
import { useDesktopViewport } from '../../../hooks/useMediaQuery';
import { ICarouselProps } from '../carousel/interface';

SwiperCore.use([Navigation, Autoplay]);

const Slider: FC<ICarouselProps> = () => {
  const isDesktopLayout = useDesktopViewport();

  const items = [
    {
      title: 'Lowest Price Guaranteed',
      icon: '',
    },
    {
      title: 'FREE 30-Day Returns',
      icon: '',
    },
    {
      title: 'Rated Excellent',
      icon: '',
    },
    {
      title: 'Road Tax & Roadside Assistance Included',
      icon: '',
    },
    {
      title: 'FREE & Fast Delivery',
      icon: '',
    },
  ];

  return (
    <div className="benefits-bar">
      <div className="benefits-bar__slider">
        <Swiper
          slidesPerView="auto"
          watchOverflow
          navigation={{
            prevEl: `.swiper-prev`,
            nextEl: `.swiper-next`,
          }}
          loop={!isDesktopLayout}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          preventClicks
          preventClicksPropagation
        >
          {items.map(item => {
            return (
              <SwiperSlide key={item.title}>
                <div className="text -small -white">
                  <Icon
                    icon={item.icon}
                    className="benefits-bar__icon"
                    size="lead"
                  />
                  <span>{item.title}</span>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <button
          className={cx('benefits-bar__nav swiper-prev', {
            '-disabled': isDesktopLayout,
          })}
          type="button"
        >
          <Icon
            icon={<ChevronBack />}
            className="benefits-bar__icon"
            size="large"
          />
        </button>

        <button
          className={cx('benefits-bar__nav swiper-next', {
            '-disabled': isDesktopLayout,
          })}
          type="button"
        >
          <Icon
            icon={<ChevronForward />}
            className="benefits-bar__icon"
            size="large"
          />
        </button>
      </div>
    </div>
  );
};

export default Slider;
