import React from 'react';
import renderer from 'react-test-renderer';
import ComparatorContainer from '../ComparatorContainer';
import { useVehicleData } from '../gql';

jest.mock('../gql');

describe('<ComparatorContainer />', () => {
  it('should show error correctly', async () => {
    // ARRANGE
    (useVehicleData as jest.Mock).mockReturnValue({
      loading: false,
      data: undefined,
      error: { message: 'Error' },
    });

    const getComponent = () => {
      return renderer.create(<ComparatorContainer />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('should show loading correctly', async () => {
    // ARRANGE
    (useVehicleData as jest.Mock).mockReturnValue({
      loading: true,
      data: undefined,
      error: undefined,
    });

    const getComponent = () => {
      return renderer.create(<ComparatorContainer />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('should show data correctly', async () => {
    // ARRANGE
    (useVehicleData as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        vehicleComparator: [
          {
            capId: 44320,
            vehicleType: 'LCV',
            data: [
              {
                name: 'Load Width',
                value: '1636',
              },
              {
                name: 'Load Height',
                value: '1397',
              },
              {
                name: 'Load Length',
                value: '2512',
              },
              {
                name: 'WLTP Combined (g/km)',
                value: null,
              },
              {
                name: 'Fuel Type',
                value: 'Diesel',
              },
              {
                name: 'Engine Size (cc)',
                value: '1499',
              },
              {
                name: 'Engine Power (BHP)',
                value: '100',
              },
              {
                name: 'Transmission',
                value: 'Manual',
              },
              {
                name: 'No. of Seats',
                value: '3',
              },
            ],
          },
          {
            capId: 42060,
            vehicleType: 'LCV',
            data: [
              {
                name: 'Load Width',
                value: null,
              },
              {
                name: 'Load Height',
                value: '1406',
              },
              {
                name: 'Load Length',
                value: '2554',
              },
              {
                name: 'WLTP Combined (g/km)',
                value: null,
              },
              {
                name: 'Fuel Type',
                value: 'Diesel',
              },
              {
                name: 'Engine Size (cc)',
                value: '1996',
              },
              {
                name: 'Engine Power (BHP)',
                value: '130',
              },
              {
                name: 'Transmission',
                value: 'Manual',
              },
              {
                name: 'No. of Seats',
                value: '3',
              },
            ],
          },
        ],
      },
      error: undefined,
    });

    const getComponent = () => {
      return renderer.create(<ComparatorContainer />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
