import React from 'react';
import renderer from 'react-test-renderer';
import OrderInformationContainer from '../OrderInformationContainer';
import { useOrdersByPartyUuidData } from '../gql';

jest.mock('../gql');

describe('<OrderInformationContainer />', () => {
  it('renders correctly with data', async () => {
    (useOrdersByPartyUuidData as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        ordersByPartyUuid: [{}],
      },
    });

    const getComponent = () => {
      return renderer
        .create(<OrderInformationContainer partyByUuid="" />)
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly without data', async () => {
    (useOrdersByPartyUuidData as jest.Mock).mockReturnValue({
      loading: false,
      data: null,
    });

    const getComponent = () => {
      return renderer
        .create(<OrderInformationContainer partyByUuid="" />)
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
