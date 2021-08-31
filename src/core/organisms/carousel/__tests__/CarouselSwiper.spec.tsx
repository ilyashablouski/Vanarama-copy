import React from 'react';
import { shallow } from 'enzyme';
import { SwiperSlide } from 'swiper/react';
import CarouselSwiper from '../CarouselSwiper';

describe('<CarouselSwiper />', () => {
  it('should render correctly with children', () => {
    const wrapper = shallow(
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
    expect(wrapper).toMatchSnapshot();
  });
  it('should render correctly with two children', () => {
    const wrapper = shallow(
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
    expect(wrapper).toMatchSnapshot();
  });
});
