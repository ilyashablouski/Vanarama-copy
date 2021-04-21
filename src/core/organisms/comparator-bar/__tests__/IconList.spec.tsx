import React from 'react';
import { shallow, mount } from 'enzyme';
import { fireEvent, render, screen } from '@testing-library/react';

import ComparatorBar from '../ComparatorBar';
import ComparatorBarCard from '../ComparatorBarCard';

const vehicles = [
  {
    capId: '1234',
    derivativeName: '1.0 ECOBOOST 125 ST-LINE NAV 5 DOORS',
    manufacturerName: 'Ford',
    rangeName: 'Focus',
  },
  {
    capId: '12345',
    derivativeName: '2.5 ECOBOOST PHEV ST-LINE 5 DOORS CVT',
    manufacturerName: 'Ford',
    rangeName: 'Kuga',
  },
];

const mockCompareVehicles = jest.fn();
const mockDeleteVehicle = jest.fn();

describe('<ComparatorBar />', () => {
  it('renders correctly with default <ComparatorBar />', () => {
    const wrapper = mount(
      <ComparatorBar
        deleteVehicle={() => {}}
        compareVehicles={() => {}}
        vehicles={vehicles}
        setCompareVehicles={() => {}}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('button compare vehicles correctly with default <ComparatorBar />', () => {
    render(
      <ComparatorBar
        deleteVehicle={() => {}}
        compareVehicles={() => {
          mockCompareVehicles();
        }}
        vehicles={vehicles}
        setCompareVehicles={() => {}}
      />,
    );

    fireEvent.click(screen.getByText('Compare Vehicles'));
    expect(mockCompareVehicles).toHaveBeenCalledTimes(1);
  });

  it('button delete vehicle correctly with default <ComparatorBar />', () => {
    render(
      <ComparatorBar
        deleteVehicle={() => {
          mockDeleteVehicle();
        }}
        compareVehicles={() => {
          mockCompareVehicles();
        }}
        vehicles={vehicles}
        setCompareVehicles={() => {}}
      />,
    );

    fireEvent.click(screen.getByTestId('comparatorBar-delete-1'));
    expect(mockDeleteVehicle).toHaveBeenCalledTimes(1);
  });
});

describe('<ComparatorBarCard />', () => {
  it('renders correctly with ComparatorBarCard', () => {
    const wrapper = shallow(
      <ComparatorBarCard
        number={0}
        deleteVehicle={() => {}}
        vehicle={vehicles[0]}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
