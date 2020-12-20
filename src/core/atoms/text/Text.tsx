import React from 'react';
import cx from 'classnames';
import { ITextProps } from './interfaces';

const Text: React.FC<ITextProps> = ({
  className,
  color = 'darker',
  size = 'regular',
  tag: Tag = 'span',
  htmlFor,
  children,
  invalid,
  dataTestId,
}) => (
  <Tag
    className={cx('text', className, {
      [`-${size}`]: size,
      [`-${color}`]: color,
      '-invalid': invalid,
    })}
    data-testid={dataTestId}
    htmlFor={htmlFor}
  >
    {children}
  </Tag>
);

export default React.memo(Text);
