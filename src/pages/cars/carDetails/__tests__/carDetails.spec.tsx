import React from 'react';
import renderer from 'react-test-renderer';
import { ParsedUrlQuery } from 'querystring';
import { useCarData } from '../gql';
import CarDetailsPage from '..';

interface IProps {
  query: ParsedUrlQuery;
}

jest.mock('../gql');

describe('<CarDetailsPage />', () => {
  it('renders correctly with data', async () => {
    useCarData.mockReturnValue({
      loading: false,
      data: {
        vehicleConfigurationByCapId: {
          capDerivativeDescription: 'C200 Amg Line Premium 2 Doors 9g-Tronic',
          capManufacturerDescription: 'Mercedes-Benz',
          capModelDescription: 'C Class Coupe',
          capPaintDescription: 'Solid - Polar white',
          capTrimDescription:
            'Artico man-made leather/Microfibre Dinamica - Black',
          offerRanking: 91,
          onOffer: true,
          uuid: '2c0690a0-3da6-4490-b378-cc381029c6cb',
        },
        vehicleDetails: {
          averageRating: 4.7,
          brochureUrl: null,
          __typename: 'VehicleDetails',
        },
      },
      error: undefined,
    });

    const getComponent = () => {
      return renderer.create(<CarDetailsPage />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with data', async () => {
    useCarData.mockReturnValue({
      loading: false,
      data: undefined,
      error: { message: 'Error' },
    });

    const getComponent = () => {
      return renderer.create(<CarDetailsPage />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with data', async () => {
    useCarData.mockReturnValue({
      loading: true,
      data: undefined,
      error: undefined,
    });

    const getComponent = () => {
      return renderer.create(<CarDetailsPage />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
