import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedResponse, MockedProvider } from '@apollo/client/testing';
import TopOffersContainer from '../sections/TopOffersContainer';
import { GET_VEHICLE_LIST } from '../gql';
import {
  VehicleTypeEnum,
  SortField,
  SortDirection,
  LeaseTypeEnum,
} from '../../../../generated/globalTypes';
import { GET_PRODUCT_CARDS_DATA } from '../../CustomerAlsoViewedContainer/gql';
import { GetProductCard_productCard as IProductCard } from '../../../../generated/GetProductCard';
import { SearchPageTypes } from '../interfaces';

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
        sort: [{ field: SortField.offerRanking, direction: SortDirection.ASC }],
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
      pageType: SearchPageTypes.SPECIAL_OFFER_PAGE,
      isPickups: false,
      isDynamicFilterPage: false,
      viewModel: jest.fn(),
      manualBodyStyle: ['test'],
      shouldForceUpdate: false,
      setShouldForceUpdate: jest.fn(),
      dataUiTestId: 'top-offers',
      preLoadProductCardsData: {
        productCard: [
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
            keyInformation: [{ name: 'name', value: 'Manual' }],
            businessRate: 55,
            personalRate: 55,
          },
        ] as IProductCard[],
        vehicleList: { edges: [] },
        derivatives: [
          {
            id: '39359',
            capCode: 'CIDI20242EVDTM2 4  L',
            name: '1400 2.0 BlueHDi 120 Van Enterprise',
            slug: '1400-20-bluehdi-120-van-enterprise',
            manufacturer: {
              name: 'Citroen',
              slug: 'citroen',
            },
            model: {
              name: 'Dispatch M',
              slug: 'dispatch-m',
            },
            fuelType: {
              name: 'Diesel',
            },
            transmission: {
              name: 'Manual',
            },
            bodyStyle: null,
            range: {
              name: 'Dispatch',
              slug: 'dispatch',
            },
          },
        ],
      },
      preLoadVehiclesList: {
        vehicleList: {
          totalCount: 1,
          pageInfo: {
            startCursor: 'MQ',
            endCursor: 'NA',
            hasNextPage: false,
            hasPreviousPage: false,
          },
          edges: [
            {
              cursor: 'MQ',
              node: {
                url:
                  'van-leasing/citroen/berlingo/m-15-bluehdi-650kg-enterprise-75ps-2018',
                legacyUrl: null,
                vehicleType: VehicleTypeEnum.LCV,
                offerRanking: 1,
                onOffer: true,
                derivativeId: '44514',
                capCode: 'CIBE156E71VDTM2 4  L',
                manufacturerName: 'Citroen',
                modelName: 'Berlingo M',
                derivativeName: '1.5 BlueHDi 650Kg Enterprise 75ps',
                bodyStyle: 'Small Van',
                transmission: 'Manual',
                fuelType: 'Diesel',
                financeProfiles: [
                  {
                    leaseType: LeaseTypeEnum.BUSINESS,
                    rate: 133.97,
                    term: 24,
                    upfront: 12,
                    upfrontPayment: 1607.64,
                    mileage: 6000,
                    maintained: false,
                  },
                ],
              },
            },
          ],
        },
      },
    };
  };

  const mocks = resetMocks();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be render correctly Top Offers for special offer Page', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider mocks={mocksResponse} addTypename={false}>
        <TopOffersContainer {...mocks} />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Hot Offers/)).toBeInTheDocument();
    });

    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
