import React from 'react';
import cx from 'classnames';

import { IIconListProps } from './interface';

const IconList: React.FC<IIconListProps> = ({
  textColor,
  className,
  children,
  dataTestId,
}) => {
  return (
    <ul
      className={cx('icon-list', className, {
        [`-${textColor}`]: textColor,
      })}
      data-testid={dataTestId}
    >
      {children}
    </ul>
  );
};

export default IconList;
