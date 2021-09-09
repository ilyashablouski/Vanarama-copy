import React, { memo } from 'react';
import SwiperCore, { EffectFade, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'core/atoms/image/Image';
import { IFullScreenCarouselProps } from 'core/organisms/full-screen-carousel/interface';
import ModalV2 from 'core/molecules/modal-v2';
import Icon from 'core/atoms/icon';
import ArrowForwardV2 from 'core/assets/icons/ArrowForwardV2';

SwiperCore.use([Navigation, EffectFade]);

function FullScreenImageCarousel({
  images,
  imageAltText,
  isOpenModal,
  setOpenModal,
}: IFullScreenCarouselProps) {
  return (
    <ModalV2 open={isOpenModal} onClose={setOpenModal}>
      <div className="full-screen-carousel">
        <Swiper
          centeredSlides
          loop={images.length > 1}
          navigation={{
            prevEl: `.swiper-prev`,
            nextEl: `.swiper-next`,
          }}
          effect="fade"
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

          <button className="swiper-prev" type="button">
            <Icon icon={<ArrowForwardV2 />} color="darker" size="regular" />
          </button>

          <button className="swiper-next" type="button">
            <Icon icon={<ArrowForwardV2 />} color="darker" size="regular" />
          </button>
        </Swiper>
      </div>
    </ModalV2>
  );
}

export default memo(FullScreenImageCarousel);
