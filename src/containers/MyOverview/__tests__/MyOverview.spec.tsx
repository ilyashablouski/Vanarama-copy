import React from 'react';
import preloadAll from 'jest-next-dynamic';
import renderer from 'react-test-renderer';
import { useApolloClient } from '@apollo/client';
import MyOverview from '../MyOverview';
import {
  useMyOrdersData,
  useCarDerivativesData,
} from '../../OrdersInformation/gql';
import { useStoredPersonQuery } from '../../../gql/storedPerson';
import { LeaseTypeEnum } from '../../../../generated/globalTypes';
import { useSaveOrderMutation } from '../../../gql/storedOrder';
import { useSavePersonUuidMutation } from '../../../gql/storedPersonUuid';
import { GetMyOrders } from '../../../../generated/GetMyOrders';

jest.mock('../../OrdersInformation/gql');
jest.mock('../../../gql/storedPerson');
jest.mock('@apollo/client');
jest.mock('../../../hooks/useImperativeQuery');
jest.mock('../../../gql/storedOrder');
jest.mock('../../../gql/storedPersonUuid');

const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: '/my-overview',
      query: {
        partyByUuid: 'partyByUuid',
        push: mockPush,
      },
    };
  },
}));

const mockOrdersValue = {
  myOrders: [
    {
      uuid: '1',
      leaseType: LeaseTypeEnum.PERSONAL,
      createdAt: '2020-06-16T07:40:49.880Z',
      lineItems: [
        {
          vehicleProduct: {
            derivativeCapId: 'derivativeCapId',
            description: 'description',
            depositPayment: 100,
            monthlyPayment: 100,
            term: 36,
            annualMileage: 100,
            depositMonths: 100,
            funderId: 'test funder',
            funderData: {},
            colour: 'colour',
            trim: 'trim',
            maintenance: false,
          },
        },
      ],
    },
    {
      uuid: '2',
      leaseType: LeaseTypeEnum.BUSINESS,
      createdAt: '2020-06-16T07:40:40.000Z',
      lineItems: [
        {
          vehicleProduct: {
            derivativeCapId: 'derivativeCapId1',
            description: 'description1',
            depositPayment: 100,
            monthlyPayment: 100,
            term: 36,
            annualMileage: 100,
            depositMonths: 100,
            funderId: 'test funder1',
            funderData: {},
            colour: 'colour',
            trim: 'trim',
            maintenance: false,
          },
        },
      ],
    },
  ],
};

const mockPersonsValue = {
  uuid: 'uuid',
  firstName: 'firstName',
  lastName: 'lastName',
  partyUuid: 'partyUuid',
  emailAddresses: [
    {
      value: 'value',
      partyId: 'partyId',
    },
  ],
};

const mockCarValue = [
  jest.fn(),
  {
    loading: false,
    data: {
      derivatives: [
        {
          id: 'derivativeCapId',
          manufacturer: {
            name: 'manufacturer',
            slug: 'manufacturer',
          },
          model: { name: 'modelName', slug: 'modelName' },
          name: 'name',
          fuelType: { name: 'fuelTypeName' },
          transmission: { name: 'transmissionName' },
        },
        {
          id: 'derivativeCapId1',
          manufacturer: {
            name: 'manufacturer1',
            slug: 'manufacturer1',
          },
          model: { name: 'modelName1', slug: 'modelName1' },
          name: 'name1',
          fuelType: { name: 'fuelTypeName1' },
          transmission: { name: 'transmissionName1' },
        },
      ],
    },
    error: undefined,
  },
];

describe('<MyOverview />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  (useSaveOrderMutation as jest.Mock).mockReturnValue([]);
  (useSavePersonUuidMutation as jest.Mock).mockReturnValue([]);
  (useApolloClient as jest.Mock).mockReturnValue({
    onResetStore: jest.fn(),
  });

  it('renders quotes correctly with data', async () => {
    (useMyOrdersData as jest.Mock).mockReturnValue([
      () => {},
      { loading: false },
    ]);
    (useCarDerivativesData as jest.Mock).mockReturnValue(mockCarValue);

    const getComponent = () => {
      return renderer
        .create(
          <MyOverview
            quote
            person={mockPersonsValue}
            partyUuid={['partyUuid', 'partyUuid']}
            data={mockOrdersValue as GetMyOrders}
          />,
        )
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders orders correctly with data', async () => {
    (useMyOrdersData as jest.Mock).mockReturnValue([
      () => {},
      { loading: false },
    ]);
    (useCarDerivativesData as jest.Mock).mockReturnValue(mockCarValue);
    (useApolloClient as jest.Mock).mockReturnValue({
      onResetStore: jest.fn(),
    });

    const getComponent = () => {
      return renderer
        .create(
          <MyOverview
            quote={false}
            person={mockPersonsValue}
            partyUuid={['partyUuid', 'partyUuid']}
            data={mockOrdersValue as GetMyOrders}
          />,
        )
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with loading', async () => {
    (useStoredPersonQuery as jest.Mock).mockReturnValue(mockPersonsValue);
    (useMyOrdersData as jest.Mock).mockReturnValue([
      () => {},
      {
        loading: true,
      },
    ]);
    (useApolloClient as jest.Mock).mockReturnValue({
      onResetStore: jest.fn(),
    });

    const getComponent = () => {
      return renderer
        .create(
          <MyOverview
            quote
            person={mockPersonsValue}
            partyUuid={['partyUuid', 'partyUuid']}
            data={mockOrdersValue as GetMyOrders}
          />,
        )
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when there are no orders', async () => {
    (useStoredPersonQuery as jest.Mock).mockReturnValue(mockPersonsValue);
    (useMyOrdersData as jest.Mock).mockReturnValue([
      () => {},
      {
        loading: false,
      },
    ]);
    (useApolloClient as jest.Mock).mockReturnValue({
      onResetStore: jest.fn(),
    });

    const getComponent = () => {
      return renderer
        .create(
          <MyOverview
            quote={false}
            person={mockPersonsValue}
            partyUuid={['partyUuid', 'partyUuid']}
            data={{ myOrders: [] } as GetMyOrders}
          />,
        )
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
