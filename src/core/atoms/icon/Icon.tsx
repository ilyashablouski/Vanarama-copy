import React, { FC, lazy, memo, Suspense } from 'react';
import cx from 'classnames';

import { IIconProps } from './interfaces';
import SyncCircleOutline from '../../assets/icons/SyncCircleOutline';

const Icon: FC<IIconProps> = memo(props => {
  const { className, icon, color, size, name, ...rest } = props;
  const isSsr = typeof window === 'undefined';

  const DynamicIcon = lazy(() =>
    import(`./core/assets/icons/${name}`).catch(() =>
      import('../../assets/icons/SyncCircleOutline'),
    ),
  );

  return (
    <i
      {...rest}
      className={cx('icon', className, {
        [`-${color}`]: color,
        [`-${size}`]: size,
      })}
    >
      {icon ??
        (isSsr ? null : (
          <Suspense fallback={<SyncCircleOutline />}>
            <DynamicIcon />
          </Suspense>
        ))}
    </i>
  );
});

Icon.displayName = 'Icon';

export default Icon;
