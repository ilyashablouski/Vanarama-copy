import React, { FC, memo } from 'react';
import cx from 'classnames';

import { IIconProps } from './interfaces';

const Icon: FC<IIconProps> = memo(props => {
  const { className, icon, color, size, ...rest } = props;
  return (
    <i
      {...rest}
      className={cx('icon', className, {
        [`-${color}`]: color,
        [`-${size}`]: size,
      })}
    >
      {icon}
    </i>
  );
});

Icon.displayName = 'Icon';

export default Icon;
