import React from 'react';
import renderer from 'react-test-renderer';
import MyOverview from '../MyOverview';
import {
  useOrdersByPartyUuidData,
  useCarDerivativesData,
} from '../../OrdersInformation/gql';
import { LeaseTypeEnum } from '../../../../generated/globalTypes';

jest.mock('../../OrdersInformation/gql');
jest.mock('@apollo/client');

const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter() {
    return {
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
      ordersByPartyUuid: [
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
                term: 1,
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
      ],
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
      ],
    },
    error: undefined,
  },
];

describe('<MyOverview />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders quotes correctly with data', async () => {
    (useOrdersByPartyUuidData as jest.Mock).mockReturnValue(mockOrdersValue);

    (useCarDerivativesData as jest.Mock).mockReturnValue(mockCarValue);

    const getComponent = () => {
      return renderer.create(<MyOverview quote />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders orders correctly with data', async () => {
    (useOrdersByPartyUuidData as jest.Mock).mockReturnValue(mockOrdersValue);

    (useCarDerivativesData as jest.Mock).mockReturnValue(mockCarValue);

    const getComponent = () => {
      return renderer.create(<MyOverview quote={false} />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with error', async () => {
    (useOrdersByPartyUuidData as jest.Mock).mockReturnValue([
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
    (useOrdersByPartyUuidData as jest.Mock).mockReturnValue([
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
