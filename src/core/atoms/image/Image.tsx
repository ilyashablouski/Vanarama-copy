import React, { FC, SyntheticEvent } from 'react';
import cx from 'classnames';

import { IImageProps } from './interfaces';

import {
  DEFAULT_OPTIMISATION,
  optimiseImage,
} from '../../../helpers/imageOptimiseUtils';

const Image: FC<IImageProps> = ({
  className,
  size = 'expand',
  width,
  height,
  src,
  alt,
  round,
  plain,
  inline,
  optimisedHost,
  optimisationOptions,
  lazyLoad,
  dataTestId,
  dataUiTestId,
}) => {
  let srcset;
  let srcDefault = src;
  let src1200;
  let src800;
  let src320;

  // Check if image should be optimised.
  if (optimisedHost) {
    srcDefault = optimiseImage(optimisedHost, src, {
      ...DEFAULT_OPTIMISATION,
      ...optimisationOptions,
    });
    src1200 = optimiseImage(optimisedHost, src, {
      ...DEFAULT_OPTIMISATION,
      width: 1200,
      height: 1200,
      ...optimisationOptions,
    });
    src800 = optimiseImage(optimisedHost, src, {
      ...DEFAULT_OPTIMISATION,
      width: 800,
      height: 800,
      quality: 70,
      ...optimisationOptions,
    });
    src320 = optimiseImage(optimisedHost, src, {
      ...DEFAULT_OPTIMISATION,
      width: 320,
      height: 320,
      quality: 60,
      ...optimisationOptions,
    });

    srcset = `${src320} 320w, ${src800} 800w, ${src1200} 1200w`;
  }

  const onError = (event: SyntheticEvent<HTMLImageElement>) => {
    // eslint-disable-next-line no-param-reassign
    event.currentTarget.srcset = '';
    // eslint-disable-next-line no-param-reassign
    event.currentTarget.src = `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`;
  };

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
      <img
        loading={lazyLoad ? 'lazy' : 'eager'}
        srcSet={srcset}
        sizes="(min-width:320px) 800px, 1200px"
        alt={alt}
        width={width}
        height={height}
        className="image--native"
        src={srcDefault || src}
        onError={onError}
        data-cfasync="false"
        data-testid={dataTestId}
        data-uitestid={dataUiTestId}
      />
    </div>
  );
};

Image.displayName = 'Image';

export default React.memo(Image);
