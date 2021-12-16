import React, { FC, memo } from 'react';
import cx from 'classnames';

import Text from 'core/atoms/text';
import ImageV2 from 'core/atoms/image/ImageV2';

import { ICardProps } from './interfaces';
import CardHeader from './CardHeader';
import CardTitle from './CardTitle';

const Card: FC<ICardProps> = memo(props => {
  const {
    className,
    alt,
    lazyLoad,
    children,
    inline,
    overflow,
    header: headerProps,
    customHeader: CustomHeader,
    title,
    description,
    style,
    placeholderImage,
    extrasRender,
    dataUiTestId,
    imageWidth,
    imageHeight,
    imageSrc,
  } = props;

  const CardHeaderComponent = CustomHeader ?? CardHeader;

  return (
    <div
      className={cx('card', className, {
        '-inline': inline,
        '-overflow': overflow,
      })}
      data-testid="card"
      style={style}
      data-uitestid={dataUiTestId}
    >
      {headerProps?.text && (
        <CardHeaderComponent {...headerProps} dataUiTestId={dataUiTestId} />
      )}
      {imageSrc !== undefined ? (
        <ImageV2
          className="card-image"
          width={imageWidth}
          height={imageHeight}
          objectFit="cover"
          lazyLoad={lazyLoad}
          src={(imageSrc || placeholderImage) ?? ''}
          dataTestId="card-image"
          alt={alt}
          plain
        />
      ) : null}
      {extrasRender && <div className="extras">{extrasRender}</div>}
      {(title?.title || title?.link) && <CardTitle {...title} />}
      {description && (
        <Text color="dark" dataTestId="card-description">
          {description}
        </Text>
      )}
      {children}
    </div>
  );
});

export default Card;
