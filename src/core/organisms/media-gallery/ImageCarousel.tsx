import React, { FC, memo } from 'react';
import cx from 'classnames';
import uniqid from 'uniqid';
import { IImageCarouselProps } from './interfaces';
import Icon from '../../atoms/icon';

import Image from '../../atoms/image';

import ChevronBackCircleSharp from '../../assets/icons/ChevronBackCircleSharp';
import ChevronForwardCircleSharp from '../../assets/icons/ChevronForwardCircleSharp';

const ImageCarousel: FC<IImageCarouselProps> = memo(props => {
  const { activeSlide, images, changeSlideHandler, imageAltText } = props;
  const positionStyle = {
    '--x': activeSlide,
    '--y': 0,
  } as React.CSSProperties;
  const yTrackRef = React.useRef<HTMLDivElement>(null);
  const scroll = React.useRef<HTMLDivElement>(null);

  const onChangeSlide = (index: number) => {
    // do nothing if the active slide is selected
    if (index === activeSlide) {
      return;
    }
    // сheck for first/last element
    const isExtreme = index === 0 || index === images.length - 1;
    const {
      height = 0,
    } = yTrackRef?.current?.getBoundingClientRect() as DOMRect;
    // scroll down
    if (index > activeSlide) {
      scroll.current?.scrollBy({
        left: 0,
        top: Math.ceil(isExtreme ? height : height / images.length),
        behavior: 'smooth',
      });
      // scroll up
    } else {
      scroll.current?.scrollBy({
        left: 0,
        top: -Math.ceil(isExtreme ? height : height / images.length),
        behavior: 'smooth',
      });
    }
    // change active slide
    changeSlideHandler(index);
  };

  const onPreviousSlide = () =>
    onChangeSlide(activeSlide === 0 ? images.length - 1 : activeSlide - 1);

  const onNextSlide = () =>
    onChangeSlide(activeSlide === images.length - 1 ? 0 : activeSlide + 1);

  return (
    <div className="media-gallery" style={positionStyle}>
      <div className="media-gallery--x-scroll">
        <div className="media-gallery--x-track">
          {images.map((image, index) => (
            <div
              key={uniqid()}
              className={cx('media-gallery--x-track-item', {
                '-active': index === activeSlide,
              })}
            >
              <Image
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                src={image}
                size="expand"
                plain
                alt={imageAltText}
              />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <nav className="media-gallery--x-scroll-nav">
            <button onClick={onPreviousSlide} type="button">
              <Icon
                icon={<ChevronBackCircleSharp />}
                color="orange"
                className="md hydrated"
                size="lead"
              />
            </button>
            <button onClick={onNextSlide} type="button">
              <Icon
                icon={<ChevronForwardCircleSharp />}
                color="orange"
                className="md hydrated"
                size="lead"
              />
            </button>
          </nav>
        )}
      </div>
      <div className="media-gallery--y-scroll" ref={scroll}>
        <div className="media-gallery--y-track" ref={yTrackRef}>
          {images.map((image, index) => (
            <div
              role="list"
              key={uniqid()}
              className={cx('media-gallery--y-track-item', {
                '-active': index === activeSlide,
              })}
              onClick={() => onChangeSlide(index)}
            >
              <Image
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                src={image}
                size="xlarge"
                alt={imageAltText}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default ImageCarousel;
