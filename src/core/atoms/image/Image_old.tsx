import React, { FC } from 'react';
import cx from 'classnames';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { IImageProps } from './interfaces';

import {
  DEFAULT_OPTIMISATION,
  optimiseImage,
} from '../../../helpers/imageOptimiseUtils';

const Image: FC<IImageProps> = props => {
  const {
    className,
    size = 'expand',
    width = '100%',
    height = '100%',
    alt,
    round,
    plain,
    inline,
    onError,
    optimisedHost,
    optimisationOptions,
  } = props;

  let { src } = props;

  // Check if image should be optimised.
  if (optimisedHost) {
    src = optimiseImage(optimisedHost, src, {
      ...DEFAULT_OPTIMISATION,
      ...optimisationOptions,
    });
  }

  return (
    <div
      className={cx('image', {
        [`${className}`]: className,
        [`-${size}`]: size,
        '-round': round,
        '-plain': plain,
        '-inline': inline,
      })}
    >
      <LazyLoadImage
        alt={alt}
        width={width}
        height={height}
        className="image--native"
        src={src}
        onError={onError}
      />
    </div>
  );
};

Image.displayName = 'Image';

export default Image;
