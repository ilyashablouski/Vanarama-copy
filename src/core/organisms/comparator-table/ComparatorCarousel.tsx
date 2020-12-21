import React, { FC } from 'react';
import cx from 'classnames';
import Carousel from 'nuka-carousel';
import { useMediaQuery } from 'react-responsive';
import ArrowBackSharp from '../../assets/icons/ArrowBackSharp';
import ArrowForwardSharp from '../../assets/icons/ArrowForwardSharp';
import Ellipse from '../../assets/icons/Ellipse';
import Icon from '../../atoms/icon';
import { IComparatorCaruselProps } from './interface';

const Slider: FC<IComparatorCaruselProps> = ({
  children,
  className,
  countItems,
  index,
  setIndex,
}) => {
  let carouselRef: any;

  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  let slidesToShow = countItems;
  if (isSmallScreen) {
    slidesToShow = 2;
  }

  return (
    <header className={cx('comparator-table--header', className)}>
      <Carousel
        slidesToShow={slidesToShow}
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
      <nav className="comparator-table--nav">
        <button
          className="comparator-table--nav-arrow"
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
            className={cx('comparator-table--nav-item', {
              '-active': index === k,
            })}
          >
            <Icon icon={<Ellipse />} size="regular" />
          </button>
        ))}
        <button
          className="comparator-table--nav-arrow"
          onClick={() => carouselRef.nextSlide()}
          type="button"
        >
          <Icon icon={<ArrowForwardSharp />} color="darker" size="regular" />
        </button>
      </nav>
    </header>
  );
};

export default Slider;
