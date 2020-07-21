import React from 'react';
import Carousel from '@vanarama/uibook/lib/components/organisms/carousel';

interface ISalesCarouselProps {
  length: number;
  children: React.ReactNode;
}

const SalesCarousel = ({ children, length }: ISalesCarouselProps) => {
  return (
    <Carousel className="-mh-auto" countItems={length}>
      {children}
    </Carousel>
  );
};

export default SalesCarousel;
