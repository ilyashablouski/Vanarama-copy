import React from 'react';
import { render } from '@testing-library/react';
import CardIcons, { TIcon } from '../CardIcons';
import BluetoothSharp from '../../../assets/icons/BluetoothSharp';
import CompassSharp from '../../../assets/icons/CompassSharp';
import SnowSharp from '../../../assets/icons/SnowSharp';
import WifiSharp from '../../../assets/icons/WifiSharp';

describe('<CardIcons />', () => {
  it('should render correctly', () => {
    // ARRANGE
    const icons: TIcon[] = [
      { icon: <SnowSharp />, label: 'Aircon', index: '1', name: 'Aircon' },
      {
        icon: <BluetoothSharp />,
        label: 'Bluetooth',
        index: '2',
        name: 'Bluetooth',
      },
      {
        icon: <CompassSharp />,
        label: 'Navigation',
        index: '3',
        name: 'Navigation',
      },
      { icon: <WifiSharp />, label: 'Sensors', index: '4', name: 'Sensors' },
    ];

    // ACT
    const wrapper = render(
      <CardIcons className="some-custom-class" icons={icons} />,
    );

    // ASSERT
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render with N/A when name undefined', () => {
    // ARRANGE
    const icons: TIcon[] = [
      { icon: <SnowSharp />, label: 'Aircon', index: '1', name: 'Aircon' },
      {
        icon: <BluetoothSharp />,
        label: 'Bluetooth',
        index: '2',
        name: '',
      },
      {
        icon: <CompassSharp />,
        label: 'Navigation',
        index: '3',
        name: '',
      },
      { icon: <WifiSharp />, label: 'Sensors', index: '4', name: '' },
    ];

    // ACT
    const wrapper = render(
      <CardIcons className="some-custom-class" icons={icons} />,
    );

    // ASSERT
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render no more than 4 icons', () => {
    // ARRANGE
    const icons: TIcon[] = [
      { icon: <SnowSharp />, label: 'Aircon', index: '1', name: 'Aircon' },
      {
        icon: <BluetoothSharp />,
        label: 'Bluetooth',
        index: '2',
        name: 'Bluetooth',
      },
      {
        icon: <CompassSharp />,
        label: 'Navigation',
        index: '3',
        name: 'Navigation',
      },
      { icon: <WifiSharp />, label: 'Sensors', index: '4', name: 'Sensors' },
      {
        icon: <SnowSharp />,
        label: 'I should not show!',
        index: '5',
        name: '',
      },
    ];

    // ACT
    const wrapper = render(
      <CardIcons className="some-custom-class" icons={icons} />,
    );

    // ASSERT
    expect(wrapper.container).toMatchSnapshot();
  });
});
