import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import ColourAndTrimModal from '../ColourAndTrimModal';

const toggleColorAndTrimModalVisible = jest.fn();
const setSelectedColour = jest.fn();
const setSelectedTrim = jest.fn();
const setIsFactoryOrder = jest.fn();

const mock = {
  price: 123,
  toggleColorAndTrimModalVisible,
  headingText: 'text',
  sortedTrimList: [
    {
      leadTime: '14-21 Day Delivery',
      options: [
        {
          label: 'Leather - Cranberry red',
          optionId: 104562,
          hotOffer: false,
        },
      ],
    },
    {
      leadTime: 'Factory Order',
      options: [
        {
          label: 'Blue',
          optionId: 134567,
          hotOffer: false,
        },
      ],
    },
  ],
  colourData: [
    {
      leadTime: '8-12 Week Delivery',
      hotOffer: true,
      options: [
        {
          hotOffer: true,
          label: 'Metallic - Infra Red',
          optionId: 89191,
          hex: 'b50c0f',
        },
      ],
    },
    {
      leadTime: 'Factory Order',
      hotOffer: true,
      options: [
        {
          hotOffer: true,
          label: 'Premium paint - Blue flame',
          optionId: 140521,
          hex: '407cd6',
        },
      ],
    },
  ],
  isMobile: false,
  selectedColour: 89191,
  setSelectedColour,
  selectedTrim: 104562,
  setSelectedTrim,
  setIsFactoryOrder,
  imacaAssets: null,
  isCar: true,
};

describe('<ColourAndTrimModal>', () => {
  it('should render correctly', async () => {
    const getComponent = render(<ColourAndTrimModal {...mock} />);

    await waitFor(() => {
      expect(screen.getAllByTestId(`HOT OFFER`)[0]).toBeInTheDocument();
    });

    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });

  it('should close', async () => {
    render(<ColourAndTrimModal {...mock} />);

    await waitFor(() => {
      expect(screen.getAllByTestId(`HOT OFFER`)[0]).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('icon-close'));
    expect(toggleColorAndTrimModalVisible).toBeCalled();

    fireEvent.click(screen.getByText('Apply'));
    expect(toggleColorAndTrimModalVisible).toBeCalled();
  });

  it('should change colour', async () => {
    render(<ColourAndTrimModal {...mock} />);

    await waitFor(() => {
      expect(screen.getAllByTestId(`HOT OFFER`)[0]).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('140521'));
    expect(setIsFactoryOrder).toBeCalledWith(true);
    expect(setSelectedColour).toBeCalledWith(140521);
  });

  it('should change trim', async () => {
    render(<ColourAndTrimModal {...mock} />);

    await waitFor(() => {
      expect(screen.getAllByTestId(`HOT OFFER`)[0]).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('134567'));
    expect(setIsFactoryOrder).not.toBeCalled();
    expect(setSelectedTrim).toBeCalledWith(134567);
  });
});
