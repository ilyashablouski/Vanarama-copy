import React from 'react';
import dynamic from 'next/dynamic';
import { SwiperSlide } from 'swiper/react';
import cx from 'classnames';
import Skeleton from '../Skeleton';
import { newKeyReviews } from './helpers';
import { ReviewsTwoColumnProps } from './interface';

const CarouselSwiper = dynamic(() => import('core/organisms/carousel'), {
  loading: () => <Skeleton count={2} />,
});
const ReviewCard = dynamic(
  () => import('core/molecules/cards/ReviewCard/ReviewCard'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const ReviewsTwoColumn: React.FC<ReviewsTwoColumnProps> = ({
  reviews,
  sliderClassName,
}) => {
  if (!reviews?.length) {
    return null;
  }

  const newKeys = { review: 'text', name: 'author', rating: 'score' };
  const renamedObj = newKeyReviews({ ...reviews[0] }, newKeys);

  return (
    <>
      <div className="row:bg-light">
        {reviews.length === 1 ? (
          <ReviewCard
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            review={renamedObj}
          />
        ) : (
          <CarouselSwiper
            className={cx(sliderClassName, 'carousel-two-column')}
            countItems={reviews.length}
          >
            {reviews.slice(0, 6).map((reviewTile, index) => (
              <SwiperSlide key={index.toString()}>
                <ReviewCard
                  optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                  review={{
                    text: reviewTile?.review || '',
                    author: reviewTile?.name || '',
                    score: reviewTile?.rating || 0,
                  }}
                />
              </SwiperSlide>
            ))}
          </CarouselSwiper>
        )}
      </div>
    </>
  );
};

export default ReviewsTwoColumn;
