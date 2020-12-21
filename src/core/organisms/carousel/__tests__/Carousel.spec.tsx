import React from 'react';
import { shallow } from 'enzyme';
import Carousel from '../CarouselV3';

describe('<Carousel />', () => {
  it('should render correctly with children', () => {
    const wrapper = shallow(
      <Carousel countItems={3}>
        <div>
          <p>slide 1</p>
        </div>
        <div>
          <p>slide 2</p>
        </div>
        <div>
          <p>slide 3</p>
        </div>
      </Carousel>,
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });
  it('should render correctly with two children', () => {
    const wrapper = shallow(
      <Carousel countItems={2}>
        <div>
          <p>slide 1</p>
        </div>
        <div>
          <p>slide 2</p>
        </div>
      </Carousel>,
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });
});
