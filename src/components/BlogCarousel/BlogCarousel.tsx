import React, { FC, memo } from 'react';
import CarouselSwiper from 'core/organisms/carousel';
import { SwiperSlide } from 'swiper/react';
import dynamic from 'next/dynamic';
import BlogCarouselCard from 'core/molecules/cards/BlogCarouselCard/BlogCarouselCard';
import cx from 'classnames';
import Pagination from './Pagination';
import Skeleton from '../Skeleton';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
import { useMobileViewport } from '../../hooks/useMediaQuery';
import { IBlogCarouselCard } from './interface';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  countItems?: number;
  dataUiTestIdAlias?: string;
  className?: string;
  vehiclesList: IBlogCarouselCard[];
}

const BlogCarousel: FC<IProps> = ({
  countItems,
  dataUiTestIdAlias,
  className,
  vehiclesList,
}) => {
  const isMobile = useMobileViewport();

  return vehiclesList?.length > 0 ? (
    <>
      <Heading size="large" color="black" tag="h2" className="-mb-500">
        Lease it now!
      </Heading>
      <CarouselSwiper
        className={cx('blog-carousel -mh-auto', className)}
        loop={false}
        countItems={countItems || 15}
        paginationComponent={
          vehiclesList.length > 3 || (isMobile && vehiclesList.length > 1) ? (
            <Pagination />
          ) : (
            <></>
          )
        }
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
