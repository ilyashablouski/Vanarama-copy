import React from 'react';
import CarouselSwiper from 'core/organisms/carousel';
import { SwiperSlide } from 'swiper/react';
import cx from 'classnames';
import { IProductCarouselProps } from './interface';
import ProductCarouselCard from './ProductCarouselCard';

const ProductCarousel: React.FC<IProductCarouselProps> = ({
  leaseType,
  countItems,
  data,
  dataTestIdBtn,
  productType,
  customCTABackground,
  dataUiTestIdMask,
  className,
}) => {
  if (data.productCard?.length && data.productCard?.length > 1) {
    return (
      <CarouselSwiper
        className={cx('-product -mh-auto', className)}
        countItems={countItems || 6}
      >
        {data.productCard?.map(
          (product, index) =>
            product && (
              <SwiperSlide key={`${product.capId}_${index}` || ''}>
                {({ isDuplicate }) => (
                  <ProductCarouselCard
                    product={product}
                    cardIndex={index}
                    leaseType={leaseType}
                    data={data}
                    dataTestIdBtn={dataTestIdBtn}
                    dataUiTestIdMask={
                      isDuplicate ? undefined : dataUiTestIdMask
                    }
                    productType={productType}
                    customCTABackground={customCTABackground}
                  />
                )}
              </SwiperSlide>
            ),
        )}
      </CarouselSwiper>
    );
  }
  return (
    <div className="carousel -single-product -mh-auto">
      {data.productCard?.map(
        (product, index) =>
          product && (
            <ProductCarouselCard
              key={`${product.capId}_${index}` || ''}
              product={product}
              cardIndex={index}
              leaseType={leaseType}
              data={data}
              dataTestIdBtn={dataTestIdBtn}
              dataUiTestIdMask={dataUiTestIdMask}
              productType={productType}
              customCTABackground={customCTABackground}
            />
          ),
      )}
    </div>
  );
};

export default React.memo(ProductCarousel);
