import React, { FC, memo } from 'react';
import cx from 'classnames';
import SyncCircleOutline from '../../assets/icons/SyncCircleOutline';

import { IIconProps } from './interfaces';

const Icon: FC<IIconProps> = memo(props => {
  const { className, icon, color, size, dataTestId, ...rest } = props;
  return (
    <i
      data-testid={dataTestId}
      {...rest}
      className={cx('icon', className, {
        [`-${color}`]: color,
        [`-${size}`]: size,
      })}
    >
      {icon || <SyncCircleOutline />}
    </i>
  );
});

Icon.displayName = 'Icon';

export default Icon;
