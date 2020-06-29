import React from 'react';
import renderer from 'react-test-renderer';
import { useCarData } from '../../../gql/carpage';
import VanDetailsPage from '../../../pages/vans/van-details';

jest.mock('../../../gql/carpage');
jest.mock('next/router', () => ({
  useRouter: () => ({
    query: {
      capId: '44444',
    },
  }),
}));

describe('<VanDetailsPage />', () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
      matchMedia: jest.fn(),
    })),
  });
  it('renders correctly with data', async () => {
    (useCarData as jest.Mock).mockReturnValue({
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
      return renderer.create(<VanDetailsPage />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with error', async () => {
    (useCarData as jest.Mock).mockReturnValue({
      loading: false,
      data: undefined,
      error: { message: 'Error' },
    });

    const getComponent = () => {
      return renderer.create(<VanDetailsPage />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with loading', async () => {
    (useCarData as jest.Mock).mockReturnValue({
      loading: true,
      data: undefined,
      error: undefined,
    });

    const getComponent = () => {
      return renderer.create(<VanDetailsPage />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
