import cx from 'classnames';
import React, { FC, memo } from 'react';

import { IBaseProps } from '../../interfaces/base';
import Heading from '../../atoms/heading';
import Rating from '../../atoms/rating';
import { TSize } from '../../../types/size';
import Button from '../../atoms/button';
import Icon from '../../atoms/icon';
import ArrowForwardSharp from '../../assets/icons/ArrowForwardSharp';

interface ICardTitle {
  title: string;
  description?: string;
  score?: number;
  tag?: keyof JSX.IntrinsicElements;
}

export interface ICardTitleProps extends IBaseProps, ICardTitle {
  link?: React.ReactNode;
  size?: TSize;
  ratingSize?: TSize;
  withBtn?: boolean;
  btnClick?: () => void;
}

const CardTitle: FC<ICardTitleProps> = memo(props => {
  const {
    className,
    link,
    title,
    tag = 'span',
    description,
    score,
    size = 'lead',
    withBtn,
    ratingSize,
    btnClick,
  } = props;
  return (
    <div
      className={cx('title', {
        [`${className}`]: className,
        '-flex-h': withBtn,
      })}
    >
      {link ?? (
        <Heading tag={tag} size={size} color="black" dataTestId="card-heading">
          {title}
        </Heading>
      )}
      {!!description && (
        <Heading
          tag={tag}
          size="small"
          color="dark"
          dataTestId="card-description"
        >
          {description}
        </Heading>
      )}
      {score && <Rating size={ratingSize} score={score} />}
      {withBtn && (
        <Button
          color="teal"
          size="xsmall"
          round
          onClick={btnClick}
          label={
            <Icon
              icon={<ArrowForwardSharp />}
              className="-regular md hydrated"
              name="arrow-forward-sharp"
              color="white"
            />
          }
        />
      )}
    </div>
  );
});

export default CardTitle;
