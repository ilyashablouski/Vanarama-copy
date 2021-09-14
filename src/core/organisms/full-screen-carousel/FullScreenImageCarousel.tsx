import React, { memo, useRef } from 'react';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'core/atoms/image/Image';
import { IFullScreenCarouselProps } from 'core/organisms/full-screen-carousel/interface';
import ModalV2 from 'core/molecules/modal-v2';
import Icon from 'core/atoms/icon';
import ChevronBackOutline from 'core/assets/icons/ChevronBackOutline';
import ChevronForwardOutline from 'core/assets/icons/ChevronForwardOutline';

SwiperCore.use([Navigation]);

function FullScreenImageCarousel({
  images,
  activeSlideIndex = 0,
  imageAltText,
  isOpenModal,
  setOpenModal,
}: IFullScreenCarouselProps) {
  const NextElement = useRef<HTMLButtonElement>(null);
  const PrevElement = useRef<HTMLButtonElement>(null);

  return (
    <ModalV2 open={isOpenModal} onClose={setOpenModal} color="secondary">
      <div className="full-screen-carousel">
        <Swiper
          slidesPerView={1}
          navigation={{
            prevEl: `.swiper-prev`,
            nextEl: `.swiper-next`,
          }}
          onSwiper={swiper => {
            swiper.slideToLoop(activeSlideIndex - 1);
          }}
        >
          {images.map(imageUrl => (
            <SwiperSlide key={imageUrl}>
              <Image
                plain
                src={imageUrl}
                alt={imageAltText}
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                optimisationOptions={{
                  width: 1920,
                  height: 1080,
                  fit: 'cover',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="swiper-prev" type="button" ref={PrevElement}>
          <Icon icon={<ChevronBackOutline />} size="large" />
        </button>

        <button className="swiper-next" type="button" ref={NextElement}>
          <Icon icon={<ChevronForwardOutline />} size="large" />
        </button>
      </div>
    </ModalV2>
  );
}

export default memo(FullScreenImageCarousel);
