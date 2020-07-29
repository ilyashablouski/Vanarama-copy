import React from 'react';
import renderer from 'react-test-renderer';
import OrderInformationContainer from '../OrderInformationContainer';
import { useOrdersByPartyUuidData } from '../gql';

jest.mock('../gql');
jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: {
        partyByUuid: 'partyByUuid',
      },
    };
  },
}));

describe('<OrderInformationContainer />', () => {
  it('renders correctly with data', async () => {
    (useOrdersByPartyUuidData as jest.Mock).mockReturnValue([
      jest.fn(),
      {
        loading: false,
        data: {
          ordersByPartyUuid: [{}],
        },
      },
    ]);

    const getComponent = () => {
      return renderer.create(<OrderInformationContainer />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly without data', async () => {
    (useOrdersByPartyUuidData as jest.Mock).mockReturnValue([
      jest.fn(),
      {
        loading: false,
        data: null,
      },
    ]);

    const getComponent = () => {
      return renderer.create(<OrderInformationContainer />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
