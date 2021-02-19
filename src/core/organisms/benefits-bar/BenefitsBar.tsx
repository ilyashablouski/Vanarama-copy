import React, { FC } from 'react';
import Carousel from 'nuka-carousel';
import { ICarouselProps } from '../carousel/interface';

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
      <Carousel
        wrapAround
        autoplay
        pauseOnHover
        autoplayInterval={4000}
        renderCenterLeftControls={({ previousSlide }) => (
          <button onClick={previousSlide} type="button">
            <span>Previous</span>
          </button>
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <button onClick={nextSlide} type="button">
            <span>Next</span>
          </button>
        )}
      >
        {items.map(item => {
          return (
            <div key={item.title}>
              <div className="text -small -black">
                <b>{item.title}</b>
              </div>
              <div className="text -small -darker">
                {item.rating && (
                  <span className="b-bar-rating">{item.rating}</span>
                )}
                {item.subtitle}
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Slider;
