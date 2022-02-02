import React from 'react';
import { SwiperSlide } from 'swiper/react';
import { render } from '@testing-library/react';
import CarouselSwiper from '../CarouselSwiper';

describe('<CarouselSwiper />', () => {
  it('should render correctly with children', () => {
    const wrapper = render(
      <CarouselSwiper countItems={3}>
        <SwiperSlide>
          <div>
            <p>slide 1</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <p>slide 2</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <p>slide 3</p>
          </div>
        </SwiperSlide>
      </CarouselSwiper>,
    );

    // ASSERT
    expect(wrapper.container).toMatchSnapshot();
  });
  it('should render correctly with two children', () => {
    const wrapper = render(
      <CarouselSwiper countItems={2}>
        <SwiperSlide>
          <div>
            <p>slide 1</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <p>slide 2</p>
          </div>
        </SwiperSlide>
      </CarouselSwiper>,
    );

    // ASSERT
    expect(wrapper.container).toMatchSnapshot();
  });
});
