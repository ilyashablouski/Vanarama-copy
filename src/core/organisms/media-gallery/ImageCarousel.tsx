import React, { useState, memo, useEffect } from 'react';
import SwiperCore, { Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'core/atoms/image';
import Icon from 'core/atoms/icon';
import FullScreenIcon from 'core/assets/icons/FullScreenIcon';
import FullScreenImageCarousel from 'core/organisms/full-screen-carousel';
import { IImageCarouselProps } from './interfaces';

SwiperCore.use([Navigation, Thumbs]);

function ImageCarousel({
  images,
  imageAltText,
  renderImageDecoration,
}: IImageCarouselProps) {
  const [thumbsSlider, setThumbsSlider] = useState<SwiperCore>();
  const [isFullScreen, setFullScreen] = useState(false);

  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  function handleFullScreenClick() {
    setFullScreen(!isFullScreen);
  }

  return (
    <>
      <div className="image-carousel">
        <Swiper
          navigation
          watchOverflow
          loop={images.length > 1}
          wrapperTag="ul"
          thumbs={{
            swiper: thumbsSlider,
          }}
          onSlideChange={swiper => setActiveSlideIndex(swiper.activeIndex)}
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

        <button
          type="button"
          className="imaca-viewer__fullscreen-toggle"
          onClick={handleFullScreenClick}
        >
          <Icon
            className="imaca-viewer__icon"
            icon={<FullScreenIcon />}
            color="dark"
            size="lead"
          />
        </button>
      </div>

      {isFullScreen && (
        <FullScreenImageCarousel
          images={images}
          activeSlideIndex={activeSlideIndex}
          imageAltText={imageAltText}
          isOpenModal={isFullScreen}
          setOpenModal={() => setFullScreen(false)}
        />
      )}
    </>
  );
}

export default memo(ImageCarousel);
