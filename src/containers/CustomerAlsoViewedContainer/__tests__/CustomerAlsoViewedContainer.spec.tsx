import React from 'react';
import renderer from 'react-test-renderer';
import CustomerAlsoViewedContainer from '../CustomerAlsoViewedContainer';
import { useProductCardData } from '../gql';
import { VehicleTypeEnum } from '../../../../generated/globalTypes';

jest.mock('../gql');

const mockData = {
  loading: false,
  data: {
    productCard: [
      {
        vehicleType: VehicleTypeEnum.CAR,
        capId: '44112',
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
        vehicleType: VehicleTypeEnum.CAR,
        capId: '44514',
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
    derivatives: [
      {
        id: '44514',
        manufacturerName: 'Ford',
        derivativeName: '1.0 EcoBoost 125 ST-Line Nav 5dr',
        rangeName: 'Focus',
        bodyStyleName: 'Hatchback',
        slug: '10-ecoBoost-125-st-line-nav-5dr',
        capCode: 'capCode',
        name: 'name',
        modelName: 'modelName',
        manufacturer: {
          name: 'name',
        },
        model: {
          name: 'name',
        },
        fuelType: {
          name: 'name',
        },
        fuelTypeName: 'fuelTypeName',
        transmission: {
          name: 'name',
        },
        transmissionName: 'transmissionName',
        bodyStyle: {
          name: 'name',
        },
        range: {
          name: 'name',
        },
        __typename: 'derivative',
      },
      {
        id: '44112',
        manufacturerName: 'Ford',
        derivativeName: '1.0 EcoBoost 125 ST-Line Nav 5dr',
        rangeName: 'Focus',
        bodyStyleName: 'Hatchback',
        slug: '10-ecoBoost-125-st-line-nav-5dr',
        capCode: 'capCode',
        name: 'name',
        modelName: 'modelName',
        manufacturer: {
          name: 'name',
        },
        model: {
          name: 'name',
        },
        fuelType: {
          name: 'name',
        },
        fuelTypeName: 'fuelTypeName',
        transmission: {
          name: 'name',
        },
        transmissionName: 'transmissionName',
        bodyStyle: {
          name: 'name',
        },
        range: {
          name: 'name',
        },
        __typename: 'derivative',
      },
    ],
    vehicleImages: null,
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

  // TODO: return to test when will don't have a problem in jenkins, because on local env. test is passed
  xit('renders correctly with data', () => {
    (useProductCardData as jest.Mock).mockReturnValue(mockData);

    const getComponent = () => {
      return renderer
        .create(
          <CustomerAlsoViewedContainer
            capsId={['44514']}
            leaseType="PERSONAL"
            vehicleType={VehicleTypeEnum.CAR}
          />,
        )
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
