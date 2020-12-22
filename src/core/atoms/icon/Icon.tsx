import React, { FC, memo, Suspense } from 'react';
import cx from 'classnames';
import dynamic from 'next/dynamic';

import { IIconProps } from './interfaces';
import SyncCircleOutline from '../../assets/icons/SyncCircleOutline';

const Icon: FC<IIconProps> = memo(props => {
  const { className, icon, color, size, name, ...rest } = props;

  const DynamicIcon = dynamic(() => import(`../../assets/icons/${name}`), {
    loading: () => <SyncCircleOutline />,
    ssr: false,
  });

  return (
    <i
      {...rest}
      className={cx('icon', className, {
        [`-${color}`]: color,
        [`-${size}`]: size,
      })}
    >
      {icon ?? (
        <Suspense fallback={<SyncCircleOutline />}>
          <DynamicIcon />
        </Suspense>
      )}
    </i>
  );
});

Icon.displayName = 'Icon';

export default Icon;
