import React, { FC, memo } from 'react';
import cx from 'classnames';

import { IHeadingProps } from './interfaces';

const Heading: FC<IHeadingProps> = memo(
  ({
    className,
    size = 'regular',
    color = 'primary',
    tag: Tag = 'p',
    href,
    children,
    dataTestId,
    dataUiTestId,
    position,
  }) => (
    <Tag
      className={cx('heading', className, {
        [`-${color}`]: color,
        [`-${size}`]: size,
        [`-${position}`]: position,
      })}
      href={href}
      data-testid={dataTestId}
      data-uitestid={dataUiTestId}
    >
      {children}
    </Tag>
  ),
);

Heading.displayName = 'Heading';

export default Heading;
