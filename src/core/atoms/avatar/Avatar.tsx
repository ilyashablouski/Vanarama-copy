import React, { FC, memo } from 'react';
import cx from 'classnames';

import { IAvatarProps } from './interfaces';

const Avatar: FC<IAvatarProps> = memo(props => {
  const { className, size = 'regular', src, altText, dataTestId } = props;
  const imgSize = 150;

  return (
    <div
      className={cx('avatar', className, {
        [`-${size}`]: size,
      })}
      data-testid={dataTestId}
    >
      <div className="avatar--mask">
        <img
          className="avatar--img"
          height={imgSize}
          width={imgSize}
          loading="lazy"
          src={src}
          alt={altText}
        />
      </div>
    </div>
  );
});

Avatar.displayName = 'Avatar';

export default Avatar;
