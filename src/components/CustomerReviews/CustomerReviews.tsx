import React from 'react';
import dynamic from 'next/dynamic';
import { SwiperSlide } from 'swiper/react';
import Skeleton from '../Skeleton';

const CarouselSwiper = dynamic(() => import('core/organisms/carousel'), {
  loading: () => <Skeleton count={3} />,
});
const ReviewCard = dynamic(
  () => import('core/molecules/cards/ReviewCard/ReviewCard'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

interface IReviewCard {
  text: string;
  author: string;
  score: number;
}

interface ICustomerReviewsProps {
  reviews: IReviewCard[];
  title: string | null | undefined;
  headingClassName?: string;
  sliderClassName?: string;
}

const CustomerReviews: React.FC<ICustomerReviewsProps> = ({
  reviews,
  headingClassName,
  sliderClassName,
  title,
}) => {
  if (!reviews.length) {
    return null;
  }

  return (
    <>
      <Heading tag="h2" color="black" size="lead" className={headingClassName}>
        {title || ''}
      </Heading>
      {reviews.length === 1 ? (
        <ReviewCard
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          review={{ ...reviews[0] }}
        />
      ) : (
        <CarouselSwiper className={sliderClassName} countItems={reviews.length}>
          {reviews.slice(0, 6).map((reviewTile, index) => (
            <SwiperSlide key={index.toString()}>
              <ReviewCard
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                review={{ ...reviewTile }}
              />
            </SwiperSlide>
          ))}
        </CarouselSwiper>
      )}
    </>
  );
};

export default CustomerReviews;
