import React from 'react';
import preloadAll from 'jest-next-dynamic';
import renderer from 'react-test-renderer';
import OrderInformationContainer from '../OrderInformationContainer';
import { LeaseTypeEnum } from '../../../../generated/globalTypes';
import { GetMyOrders_myOrders } from '../../../../generated/GetMyOrders';

jest.mock('../../../hooks/useImperativeQuery');

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: {
        partyByUuid: 'partyByUuid',
      },
    };
  },
}));

const mockOrders = [
  {
    uuid: '4fe8a6de-32f3-42eb-a625-cd757f83bc39',
    leaseType: LeaseTypeEnum.BUSINESS,
    partyUuid: '4dae0697-04e6-499f-a69f-1f93c5f35484',
    personUuid: 'c9f58592-4141-4e14-9dfe-1179651a2c7d',
    salesChannel: '0',
    status: 'credit',
  },
] as GetMyOrders_myOrders[];

const mockQuoters = [
  {
    uuid: '4fe8a6de-32f3-42eb-a625-cd757f83bc39',
    leaseType: LeaseTypeEnum.PERSONAL,
    partyUuid: '4dae0697-04e6-499f-a69f-1f93c5f35484',
    personUuid: 'c9f58592-4141-4e14-9dfe-1179651a2c7d',
    salesChannel: '0',
    status: 'credit',
  },
  {
    uuid: '4fe8a6de-32f3-42eb-a625-cd757f83bc39',
    leaseType: LeaseTypeEnum.PERSONAL,
    partyUuid: '4dae0697-04e6-499f-a69f-1f93c5f35484',
    personUuid: 'c9f58592-4141-4e14-9dfe-1179651a2c7d',
    salesChannel: '0',
    status: 'credit',
  },
] as GetMyOrders_myOrders[];

describe('<OrderInformationContainer />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('renders correctly with data', () => {
    jest.mock('../../../hooks/useImperativeQuery', () => [
      jest.fn(),
      {
        loading: false,
        data: null,
      },
    ]);

    const getComponent = () => {
      return renderer
        .create(
          <OrderInformationContainer
            orders={mockOrders}
            quotes={mockQuoters}
            uuid="aa08cca2-5f8d-4b8c-9506-193d9c32e05f"
          />,
        )
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
