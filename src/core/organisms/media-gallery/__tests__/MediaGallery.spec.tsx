import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Icon from '../../../atoms/icon';
import Flame from '../../../assets/icons/Flame';

import MediaGallery from '../MediaGallery';

describe('<MediaGallery />', () => {
  const resetMocks = () => {
    return {
      isCar: false,
      images: ['test1', 'test2'],
      videoSrc: 'test.com',
      threeSixtyVideoSrc: 'test.com',
      imacaAssets: null,
      colour: 1234,
      changeColour: jest.fn(),
      flag: {
        accentIcon: <Icon icon={<Flame />} color="white" />,
        accentText: 'Hot Offer',
        text: 'dealText',
      },
      isColourAndTrimOverlay: true,
      toggleColorAndTrimModalVisible: jest.fn(),
    };
  };

  let mocks = resetMocks();

  beforeEach(() => {
    mocks = resetMocks();
  });

  it('should be render', () => {
    const { container } = render(<MediaGallery {...mocks} />);
    expect(container.getElementsByClassName('pdp--flag').length).toBe(1);

    fireEvent.click(screen.getByText('Select Colour'));
    expect(mocks.toggleColorAndTrimModalVisible).toBeCalled();
  });
});
