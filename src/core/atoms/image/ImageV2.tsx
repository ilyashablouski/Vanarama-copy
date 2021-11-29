import React, { FC, SyntheticEvent } from 'react';
import Image from 'next/image';
import cx from 'classnames';

import { IImageProps } from './interfaces';

const ImageV2: FC<IImageProps> = props => {
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
    objectPosition,
  } = props;

  let { src } = props;

  if (src.search(/^http[s]?:/) === -1) {
    src = `https:${src}`;
  }

  const onError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.srcset = '';
    e.currentTarget.src = `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`;
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
        onError={onError}
        layout={layout}
        data-testid={dataTestId}
        className="image--native"
        objectFit={objectFit}
        objectPosition={objectPosition}
      />
    </div>
  );
};

ImageV2.displayName = 'ImageV2';

export default React.memo(ImageV2);
