import React, { memo } from 'react';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import ImageV2 from 'core/atoms/image/ImageV2';
import { IFullScreenCarouselProps } from 'core/organisms/full-screen-carousel/interface';
import ModalV2 from 'core/molecules/modal-v2';
import Icon from 'core/atoms/icon';
import ChevronBack from 'core/assets/icons/ChevronBack';
import ChevronForward from 'core/assets/icons/ChevronForward';

SwiperCore.use([Navigation]);

function FullScreenImageCarousel({
  images,
  activeSlideIndex = 0,
  imageAltText,
  isOpenModal,
  setOpenModal,
}: IFullScreenCarouselProps) {
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
            swiper.slideToLoop(activeSlideIndex || 0);
          }}
        >
          {images.map(imageUrl => (
            <SwiperSlide key={imageUrl}>
              <ImageV2
                plain
                width={1920}
                height={1080}
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
        <button className="swiper-prev" type="button">
          <Icon icon={<ChevronBack />} size="large" />
        </button>

        <button className="swiper-next" type="button">
          <Icon icon={<ChevronForward />} size="large" />
        </button>
      </div>
    </ModalV2>
  );
}

export default memo(FullScreenImageCarousel);
