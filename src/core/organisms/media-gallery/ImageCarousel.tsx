import React, { useState, memo } from 'react';
import SwiperCore, { Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import ImageV2 from 'core/atoms/image/ImageV2';
import Icon from 'core/atoms/icon';
import FullScreenIcon from 'core/assets/icons/FullScreenIcon';
import FullScreenImageCarousel from 'core/organisms/full-screen-carousel';
import cx from 'classnames';
import { IImageCarouselProps } from './interfaces';
import { useDesktopViewport } from '../../../hooks/useMediaQuery';

SwiperCore.use([Navigation, Thumbs]);

function ImageCarousel({
  images,
  imageAltText,
  renderImageDecoration,
}: IImageCarouselProps) {
  const [slider, setSlider] = useState<SwiperCore>();
  const [thumbsSlider, setThumbsSlider] = useState<SwiperCore>();
  const [isFullScreen, setFullScreen] = useState(false);

  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  function handleFullScreenSliderChange(activeIndex: number) {
    slider?.slideToLoop(activeIndex);
  }

  function handleFullScreenClick() {
    setFullScreen(!isFullScreen);
  }

  return (
    <>
      <div className="image-carousel">
        <Swiper
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          watchOverflow
          wrapperTag="ul"
          thumbs={{
            swiper: thumbsSlider,
          }}
          onSwiper={setSlider}
          onSlideChange={swiper => {
            setActiveSlideIndex(swiper.activeIndex);
            thumbsSlider?.update();
          }}
        >
          <div
            className={cx(
              'swiper-button-prev',
              activeSlideIndex === 0 ? 'swiper-button-disabled' : '',
            )}
          />
          <div className="swiper-button-next" />
          {images.map((imageUrl, index) => (
            <SwiperSlide
              key={imageUrl}
              tag="li"
              data-uitestid={`details-page_image-carousel_${index}`}
            >
              {renderImageDecoration?.(imageUrl, index)}
              <ImageV2
                quality={60}
                src={imageUrl}
                lazyLoad={index !== 0}
                alt={imageAltText}
                plain
              />
            </SwiperSlide>
          ))}
          <button
            type="button"
            className="fs-toggle -transparent image-carousel__fs-toggle"
            onClick={handleFullScreenClick}
          >
            <Icon
              className="fs-toggle__icon"
              icon={<FullScreenIcon />}
              color="white"
              size="lead"
            />
          </button>
        </Swiper>
        {images.length > 1 && (
          <Swiper
            slidesPerView="auto"
            className="thumbnails"
            initialSlide={activeSlideIndex}
            resistanceRatio={0.55}
            onSwiper={setThumbsSlider}
          >
            {images.map(imageUrl => (
              <SwiperSlide key={imageUrl} tag="li">
                <ImageV2 quality={60} src={imageUrl} alt={imageAltText} plain />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {isFullScreen && (
        <FullScreenImageCarousel
          images={images}
          activeSlideIndex={activeSlideIndex}
          imageAltText={imageAltText}
          isOpenModal={isFullScreen}
          setOpenModal={() => setFullScreen(false)}
          onSlideChange={handleFullScreenSliderChange}
        />
      )}
    </>
  );
}

export default memo(ImageCarousel);
