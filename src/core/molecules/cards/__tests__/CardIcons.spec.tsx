import React from 'react';
import { shallow } from 'enzyme';
import CardIcons, { TIcon } from '../CardIcons';
import BluetoothSharp from '../../../assets/icons/BluetoothSharp';
import CompassSharp from '../../../assets/icons/CompassSharp';
import SnowSharp from '../../../assets/icons/SnowSharp';
import WifiSharp from '../../../assets/icons/WifiSharp';

describe('<CardIcons />', () => {
  it('should render correctly', () => {
    // ARRANGE
    const icons: TIcon[] = [
      { icon: <SnowSharp />, label: 'Aircon', index: '1' },
      { icon: <BluetoothSharp />, label: 'Bluetooth', index: '2' },
      { icon: <CompassSharp />, label: 'Navigation', index: '3' },
      { icon: <WifiSharp />, label: 'Sensors', index: '4' },
    ];

    // ACT
    const wrapper = shallow(
      <CardIcons className="some-custom-class" icons={icons} />,
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });

  it('should render no more than 4 icons', () => {
    // ARRANGE
    const icons: TIcon[] = [
      { icon: <SnowSharp />, label: 'Aircon', index: '1' },
      { icon: <BluetoothSharp />, label: 'Bluetooth', index: '2' },
      { icon: <CompassSharp />, label: 'Navigation', index: '3' },
      { icon: <WifiSharp />, label: 'Sensors', index: '4' },
      { icon: <SnowSharp />, label: 'I should not show!', index: '5' },
    ];

    // ACT
    const wrapper = shallow(
      <CardIcons className="some-custom-class" icons={icons} />,
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });
});
