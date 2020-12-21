import cx from 'classnames';
import React from 'react';
import { IListProps as IProps } from './interfaces';

const List: React.FC<IProps> = ({
  children,
  className,
  dataTestId,
  ...rest
}) => (
  <ul {...rest} className={cx('list', className)} data-testid={dataTestId}>
    {children}
  </ul>
);

export default React.memo(List);
