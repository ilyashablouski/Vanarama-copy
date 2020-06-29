import React from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Slider from '@vanarama/uibook/lib/components/organisms/carousel';
import ReviewCard from '@vanarama/uibook/lib/components/molecules/cards/ReviewCard/ReviewCard';
import useSliderProperties from 'hooks/useSliderProperties';

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
  const { itemWidth, slidesToShow } = useSliderProperties(340, 204, 288);

  if (!reviews.length) {
    return null;
  }

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
      {reviews.length === 1 ? (
        <ReviewCard review={{ ...reviews[0] }} />
      ) : (
        <Slider
          className={sliderClassName}
          gutter={16}
          slidesToShow={slidesToShow}
        >
          {reviews.slice(0, 6).map((reviewTile, index) => (
            <div key={index.toString()} style={{ width: itemWidth }}>
              <ReviewCard review={{ ...reviewTile }} />
            </div>
          ))}
        </Slider>
      )}
    </>
  );
};

export default CustomerReviews;
