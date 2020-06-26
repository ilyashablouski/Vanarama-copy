import React from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Slider from '@vanarama/uibook/lib/components/organisms/carousel';
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
  return (
    <>
      <Heading
        tag="span"
        color="black"
        size="lead"
        className={headingClassName}
      >
        Customer Reviews
      </Heading>
      <Slider className={sliderClassName}>
        {reviews.slice(0, 6).map((reviewTile, index) => (
          <ReviewCard key={index.toString()} review={{ ...reviewTile }} />
        ))}
      </Slider>
    </>
  );
};

export default CustomerReviews;
