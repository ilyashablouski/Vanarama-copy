import React, { useMemo, useState } from 'react';
import cx from 'classnames';
import Image from 'core/atoms/image';

interface IIframeContainer {
  width?: string;
  height?: string;
  responsive?: boolean;
  src: string;
}

const IframeContainer = ({
  width,
  height,
  responsive,
  src,
}: IIframeContainer) => {
  const [isThumbnail, setIsThumbnail] = useState(src.includes('youtube'));
  const onLoadPlayerHandler = () => {
    if (isThumbnail) setIsThumbnail(false);
  };
  const thumbSrc = useMemo(() => {
    const id = src
      .split('/')
      .slice(-1)[0]
      .split('?')[0];
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  }, [src]);

  return (
    <div className={cx({ 'media-player--embed': responsive })}>
      {isThumbnail ? (
        <div
          role="img"
          className="preview-wrapper"
          onClick={onLoadPlayerHandler}
        >
          <div
            role="button"
            aria-label="Play"
            className="play-btn"
            onClick={onLoadPlayerHandler}
          />
          <Image
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            src={
              thumbSrc ||
              'https://source.unsplash.com/collection/2102317/1000x650?sig=40349'
            }
          />
        </div>
      ) : (
        <iframe
          frameBorder={0}
          width={width}
          height={height}
          src={src}
          title="media"
        />
      )}
    </div>
  );
};

export default IframeContainer;
