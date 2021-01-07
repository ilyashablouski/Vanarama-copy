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
}) => (
  <div className={cx('media', className)}>
    {iframe ? (
      <LazyLoadComponent>
        <div className={cx({ 'media-player--embed': responsive })}>
          <iframe width={width} height={height} src={src} title="media" />
        </div>
      </LazyLoadComponent>
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
  </div>
);

export default React.memo(Media);
