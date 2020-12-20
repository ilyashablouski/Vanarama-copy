import React, { FC, memo } from 'react';
import cx from 'classnames';

import { ILoadingProps } from './interfaces';

const Loading: FC<ILoadingProps> = memo(props => {
  const { className, size = 'regular' } = props;

  return (
    <div
      className={cx('loading', className, {
        [`-${size}`]: size,
      })}
    >
      <svg className="loading--svg" viewBox="-75 -75 150 150">
        <circle className="loading--stroke" cx="0" cy="0" r="37.5" />
      </svg>
    </div>
  );
});

Loading.displayName = 'Loading';

export default Loading;
