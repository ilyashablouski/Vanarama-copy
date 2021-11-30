import React, { FC, memo } from 'react';
import CarouselSwiper from 'core/organisms/carousel';
import { SwiperSlide } from 'swiper/react';
import dynamic from 'next/dynamic';
import BlogCarouselCard from 'core/molecules/cards/BlogCarouselCard/BlogCarouselCard';
import Pagination from './Pagination';
import useVehicleCarousel from '../../hooks/useVehicleCarousel';
import { BlogPost_blogPost_productFilter } from '../../../generated/BlogPost';
import { productFilterMapper } from './helpers';
import Skeleton from '../Skeleton';
import { LeaseTypeEnum } from '../../../generated/globalTypes';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  countItems?: number;
  productFilters: BlogPost_blogPost_productFilter;
  dataUiTestIdAlias?: string;
}

const BlogCarousel: FC<IProps> = ({
  countItems,
  productFilters,
  dataUiTestIdAlias,
}) => {
  const vehiclesList = useVehicleCarousel(productFilterMapper(productFilters));
  return vehiclesList?.length > 0 ? (
    <>
      <Heading size="large" color="black" tag="h2" className="-mb-500">
        Lease it now!
      </Heading>
      <CarouselSwiper
        className="blog-carousel -mh-auto carousel-two-column"
        loop={false}
        countItems={countItems || 15}
        paginationComponent={vehiclesList.length > 3 ? <Pagination /> : <></>}
      >
        {vehiclesList.map((product, index) => (
          <SwiperSlide key={`${product.capId}_${index}` || ''}>
            {({ isDuplicate }) => (
              <BlogCarouselCard
                cardIndex={index}
                cardData={product}
                leaseType={LeaseTypeEnum.PERSONAL}
                dataUiTestIdAlias={isDuplicate ? undefined : dataUiTestIdAlias}
              />
            )}
          </SwiperSlide>
        ))}
      </CarouselSwiper>
    </>
  ) : null;
};

export default memo(BlogCarousel);
