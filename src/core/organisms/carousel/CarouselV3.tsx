import React, { FC, useState, useEffect } from 'react';
import cx from 'classnames';
import Carousel from 'nuka-carousel';
import { useMediaQuery } from 'react-responsive';
import ArrowBackSharp from '../../assets/icons/ArrowBackSharp';
import ArrowForwardSharp from '../../assets/icons/ArrowForwardSharp';
import Ellipse from '../../assets/icons/Ellipse';
import Icon from '../../atoms/icon';
import { ICarouselProps } from './interface';

const Slider: FC<ICarouselProps> = ({ children, className, countItems }) => {
  const [index, setIndex] = useState(0);
  let carouselRef: any;

  const isMediumScreen = useMediaQuery({ minWidth: 768, maxWidth: 1215 });
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  let slidesToShow = 3;
  if (isSmallScreen) {
    slidesToShow = 1;
  } else if (isMediumScreen) {
    slidesToShow = 2;
  }

  useEffect(() => {
    setTimeout(() => {
      const sliders = document.querySelectorAll('.carousel .card');
      Array.from(Array(sliders.length)).forEach((el, id) => {
        (sliders[id] as HTMLElement).className += ' -v-height';
      });
    }, 300);
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
        {React.Children.map(children, (_, k) => (
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
