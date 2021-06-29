import React from 'react';
import { shallow, mount } from 'enzyme';
import { fireEvent, render, screen } from '@testing-library/react';

import ComparatorBar from '../ComparatorBar';
import ComparatorBarCard from '../ComparatorBarCard';
import vehiclesMock from '../__mocks__/ComparatorBar.mock';

const mockCompareVehicles = jest.fn();
const mockDeleteVehicle = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
  }),
}));
describe('<ComparatorBar />', () => {
  it('renders correctly with default <ComparatorBar />', () => {
    const wrapper = mount(
      <ComparatorBar
        deleteVehicle={() => {}}
        compareVehicles={() => {}}
        vehicles={vehiclesMock}
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
        vehicles={vehiclesMock}
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
        vehicles={vehiclesMock}
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
        vehicle={vehiclesMock[0]}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
