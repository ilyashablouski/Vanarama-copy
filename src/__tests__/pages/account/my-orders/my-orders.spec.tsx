import React from 'react';
import renderer from 'react-test-renderer';
import MyOrdersPage from '../../../../pages/account/my-orders/index';
import {
  useOrdersByPartyUuidData,
  useCarDerivativesData,
} from '../../../../containers/OrdersInformation/gql';
import { LeaseTypeEnum } from '../../../../../generated/globalTypes';

jest.mock('../../../../containers/OrdersInformation/gql');

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

describe('<MyOrdersPage />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with data', async () => {
    (useOrdersByPartyUuidData as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        ordersByPartyUuid: [
          {
            id: 'id',
            leaseType: LeaseTypeEnum.PERSONAL,
            createdAt: new Date(),
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
                  funder: 'funder',
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
    });

    (useCarDerivativesData as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        derivatives: [
          {
            id: 'derivativeCapId',
            manufacturerName: 'manufacturerName',
            modelName: 'modelName',
            name: 'name',
            fuelTypeName: 'fuelTypeName',
            transmissionName: 'transmissionName',
          },
        ],
      },
      error: undefined,
    });

    const getComponent = () => {
      return renderer.create(<MyOrdersPage />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with error', async () => {
    (useOrdersByPartyUuidData as jest.Mock).mockReturnValue({
      loading: false,
      data: undefined,
      error: { message: 'Error' },
    });

    const getComponent = () => {
      return renderer.create(<MyOrdersPage />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with loading', async () => {
    (useOrdersByPartyUuidData as jest.Mock).mockReturnValue({
      loading: true,
      data: undefined,
      error: undefined,
    });

    const getComponent = () => {
      return renderer.create(<MyOrdersPage />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
