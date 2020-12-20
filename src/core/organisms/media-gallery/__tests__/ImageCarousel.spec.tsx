import React from 'react';
import { shallow, mount } from 'enzyme';

import ImageCarousel from '../ImageCarousel';

describe('<ImageCarousel />', () => {
  const resetMocks = () => {
    return {
      activeSlide: 0,
      images: ['test', 'test', 'test'],
      changeSlideHandler: jest.fn(),
    };
  };
  Element.prototype.scrollBy = jest.fn();

  let mocks = resetMocks();

  beforeEach(() => {
    mocks = resetMocks();
  });
  it('should be render', () => {
    const wrapper = shallow(<ImageCarousel {...mocks} />);
    expect(wrapper.find('.media-gallery').exists()).toBeTruthy();
  });
  it('slide should be changed', () => {
    const wrapper = mount(<ImageCarousel {...mocks} />);
    const arrowBtn = wrapper
      .find('.media-gallery--x-scroll-nav button')
      .first();
    arrowBtn.simulate('click');
    expect(mocks.changeSlideHandler).toHaveBeenCalled();
  });
  it('changeSlideHandler should be called with correct argument', () => {
    const wrapper = mount(<ImageCarousel {...mocks} />);
    const arrowBtn = wrapper
      .find('.media-gallery--x-scroll-nav button')
      .first();
    arrowBtn.simulate('click');
    expect(mocks.changeSlideHandler).toHaveBeenCalledWith(
      mocks.images.length - 1,
    );
  });
});
