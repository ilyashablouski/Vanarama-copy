import React from 'react';
import { shallow } from 'enzyme';
import Icon from '../../../atoms/icon';
import Flame from '../../../assets/icons/Flame';

import MediaGallery from '../MediaGallery';

describe('<MediaGallery />', () => {
  const resetMocks = () => {
    return {
      isCar: false,
      images: ['test', 'test'],
      videoSrc: 'test.com',
      threeSixtyVideoSrc: 'test.com',
      imacaAssets: null,
      colour: 1234,
      setColour: jest.fn(),
      flag: {
        accentIcon: <Icon icon={<Flame />} color="white" />,
        accentText: 'Hot Offer',
        text: 'dealText',
      },
    };
  };

  let mocks = resetMocks();

  beforeEach(() => {
    mocks = resetMocks();
  });

  it('should be render', () => {
    const wrapper = shallow(<MediaGallery {...mocks} />);
    expect(wrapper.find('.pdp--flag').exists()).toBeTruthy();
  });
});
