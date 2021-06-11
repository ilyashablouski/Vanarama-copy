import React from 'react';
import { shallow, mount } from 'enzyme';
import { fireEvent, render, screen } from '@testing-library/react';

import ComparatorBar from '../ComparatorBar';
import ComparatorBarCard from '../ComparatorBarCard';
import { IVehicle as IVehicleState } from '../../../../utils/comparatorHelpers';

// eslint-disable-next-line import/prefer-default-export
export const vehicles = [
  {
    pageUrl: {
      url:
        'vauxhall-car-leasing/corsa/hatchback/1-2-turbo-sri-premium-5dr-164069.html',
      href:
        'vauxhall-car-leasing/corsa/hatchback/1-2-turbo-sri-premium-5dr-164069.html',
      capId: '1234',
    },
    bodyStyle: 'Hatchback',
    capId: '1234',
    manufacturerName: 'Ford',
    derivativeName: '1.0 ECOBOOST 125 ST-LINE NAV 5 DOORS',
    rangeName: 'Focus',
    modelName: 'Corsa Hatchback',
    imageUrl:
      'https://images.autorama.co.uk/Photos/Cap/Vehicles/164069/cap-90660-164069.jpg',
    leadTime: '14-21 Day Delivery',
    averageRating: 4.6,
    businessRate: 132.95,
    personalRate: 159.95,
    offerPosition: 2,
    isOnOffer: true,
    keyInformation: [],
    vehicleType: 'CAR',
  },
  {
    pageUrl: {
      url:
        'vauxhall-car-leasing/corsa/hatchback/1-2-turbo-sri-premium-5dr-164069.html',
      href:
        'vauxhall-car-leasing/corsa/hatchback/1-2-turbo-sri-premium-5dr-164069.html',
      capId: '12345',
    },
    bodyStyle: 'Hatchback',
    isOnOffer: true,
    capId: '12345',
    manufacturerName: 'Ford',
    derivativeName: '2.5 ECOBOOST PHEV ST-LINE 5 DOORS CVT',
    rangeName: 'Kuga',
    modelName: 'Corsa Hatchback',
    imageUrl:
      'https://images.autorama.co.uk/Photos/Cap/Vehicles/164069/cap-90660-164069.jpg',
    leadTime: '14-21 Day Delivery',
    averageRating: 4.6,
    businessRate: 132.95,
    personalRate: 159.95,
    offerPosition: 2,
    keyInformation: [],
    vehicleType: 'CAR',
  },
] as IVehicleState[];

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
