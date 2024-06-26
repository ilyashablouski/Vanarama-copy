import React from 'react';
import cx from 'classnames';
import { ITextProps } from './interfaces';

const Text: React.FC<ITextProps> = ({
  id,
  className,
  color = 'darker',
  size = 'regular',
  tag: Tag = 'span',
  htmlFor,
  children,
  invalid,
  dataTestId,
  dataUiTestId,
}) => (
  <Tag
    id={id}
    htmlFor={htmlFor}
    className={cx('text', className, {
      [`-${size}`]: size,
      [`-${color}`]: color,
      '-invalid': invalid,
    })}
    data-testid={dataTestId}
    data-uitestid={dataUiTestId}
  >
    {children}
  </Tag>
);

export default React.memo(Text);
