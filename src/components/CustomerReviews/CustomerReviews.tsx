import React from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Carousel from '@vanarama/uibook/lib/components/organisms/carousel';
import ReviewCard from '@vanarama/uibook/lib/components/molecules/cards/ReviewCard/ReviewCard';

interface IReviewCard {
  text: string;
  author: string;
  score: number;
}

interface ICustomerReviewsProps {
  reviews: IReviewCard[];
  headingClassName?: string;
  sliderClassName?: string;
}

const CustomerReviews: React.FC<ICustomerReviewsProps> = ({
  reviews,
  headingClassName,
  sliderClassName,
}) => {
  if (!reviews.length) {
    return null;
  }

  return (
    <>
      <Heading tag="h2" color="black" size="lead" className={headingClassName}>
        Customer Reviews
      </Heading>
      {reviews.length === 1 ? (
        <ReviewCard review={{ ...reviews[0] }} />
      ) : (
        <Carousel className={sliderClassName} countItems={reviews.length}>
          {reviews.slice(0, 6).map((reviewTile, index) => (
            <ReviewCard key={index.toString()} review={{ ...reviewTile }} />
          ))}
        </Carousel>
      )}
    </>
  );
};

export default CustomerReviews;
