import cx from 'classnames';
import React, { FC, memo } from 'react';

import { IBaseProps } from '../../../interfaces/base';
import Rating from '../../../atoms/rating';
import Text from '../../../atoms/text';

interface IReviewCard {
  text: string;
  author: string;
  score: number;
}

export interface IReviewCardProps extends IBaseProps {
  review: IReviewCard;
  optimisedHost?: string;
}

const ReviewCard: FC<IReviewCardProps> = memo(props => {
  const { className, review } = props;
  return (
    <div
      className={cx('card -overflow', {
        [`${className}`]: className,
      })}
      data-testid="card-review"
    >
      <Text
        color="dark"
        size="regular"
        dataTestId="review"
        className="review-text"
      >
        {review.text}
      </Text>
      <div className="review-author" data-testid="author-review">
        {review.author}
      </div>
      <div className="review-decoration">
        <Rating score={review.score} />
      </div>
    </div>
  );
});

export default ReviewCard;
