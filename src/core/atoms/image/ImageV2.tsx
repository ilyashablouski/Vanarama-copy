import React, { FC, SyntheticEvent } from 'react';
import Image from 'next/image';
import cx from 'classnames';

import { IImageV2Props } from './interfaces';

const PLACEHOLDER_URL = `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`;

const ImageV2: FC<IImageV2Props> = ({
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
  optimisedHost,
  sizes,
  quality,
  lazyLoad,
  dataUiTestId,
  ...props
}) => {
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
      data-uitestid={dataUiTestId ? `${dataUiTestId}_img-wrapper` : undefined}
    >
      <Image
        alt={alt}
        width={width}
        height={height}
        src={src}
        layout={layout}
        sizes={sizes}
        quality={quality}
        data-testid={dataTestId}
        className="image--native"
        objectFit={objectFit}
        priority={lazyLoad === false}
        onError={onError}
        data-uitestid={dataUiTestId ? `${dataUiTestId}_img` : undefined}
      />
    </div>
  );
};

ImageV2.displayName = 'ImageV2';

export default React.memo(ImageV2);
