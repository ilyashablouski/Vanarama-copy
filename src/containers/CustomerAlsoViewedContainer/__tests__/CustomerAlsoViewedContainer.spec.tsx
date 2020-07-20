import React from 'react';
import renderer from 'react-test-renderer';
import CustomerAlsoViewedContainer from '../CustomerAlsoViewedContainer';
import { useProductCardData } from '../gql';

jest.mock('../gql');

const mockData = {
  loading: false,
  data: {
    productCard: [
      {
        vehicleType: 'CAR',
        capId: 'capId1',
        manufacturerName: 'manufacturerName',
        rangeName: 'rangeName',
        derivativeName: 'derivativeName',
        averageRating: 4.5,
        isOnOffer: false,
        offerPosition: 5,
        leadTime: '',
        imageUrl: '',
        keyInformation: [],
        businessRate: 55,
        personalRate: 55,
      },
      {
        vehicleType: 'CAR',
        capId: 'capId2',
        manufacturerName: 'manufacturerName',
        rangeName: 'rangeName',
        derivativeName: 'derivativeName',
        averageRating: 4.5,
        isOnOffer: false,
        offerPosition: 5,
        leadTime: '',
        imageUrl: '',
        keyInformation: [{ name: 'name' }],
        businessRate: 55,
        personalRate: 55,
      },
      {
        vehicleType: 'CAR',
        capId: 'capId3',
        manufacturerName: 'manufacturerName',
        rangeName: 'rangeName',
        derivativeName: 'derivativeName',
        averageRating: 4.5,
        isOnOffer: false,
        offerPosition: 5,
        leadTime: '',
        imageUrl: '',
        keyInformation: [{ name: 'name' }],
        businessRate: 55,
        personalRate: 55,
      },
      {
        vehicleType: 'CAR',
        capId: 'capId4',
        manufacturerName: 'manufacturerName',
        rangeName: 'rangeName',
        derivativeName: 'derivativeName',
        averageRating: 4.5,
        isOnOffer: false,
        offerPosition: 5,
        leadTime: '',
        imageUrl: '',
        keyInformation: [{ name: 'name' }],
        businessRate: 55,
        personalRate: 55,
      },
    ],
  },
  error: undefined,
};

jest.mock('@vanarama/uibook/lib/components/organisms/carousel', () => ({
  __esModule: true,
  default: ({ children }: any) => (
    <div className="mocked-carousel">{children}</div>
  ),
}));

describe('<CustomerAlsoViewedContainer />', () => {
  it('renders correctly with loading', () => {
    (useProductCardData as jest.Mock).mockReturnValue({
      loading: true,
      data: undefined,
      error: undefined,
    });

    const getComponent = () => {
      return renderer
        .create(
          <CustomerAlsoViewedContainer capsId={['']} leaseType="PERSONAL" />,
        )
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with error', () => {
    (useProductCardData as jest.Mock).mockReturnValue({
      loading: false,
      data: undefined,
      error: { message: 'message' },
    });

    const getComponent = () => {
      return renderer
        .create(
          <CustomerAlsoViewedContainer capsId={['']} leaseType="PERSONAL" />,
        )
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with empty data', () => {
    (useProductCardData as jest.Mock).mockReturnValue({
      loading: false,
      data: { productCards: [] },
      error: undefined,
    });

    const getComponent = () => {
      return renderer
        .create(
          <CustomerAlsoViewedContainer capsId={['']} leaseType="PERSONAL" />,
        )
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with data', () => {
    (useProductCardData as jest.Mock).mockReturnValue(mockData);

    const getComponent = () => {
      return renderer
        .create(
          <CustomerAlsoViewedContainer capsId={['']} leaseType="PERSONAL" />,
        )
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
