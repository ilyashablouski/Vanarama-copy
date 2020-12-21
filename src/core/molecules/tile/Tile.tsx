import React, { FC, memo } from 'react';
import cx from 'classnames';

import { ITileProps } from './interfaces';

const Tile: FC<ITileProps> = memo(props => {
  const {
    className,
    children,
    centered,
    color,
    dataTestId,
    scrollable,
    plain,
  } = props;

  return (
    <div
      className={cx('tile', className, {
        [`-${color} tile--color`]: color,
        '-scrollable': scrollable,
        '-plain': plain,
        'tile--centered': centered,
      })}
      data-testid={dataTestId}
    >
      {children}
    </div>
  );
});

Tile.displayName = 'Tile';

export default Tile;
