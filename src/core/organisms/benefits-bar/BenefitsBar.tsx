import React, { FC } from 'react';
import Carousel from 'nuka-carousel';
import { ICarouselProps } from '../carousel/interface';

const Slider: FC<ICarouselProps> = () => {

  const items = [
    {
      title: "Over 100,000 Vehicles Leased",
      subtitle: "Van, pickup or car - lease yours today."
    },
    {
      title: "Over 100,000 Vehicles Leased",
      subtitle: "Lorem ipsum dolor et 0"
    },
    {
      title: "Over 100,000 Vehicles Leased",
      subtitle: "Lorem ipsum dolor et 1"
    },
    {
      title: "Over 100,000 Vehicles Leased",
      subtitle: "Lorem ipsum dolor et 2"
    }
  ];

  return (
    <div className="new-hero-benefits-bar">
      <Carousel 
        wrapAround
        autoplay={true}
        pauseOnHover={true} 
        renderCenterLeftControls={({ previousSlide }) => (
          <button onClick={previousSlide}><span>Previous</span></button>
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <button onClick={nextSlide}><span>Next</span></button>
        )}>
        {items.map((item) => {
          return (
            <div>
              <div className="text -small -black"><b>{item.title}</b></div>
              <div className="text -small -darker">{item.subtitle}</div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Slider;