import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { ApolloProvider } from '@apollo/client';
import CustomiseLeaseContainer from '../CustomiseLeaseContainer';
import { useQuoteDataLazyQuery } from '../gql';
import { IProps } from '../interfaces';
import {
  VehicleTypeEnum,
  LeaseTypeEnum,
} from '../../../../generated/globalTypes';
import { useOpportunityCreation } from '../../GoldrushFormContainer/gql';
import { GetQuoteDetails } from '../../../../generated/GetQuoteDetails';
import createApolloClient from '../../../apolloClient';

jest.mock('../gql');
jest.mock('../../GoldrushFormContainer/gql');

const client = createApolloClient({});

const getComponent = (props: IProps) => {
  return renderer
    .create(
      <ApolloProvider client={client}>
        <CustomiseLeaseContainer {...props} />
      </ApolloProvider>,
    )
    .toJSON();
};

const data = {
  quoteByCapId: {
    colour: '13990',
    leadTime: '14-21 Day Delivery',
    leaseType: LeaseTypeEnum.PERSONAL,
    mileage: 12000,
    leaseCost: {
      monthlyRental: 123,
      initialRental: 2339.64,
      excessMileage: 0,
    },
    processingFee: 0,
    stock: 'Brand New - ',
    term: 24,
    trim: '112981',
    upfront: 1,
    vehicleType: VehicleTypeEnum.CAR,
    funderId: 8,
    stockBatchId: 5411,
    nextBestPrice: {
      maintained: 315.67,
      nonMaintained: 243.67,
    },
    maintenanceCost: {
      excessMileage: 3.76,
      initialRental: 287.65,
      monthlyRental: 45.87,
    },
    freeInsurance: true,
  },
} as GetQuoteDetails;
const props = {
  capId: 84429,
  colourData: [
    {
      leadTime: '14-21 Day Delivery',
      options: [
        {
          hex: null,
          label: 'Solid - Polar white',
          optionId: 13990,
          hotOffer: false,
        },
      ],
    },
  ],
  trimData: [
    {
      leadTime: '14-21 Day Delivery',
      options: [
        {
          label: 'Leather - Cranberry red',
          optionId: 104562,
          hotOffer: false,
        },
      ],
    },
  ],
  vehicleType: VehicleTypeEnum.CAR,
  onCompletedCallBack: jest.fn(),
  setLeadTime: jest.fn(),
  isPlayingLeaseAnimation: false,
  setIsPlayingLeaseAnimation: jest.fn(),
  dataUiTestId: 'customise-lease',
  leaseAdjustParams: {
    mileages: [6000, 8000, 10000, 12000, 15000, 20000, 25000, 30000],
    terms: [24, 36, 48, 60],
    upfronts: [1, 3, 6, 9, 12],
  },
  derivativeInfo: {
    name: '',
    manufacturer: {
      name: '',
      slug: '',
    },
    model: {
      name: '',
      slug: '',
    },
    range: {
      name: '',
      slug: '',
    },
    transmission: {
      name: 'Manual',
    },
    bodyStyle: {
      name: 'Hatchback',
    },
    bodyType: {
      name: 'Hatchback',
      slug: 'hatchback',
    },
    fuelType: {
      name: 'Diesel',
    },
    colours: [{ id: '13990', optionDescription: 'Solid - Polar white' }],
    technicals: [
      {
        categoryDescription: 'Weight and Capacities',
        derivativeId: '84429',
        effectiveFrom: '2019-07-01T00:00:00.000Z',
        effectiveTo: null,
        id: '3',
        technicalDescription: 'Minimum Kerbweight',
        technicalLongDescription: 'Minimum Kerbweight',
        value: '1515',
        unit: 'kg',
      },
    ],
    trims: [{ id: '104562', optionDescription: 'Leather - Cranberry red' }],
  },
  leaseType: LeaseTypeEnum.BUSINESS,
  setLeaseType: jest.fn(),
  onCompleted: jest.fn(),
  mileage: 6000,
  setMileage: jest.fn(),
  colour: 1234,
  setColour: jest.fn(),
  isColourAndTrimOverlay: true,
  toggleColorAndTrimModalVisible: () => {},
};

describe('<CustomiseLeaseContainer />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  (useOpportunityCreation as jest.Mock).mockReturnValue([
    () => {},
    { loading: false },
  ]);

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  it('should have some elements', async () => {
    (useQuoteDataLazyQuery as jest.Mock).mockReturnValue([
      () => {},
      {
        loading: false,
        data,
      },
    ]);

    render(
      <ApolloProvider client={client}>
        <CustomiseLeaseContainer {...props} quote={data} />
      </ApolloProvider>,
    );

    expect(screen.getByText('12000 Miles'));

    expect(screen.getByText('24 Months - 2 Years'));

    fireEvent.click(
      screen.getByRole('radio', {
        name: /Business/i,
      }),
    );

    await waitFor(() => {
      expect(screen.getByText('12000 Miles'));
    });

    await waitFor(() => {
      expect(screen.getByText('24 Months - 2 Years'));
    });

    await waitFor(() => {
      expect(screen.getByText('PM exc. VAT'));
    });

    fireEvent.click(screen.getByText('Request a Call Back'));

    await waitFor(() => {
      expect(screen.getByText('Please Fill In Your Details'));
    });
  });

  it('should render correctly', async () => {
    (useQuoteDataLazyQuery as jest.Mock).mockReturnValue([
      () => {},
      {
        loading: false,
        data,
      },
    ]);

    const tree = getComponent({ ...props, quote: data });
    expect(tree).toMatchSnapshot();
  });

  it('should render loading', async () => {
    (useQuoteDataLazyQuery as jest.Mock).mockReturnValue([
      () => {},
      {
        loading: false,
        data: undefined,
      },
    ]);

    const tree = getComponent({ ...props });
    expect(tree).toMatchSnapshot();
  });
});
