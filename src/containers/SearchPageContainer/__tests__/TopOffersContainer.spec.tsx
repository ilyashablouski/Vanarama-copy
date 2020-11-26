import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedResponse, MockedProvider } from '@apollo/client/testing';
import TopOffersContainer from '../TopOffersContainer';
import { GET_VEHICLE_LIST } from '../gql';
import { VehicleTypeEnum, SortField } from '../../../../generated/globalTypes';
import { GET_PRODUCT_CARDS_DATA } from '../../CustomerAlsoViewedContainer/gql';

const mockData = {
  loading: false,
  data: {
    productCard: [
      {
        vehicleType: VehicleTypeEnum.CAR,
        capId: '83615',
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
        id: '83615',
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
  },
};

const mocksResponse: MockedResponse[] = [
  {
    request: {
      query: GET_VEHICLE_LIST,
      variables: {
        bodyStyles: [],
        first: 3,
        onOffer: true,
        sortField: SortField.offerRanking,
        vehicleTypes: [VehicleTypeEnum.CAR],
      },
    },
    result: {
      data: {
        vehicleList: {
          totalCount: 3,
          pageInfo: {
            startCursor: 'MQ',
            endCursor: 'Ng',
            hasNextPage: true,
            hasPreviousPage: false,
          },
          edges: [
            {
              cursor: 'NA',
              node: {
                vehicleType: 'CAR',
                offerRanking: 25,
                onOffer: true,
                derivativeId: '68051',
                capCode: 'BM4S20MP15HDTA      ',
                manufacturerName: 'BMW',
                modelName: '4 Series Gran Coupe',
                derivativeName:
                  '420d [190] M Sport 5 Doors Auto [Professional Media]',
                bodyStyle: 'Hatchback',
                transmission: 'Automatic',
                fuelType: 'Diesel',
                financeProfiles: [
                  {
                    leaseType: 'PERSONAL',
                    rate: 312.94,
                    term: 60,
                    upfront: 9,
                    upfrontPayment: 2816.46,
                    mileage: 6000,
                    maintained: false,
                  },
                ],
              },
            },
            {
              cursor: 'NQ',
              node: {
                vehicleType: 'CAR',
                offerRanking: 32,
                onOffer: true,
                derivativeId: '68051',
                capCode: 'BM2S15MPN2CPTA  1   ',
                manufacturerName: 'BMW',
                modelName: '2 Series Coupe',
                derivativeName: '218i M Sport 2 Doors [Nav] Step Auto',
                bodyStyle: 'Coupe',
                transmission: 'Automatic',
                fuelType: 'Petrol',
                financeProfiles: [
                  {
                    leaseType: 'PERSONAL',
                    rate: 291.99,
                    term: 60,
                    upfront: 9,
                    upfrontPayment: 2627.91,
                    mileage: 6000,
                    maintained: false,
                  },
                  {
                    leaseType: 'BUSINESS',
                    rate: 243.92,
                    term: 60,
                    upfront: 9,
                    upfrontPayment: 2195.28,
                    mileage: 6000,
                    maintained: false,
                  },
                ],
              },
            },
            {
              cursor: 'Ng',
              node: {
                vehicleType: 'CAR',
                offerRanking: 38,
                onOffer: true,
                derivativeId: '68051',
                capCode: 'BM2S15MPN2VPTA  1   ',
                manufacturerName: 'BMW',
                modelName: '2 Series Convertible',
                derivativeName: '218i M Sport 2 Doors [Nav] Step Auto',
                bodyStyle: 'Convertible',
                transmission: 'Automatic',
                fuelType: 'Petrol',
                financeProfiles: [
                  {
                    leaseType: 'PERSONAL',
                    rate: 323.92,
                    term: 48,
                    upfront: 9,
                    upfrontPayment: 2915.28,
                    mileage: 6000,
                    maintained: false,
                  },
                  {
                    leaseType: 'BUSINESS',
                    rate: 269.92,
                    term: 48,
                    upfront: 9,
                    upfrontPayment: 2429.28,
                    mileage: 6000,
                    maintained: false,
                  },
                ],
              },
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: GET_PRODUCT_CARDS_DATA,
      variables: {
        capIds: ['68051'],
        vehicleType: VehicleTypeEnum.CAR,
      },
    },
    result: () => {
      return {
        data: {
          productCard: {
            vehicleType: VehicleTypeEnum.CAR,
            capId: '68051',
            manufacturerName: 'manufacturerName',
            rangeName: 'rangeName',
            derivativeName: 'derivativeName',
            averageRating: 4.5,
            isOnOffer: false,
            offerPosition: 5,
            leadTime: '',
            imageUrl: '',
            keyInformation: [{ name: 'Transmission', value: 'Manual' }],
            businessRate: 55,
            personalRate: 55,
          },
          derivatives: mockData.data.derivatives,
        },
        refetch: jest.fn(),
      };
    },
  },
];

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: { rangeName: '3 series', make: 'BMW' },
  }),
}));
describe('<TopOffersContainer />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  const resetMocks = () => {
    return {
      isPersonal: true,
      isCarSearch: true,
      isMakePage: false,
      isSpecialOfferPage: true,
      isPickups: false,
      isRangePage: false,
      isBodyPage: false,
      isBudgetPage: false,
      isTransmissionPage: false,
      isFuelPage: false,
      isDynamicFilterPage: false,
      viewModel: jest.fn(),
      manualBodyStyle: ['test'],
    };
  };

  const mocks = resetMocks();

  afterEach(() => {
    jest.clearAllMocks();
  });
  // TODO: should be investigate why Mock Provider can't resolve mocked queries
  it.skip('should be render correctly Top Offers for special offer Page', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider mocks={mocksResponse} addTypename={false}>
        <TopOffersContainer {...mocks} />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Top Offers')).toBeInTheDocument();
    });
    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
