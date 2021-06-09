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

const Rating: FC<IRatingProps> = memo(props => {
  const {
    className,
    color = 'orange',
    size = 'regular',
    labelColor = 'dark',
    max = 5,
    score = 4.5,
    noLabel = false,
    onClick,
  } = props;

  if (!max) {
    return null;
  }

  let value = Number(score);
  let i;
  const items = [];

  // Full.
  if (value && value > 0) {
    for (i = 0; i < Math.trunc(value); i += 1) {
      const rate = items.length + 1;
      items.push(
        <IconWrapper key={`full${i}`} index={rate} onClick={onClick}>
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
  for (i = 0; i < Math.ceil(max - value); i += 1) {
    const rate = items.length + 1;
    items.push(
      <IconWrapper key={`empty${i}`} index={rate} onClick={onClick}>
        <Icon icon={<StarOutline />} color={color} />
      </IconWrapper>,
    );
  }

  return (
    <div className={cx('rating', className, `-${size}`, `-${color}`)}>
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
