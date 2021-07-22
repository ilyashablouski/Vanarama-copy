import React, { FC, useState, useLayoutEffect } from 'react';
import cx from 'classnames';
import Carousel from 'nuka-carousel';
import { useMediaQuery } from 'react-responsive';
import ArrowBackSharp from '../../assets/icons/ArrowBackSharp';
import ArrowForwardSharp from '../../assets/icons/ArrowForwardSharp';
import Ellipse from '../../assets/icons/Ellipse';
import Icon from '../../atoms/icon';
import { ICarouselProps } from './interface';

const Slider: FC<ICarouselProps> = ({
  children,
  countShow = 3,
  className,
  countItems,
  initialSlideHeight,
}) => {
  const [index, setIndex] = useState(0);
  let carouselRef: any;

  const isMediumScreen = useMediaQuery({ minWidth: 768, maxWidth: 1215 });
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  let slidesToShow = countShow;
  if (isSmallScreen) {
    slidesToShow = 1;
  } else if (isMediumScreen) {
    slidesToShow = 2;
  }

  //  Carousel card height fix
  //  useLayoutEffect has been used to apply a CSS class '-v-height' to each .card found within
  //  the carousel component after a short delay. This is because we had to wait until
  //  the <Carousel> component had finished applying all its inline CSS calculations.

  useLayoutEffect(() => {
    setTimeout(() => {
      const sliders = document.querySelectorAll('.carousel .card');
      Array.from(Array(sliders.length)).forEach((el, id) => {
        (sliders[id] as HTMLElement).className += ' -v-height';
      });
    }, 200);
  }, []);

  return (
    <div className={cx('carousel', className)}>
      <Carousel
        slidesToShow={
          countItems && countItems < slidesToShow ? countItems : slidesToShow
        }
        wrapAround
        withoutControls
        ref={(carousel: any) => {
          carouselRef = carousel;
        }}
        slideIndex={index}
        afterSlide={(slideIndex: number) => setIndex(slideIndex)}
        cellSpacing={20}
        initialSlideWidth={392}
        initialSlideHeight={initialSlideHeight}
      >
        {children}
      </Carousel>

      <nav className="carousel--nav">
        <button
          className="carousel--nav-arrow"
          onClick={() => carouselRef.previousSlide()}
          type="button"
        >
          <Icon icon={<ArrowBackSharp />} color="darker" size="regular" />
        </button>
        {!isSmallScreen &&
          React.Children.map(children, (_, k) => (
            <div>
              <button
                key={k.toString()}
                type="button"
                onClick={() => {
                  setIndex(k);
                  carouselRef.goToSlide(k);
                }}
                className={cx('carousel--nav-item', {
                  '-active': index === k,
                })}
              >
                <Icon icon={<Ellipse />} size="regular" />
              </button>
            </div>
          ))}
        <button
          className="carousel--nav-arrow"
          onClick={() => carouselRef.nextSlide()}
          type="button"
        >
          <Icon icon={<ArrowForwardSharp />} color="darker" size="regular" />
        </button>
      </nav>
    </div>
  );
};

export default Slider;
