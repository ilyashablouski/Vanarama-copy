import cx from 'classnames';
import React, { FC, memo } from 'react';

import { ILinkProps } from './interfaces';

const Link: FC<ILinkProps> = memo(props => {
  const {
    className,
    color = 'primary',
    size = 'regular',
    href,
    plain = true,
    solid = false,
    position,
    children,
    onClick,
    dataTestId,
  } = props;

  return (
    <a
      className={cx('link', className, {
        [`-${color}`]: color,
        [`-${size}`]: size,
        [`-${position}`]: position,
        '-plain': plain,
        '-solid': solid,
      })}
      href={href}
      onClick={onClick}
      data-testid={dataTestId}
    >
      {children || href}
    </a>
  );
});

Link.displayName = 'Link';

export default Link;
