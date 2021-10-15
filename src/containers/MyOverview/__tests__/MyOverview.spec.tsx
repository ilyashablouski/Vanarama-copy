import React from 'react';
import preloadAll from 'jest-next-dynamic';
import renderer from 'react-test-renderer';
import MyOverview from '../MyOverview';
import {
  useMyOrdersData,
  useCarDerivativesData,
} from '../../OrdersInformation/gql';
import { useStoredPersonQuery } from '../../../gql/storedPerson';
import { LeaseTypeEnum } from '../../../../generated/globalTypes';
import { useSaveOrderMutation } from '../../../gql/storedOrder';

jest.mock('../../OrdersInformation/gql');
jest.mock('../../../gql/storedPerson');
jest.mock('@apollo/client');
jest.mock('../../../hooks/useImperativeQuery');
jest.mock('../../../gql/storedOrder');

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

const mockOrdersValue = [
  jest.fn(),
  {
    loading: false,
    data: {
      myOrders: [
        {
          id: 'id',
          leaseType: LeaseTypeEnum.PERSONAL,
          createdAt: new Date(1592293249880),
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
                funderData: 'test funder',
                colour: 'colour',
                trim: 'trim',
                maintenance: false,
              },
            },
          ],
        },
        {
          id: 'id1',
          leaseType: LeaseTypeEnum.BUSINESS,
          createdAt: new Date(1592293240000),
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
                funderData: 'test funder1',
                colour: 'colour',
                trim: 'trim',
                maintenance: false,
              },
            },
          ],
        },
      ],
    },
    error: undefined,
  },
];

const mockPersonsValue = [
  jest.fn(),
  {
    loading: false,
    data: {
      storedPerson: {
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
      },
    },
    error: undefined,
  },
];

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

  it('renders quotes correctly with data', async () => {
    (useMyOrdersData as jest.Mock).mockReturnValue(mockOrdersValue);
    (useStoredPersonQuery as jest.Mock).mockReturnValue(mockPersonsValue);
    (useCarDerivativesData as jest.Mock).mockReturnValue(mockCarValue);

    const getComponent = () => {
      return renderer.create(<MyOverview quote />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders orders correctly with data', async () => {
    (useMyOrdersData as jest.Mock).mockReturnValue(mockOrdersValue);
    (useStoredPersonQuery as jest.Mock).mockReturnValue(mockPersonsValue);
    (useCarDerivativesData as jest.Mock).mockReturnValue(mockCarValue);

    const getComponent = () => {
      return renderer.create(<MyOverview quote={false} />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with error', async () => {
    (useStoredPersonQuery as jest.Mock).mockReturnValue(mockPersonsValue);
    (useMyOrdersData as jest.Mock).mockReturnValue([
      jest.fn(),
      {
        loading: false,
        data: undefined,
        error: { message: 'Error' },
      },
    ]);

    const getComponent = () => {
      return renderer.create(<MyOverview quote />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with loading', async () => {
    (useStoredPersonQuery as jest.Mock).mockReturnValue(mockPersonsValue);
    (useMyOrdersData as jest.Mock).mockReturnValue([
      jest.fn(),
      {
        loading: true,
        data: undefined,
        error: undefined,
      },
    ]);

    const getComponent = () => {
      return renderer.create(<MyOverview quote />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
