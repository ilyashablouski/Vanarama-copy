import React from 'react';
import ReactPlayer from 'react-player';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import cx from 'classnames';
import IframeContainer from './IframeContainer';
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
  player,
  noLazy,
}) => {
  const renderPlayer = () => (
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
  );

  const render = () =>
    player
      ? renderPlayer()
      : IframeContainer({ responsive, width, height, src });

  return (
    <div className={cx('media', className)}>
      {noLazy ? (
        render()
      ) : (
        <LazyLoadComponent
          visibleByDefault={
            typeof window === 'undefined' ||
            navigator?.vendor === 'Apple Computer, Inc.'
          }
        >
          {render()}
        </LazyLoadComponent>
      )}
    </div>
  );
};

export default React.memo(Media);
