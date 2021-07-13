import React from 'react';
import dynamic from 'next/dynamic';
import Skeleton from '../Skeleton';

const Carousel = dynamic(() => import('core/organisms/carousel'), {
  loading: () => <Skeleton count={2} />,
});
const ReviewCard = dynamic(
  () => import('core/molecules/cards/ReviewCard/ReviewCard'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

interface IReviewCard {
  text: string;
  author: string;
  score: number;
}

interface ReviewsTwoColumnProps {
  reviews: IReviewCard[];
  sliderClassName?: string;
}

const ReviewsTwoColumn: React.FC<ReviewsTwoColumnProps> = ({
  reviews,
  sliderClassName,

}) => {
  if (!reviews.length) {
    return null;
  }

  return (
    <>
      <div className="row:bg-light">
      {reviews.length === 1 ? (
        <ReviewCard
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          review={{ ...reviews[0] }}
        />
      ) : (
        <Carousel countShow={2} className={sliderClassName} countItems={reviews.length}>
          {reviews.slice(0, 6).map((reviewTile, index) => (
            <ReviewCard
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              key={index.toString()}
              review={{ ...reviewTile }}
            />
          ))}
        </Carousel>
      )}
      </div>
    </>
  );
};

export default ReviewsTwoColumn;
