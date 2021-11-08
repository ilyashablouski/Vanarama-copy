import cx from 'classnames';
import React, { FC, memo } from 'react';

import BlackFridayCardLabel from 'core/molecules/cards/BlackFridayCardLabel';
import { ICardProps } from './interfaces';
import CardHeader from './CardHeader';
import CardTitle from './CardTitle';
import Text from '../../atoms/text';

import {
  optimiseImage,
  DEFAULT_OPTIMISATION,
} from '../../../helpers/imageOptimiseUtils';

const Card: FC<ICardProps> = memo(props => {
  const {
    className,
    alt,
    lazyLoad,
    children,
    inline,
    overflow,
    header,
    title,
    description,
    style,
    placeholderImage,
    optimisedHost,
    optimisationOptions,
    extrasRender,
    isBlackFridayFlag,
    dataUiTestId,
  } = props;

  const { imageSrc } = props;

  let srcset;
  let srcDefault = imageSrc;
  let src1200;
  let src800;
  let src320;

  // Check if image should be optimised.
  if (imageSrc !== undefined && optimisedHost) {
    srcDefault = optimiseImage(optimisedHost, imageSrc, {
      ...DEFAULT_OPTIMISATION,
      ...optimisationOptions,
    });
    src1200 = optimiseImage(optimisedHost, imageSrc, {
      ...DEFAULT_OPTIMISATION,
      width: 1200,
      height: 1200,
      ...optimisationOptions,
    });
    src800 = optimiseImage(optimisedHost, imageSrc, {
      ...DEFAULT_OPTIMISATION,
      width: 800,
      height: 800,
      quality: 70,
      ...optimisationOptions,
    });
    src320 = optimiseImage(optimisedHost, imageSrc, {
      ...DEFAULT_OPTIMISATION,
      width: 320,
      height: 320,
      quality: 60,
      ...optimisationOptions,
    });

    srcset = `${src320} 320w, ${src800} 800w, ${src1200} 1200w`;
  }

  const onImageError = (e: any) => {
    e.target.srcset = '';
    e.target.src = `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`;
  };

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
      {header?.text && <CardHeader {...header} />}
      {imageSrc !== undefined ? (
        <>
          <img
            loading={lazyLoad ? 'lazy' : 'eager'}
            srcSet={srcset}
            sizes="(min-width:320px) 800px, 1200px"
            alt={alt}
            className="card-image"
            src={srcDefault || imageSrc || placeholderImage || undefined}
            data-cfasync="false"
            data-testid="card-image"
            onError={onImageError}
          />
          {isBlackFridayFlag && <BlackFridayCardLabel />}
        </>
      ) : (
        isBlackFridayFlag && <BlackFridayCardLabel className="-relative" />
      )}
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
