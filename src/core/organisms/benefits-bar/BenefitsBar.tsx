import React, { FC } from 'react';
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Icon from 'core/atoms/icon';
import ChevronBack from 'core/assets/icons/ChevronBack';
import ChevronForward from 'core/assets/icons/ChevronForward';
import { ICarouselProps } from 'core/organisms/carousel/interface';

import { BENEFIT_LIST } from './constants';

SwiperCore.use([Navigation, Autoplay]);

const Slider: FC<ICarouselProps> = () => (
  <div className="benefits-bar">
    <div className="benefits-bar__slider">
      <Swiper
        slidesPerView="auto"
        watchOverflow
        navigation={{
          prevEl: `.benefits-bar_navigation.swiper-prev`,
          nextEl: `.benefits-bar_navigation.swiper-next`,
        }}
        loop
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        preventClicks
        preventClicksPropagation
      >
        {BENEFIT_LIST.map((item, index) => (
          <SwiperSlide key={item.title}>
            <div className="text -small -white">
              <Icon
                icon={item.icon}
                style={{ width: item.iconWidth }}
                className="benefits-bar__icon"
                size="lead"
              />
              <span data-uitestid={`benefits-bar_benefits-item-${index}_label`}>
                {item.title}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="benefits-bar_navigation swiper-prev" type="button">
        <Icon icon={<ChevronBack />} className="benefits-bar__icon" />
      </button>
      <button className="benefits-bar_navigation swiper-next" type="button">
        <Icon icon={<ChevronForward />} className="benefits-bar__icon" />
      </button>
    </div>
  </div>
);

export default Slider;
