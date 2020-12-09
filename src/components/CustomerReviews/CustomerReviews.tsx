import React from 'react';
import dynamic from 'next/dynamic';
import Skeleton from '../Skeleton';

const Carousel = dynamic(
  () => import('@vanarama/uibook/lib/components/organisms/carousel'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const ReviewCard = dynamic(
  () =>
    import(
      '@vanarama/uibook/lib/components/molecules/cards/ReviewCard/ReviewCard'
    ),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

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
        <Carousel className={sliderClassName} countItems={reviews.length}>
          {reviews.slice(0, 6).map((reviewTile, index) => (
            <ReviewCard
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              key={index.toString()}
              review={{ ...reviewTile }}
            />
          ))}
        </Carousel>
      )}
    </>
  );
};

export default CustomerReviews;
