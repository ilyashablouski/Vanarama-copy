import React from 'react';
import dynamic from 'next/dynamic';
import Skeleton from '../Skeleton';
import { newKeyReviews } from './helpers';
import { ReviewsTwoColumnProps } from './interface';

const Carousel = dynamic(() => import('core/organisms/carousel'), {
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
  if (!reviews.length) {
    return null;
  }

  const newKeys = { summary: 'text', customerName: 'author', rating: 'score' };
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
          <Carousel
            countShow={2}
            className={sliderClassName}
            countItems={reviews.length}
          >
            {reviews.slice(0, 6).map((reviewTile, index) => (
              <ReviewCard
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                key={index.toString()}
                review={{
                  text: reviewTile.summary,
                  author: reviewTile.customerName,
                  score: reviewTile.rating,
                }}
              />
            ))}
          </Carousel>
        )}
      </div>
    </>
  );
};

export default ReviewsTwoColumn;
