import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import Icon from 'core/atoms/icon';
import ChevronBack from 'core/assets/icons/ChevronBack';
import ChevronForward from 'core/assets/icons/ChevronForward';
import PriceLowest from 'core/assets/icons/PriceLowest';
import ReturnCircle from 'core/assets/icons/ReturnCircle';
import BreakdownCar from 'core/assets/icons/BreakdownCar';
import DeliveryCar from 'core/assets/icons/DeliveryCar';
import { ICarouselProps } from '../carousel/interface';

SwiperCore.use([Navigation, Autoplay]);

const Slider: FC<ICarouselProps> = () => {
  const items = [
    {
      title: 'Lowest Price Guaranteed',
      icon: <PriceLowest />,
    },
    {
      title: 'FREE 30-Day Returns',
      icon: <ReturnCircle />,
    },
    {
      title: 'Rated Excellent',
      icon: (
        <img
          alt="Trust pilot logo"
          src="/Assets/images/benefits-bar/trust-pilot-logo.png"
        />
      ),
    },
    {
      title: 'Road Tax & Roadside Assistance Included',
      icon: <BreakdownCar />,
    },
    {
      title: 'FREE & Fast Delivery',
      icon: <DeliveryCar />,
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
          loop
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

        <button className="swiper-prev" type="button">
          <Icon icon={<ChevronBack />} className="benefits-bar__icon" />
        </button>

        <button className="swiper-next" type="button">
          <Icon icon={<ChevronForward />} className="benefits-bar__icon" />
        </button>
      </div>
    </div>
  );
};

export default Slider;
