import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import { ICarouselProps } from '../carousel/interface';

SwiperCore.use([Navigation, Autoplay]);

const Slider: FC<ICarouselProps> = () => {
  const items = [
    {
      title: 'Lowest Price Guaranteed',
      subtitle: "We'll beat any price or give you £100.",
    },
    {
      title: 'Our Customers Love Us',
      subtitle: ' on Trustpilot.',
      rating: '★★★★★',
    },
    {
      title: 'Over 100,000 Vehicles Leased',
      subtitle: 'Van, pickup or car - lease yours today.',
    },
  ];

  return (
    <div className="hero-benefits-bar">
      <div className="slider">
        <Swiper
          centeredSlides
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
                <div className="text -small -black">
                  <b>{item.title}</b>
                </div>
                <div className="text -small -darker">
                  {item.rating && (
                    <span className="b-bar-rating">{item.rating}</span>
                  )}
                  {item.subtitle}
                </div>
              </SwiperSlide>
            );
          })}

          <button className="swiper-prev" type="button">
            {/* <span>Previous</span> */}
          </button>

          <button className="swiper-next" type="button">
            {/* <span>Next</span> */}
          </button>
        </Swiper>
      </div>

      {/* <Carousel */}
      {/*  wrapAround */}
      {/*  autoplay */}
      {/*  pauseOnHover */}
      {/*  initialSlideWidth={328} */}
      {/*  initialSlideHeight={40} */}
      {/*  autoplayInterval={4000} */}
      {/*  renderCenterLeftControls={({ previousSlide }) => ( */}
      {/*    <button onClick={previousSlide} type="button"> */}
      {/*      <span>Previous</span> */}
      {/*    </button> */}
      {/*  )} */}
      {/*  renderCenterRightControls={({ nextSlide }) => ( */}
      {/*    <button onClick={nextSlide} type="button"> */}
      {/*      <span>Next</span> */}
      {/*    </button> */}
      {/*  )} */}
      {/* > */}
      {/* </Carousel> */}
    </div>
  );
};

export default Slider;
