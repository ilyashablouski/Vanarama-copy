import React, { useState, memo } from 'react';
import SwiperCore, { Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'core/atoms/image';

import { IImageCarouselProps } from './interfaces';

SwiperCore.use([Navigation, Thumbs]);

function ImageCarousel({
  images,
  imageAltText,
  renderImageDecoration,
}: IImageCarouselProps) {
  const [thumbsSlider, setThumbsSlider] = useState<SwiperCore>();

  return (
    <>
      <Swiper
        navigation
        watchOverflow
        loop={images.length > 1}
        wrapperTag="ul"
        thumbs={{
          swiper: thumbsSlider,
        }}
      >
        {images.map((imageUrl, index) => (
          <SwiperSlide key={imageUrl} tag="li">
            {renderImageDecoration?.(imageUrl, index)}
            <Image
              plain
              src={imageUrl}
              alt={imageAltText}
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              optimisationOptions={{
                width: 709,
                height: 399,
                fit: 'cover',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {images.length > 1 && (
        <Swiper
          slidesPerView="auto"
          className="thumbnails"
          resistanceRatio={0.55}
          onSwiper={setThumbsSlider}
        >
          {images.map(imageUrl => (
            <SwiperSlide key={imageUrl} tag="li">
              <Image
                plain
                src={imageUrl}
                alt={imageAltText}
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                optimisationOptions={{
                  width: 150,
                  height: 80,
                  fit: 'cover',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}

export default memo(ImageCarousel);
