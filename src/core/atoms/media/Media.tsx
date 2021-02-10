import React from 'react';
import ReactPlayer from 'react-player/lazy';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import cx from 'classnames';
import { IMediaProps } from './interface';

const Media: React.FC<IMediaProps> = ({
  src,
  playing,
  width,
  height,
  loop,
  controls = true,
  light,
  volume,
  muted,
  className,
  dataTestId,
  vimeoConfig,
  responsive,
  iframe,
}) => {
  console.log(iframe);
  return (
    <div className={cx('media', className)}>
      <LazyLoadComponent visibleByDefault={typeof window === 'undefined'}>
        {iframe ? (
          <div className={cx({ 'media-player--embed': responsive })}>
            <iframe
              frameBorder={0}
              width={width}
              height={height}
              src={src}
              title="media"
            />
          </div>
        ) : (
          <ReactPlayer
            className={cx({ 'media-player--embed': responsive })}
            url={src}
            playing={playing}
            src={src}
            width={width}
            height={height}
            loop={loop}
            controls={controls}
            light={light}
            volume={volume}
            muted={muted}
            data-testid={dataTestId}
            config={{ vimeo: { playerOptions: vimeoConfig } }}
          />
        )}
      </LazyLoadComponent>
    </div>
  );
};

export default React.memo(Media);
