import React, { FC, memo } from 'react';
import cx from 'classnames';

import Text from '../text';
import Icon from '../icon';

import StarSharp from '../../assets/icons/StarSharp';
import StarHalfSharp from '../../assets/icons/StarHalfSharp';
import StarOutline from '../../assets/icons/StarOutline';

import { IIconWrapperProps, IRatingProps } from './interfaces';

const IconWrapper: FC<IIconWrapperProps> = memo(
  ({ index, children, onClick }) => {
    return onClick ? (
      <span
        role="button"
        onClick={() => onClick?.(index)}
        style={{ cursor: 'pointer' }}
      >
        {children}
      </span>
    ) : (
      <span>{children}</span>
    );
  },
);

const MIN_SCORE = 0;
const MAX_SCORE = 5;

const Rating: FC<IRatingProps> = memo(props => {
  const {
    className,
    color = 'orange',
    size = 'regular',
    labelColor = 'dark',
    score = 4.5,
    noLabel = false,
    onClick,
    dataUiTestId,
  } = props;

  let index;
  let value;
  const items = [];

  if (score < MIN_SCORE) {
    console.error(`The rating cannot be lower than ${MIN_SCORE}!`);
    value = MIN_SCORE;
  } else if (score > MAX_SCORE) {
    console.error(`The rating cannot be higher than ${MAX_SCORE}!`);
    value = MAX_SCORE;
  } else {
    value = score;
  }

  // Full.
  if (value && value > 0) {
    for (index = 0; index < Math.trunc(value); index += 1) {
      const rate = items.length + 1;
      items.push(
        <IconWrapper key={`full${index}`} index={rate} onClick={onClick}>
          <Icon icon={<StarSharp />} color={color} />
        </IconWrapper>,
      );
    }
  }

  // Half.
  if (value && value > 0 && !Number.isInteger(value)) {
    const rate = items.length + 1;
    items.push(
      <IconWrapper key="half" index={rate} onClick={onClick}>
        <Icon icon={<StarHalfSharp />} color={color} />
      </IconWrapper>,
    );
  }

  // Empty.
  if (value && value > 0 && !Number.isInteger(value)) {
    value += 1;
  }
  for (index = 0; index < Math.ceil(MAX_SCORE - value); index += 1) {
    const rate = items.length + 1;
    items.push(
      <IconWrapper key={`empty${index}`} index={rate} onClick={onClick}>
        <Icon icon={<StarOutline />} color={color} />
      </IconWrapper>,
    );
  }

  return (
    <div
      className={cx('rating', className, `-${size}`, `-${color}`)}
      data-uitestid={dataUiTestId}
    >
      {items}
      {!noLabel && (
        <Text size={size} color={labelColor}>
          {score}
        </Text>
      )}
    </div>
  );
});

Rating.displayName = 'Rating';

export default Rating;
