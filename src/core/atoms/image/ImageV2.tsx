import React, { FC, SyntheticEvent } from 'react';
import Image from 'next/image';
import cx from 'classnames';

import { IImagePropsV2 } from './interfaces';

const PLACEHOLDER_URL = `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`;

const ImageV2: FC<IImagePropsV2> = props => {
  const {
    className,
    size = 'expand',
    width,
    height,
    alt,
    round,
    plain,
    inline,
    dataTestId,
    objectFit,
    lazyLoad,
  } = props;

  let { src } = props;

  src = src || PLACEHOLDER_URL;
  if (src.search(/^http[s]?:/) === -1) {
    src = `https:${src}`;
  }

  const onError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.srcset = '';
    e.currentTarget.src = PLACEHOLDER_URL;
  };

  const layout = width && height ? 'responsive' : 'fill';

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
      <Image
        alt={alt}
        width={width}
        height={height}
        src={src}
        layout={layout}
        data-testid={dataTestId}
        className="image--native"
        objectFit={objectFit}
        priority={lazyLoad === false}
        onError={onError}
      />
    </div>
  );
};

ImageV2.displayName = 'ImageV2';

export default React.memo(ImageV2);
