import cx from 'classnames';
import React, { FC, memo } from 'react';

import { IBadgeProps } from './interfaces';

const Badge: FC<IBadgeProps> = memo(props => {
  const {
    className,
    color = 'success',
    size = 'regular',
    label,
    dataTestId,
  } = props;

  return (
    <span
      className={cx('badge', className, {
        [`-${color}`]: color,
        [`-${size}`]: size,
      })}
      data-testid={dataTestId}
    >
      <span className="badge--inner">{label}</span>
    </span>
  );
});

Badge.displayName = 'Badge';

export default Badge;
