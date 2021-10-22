import React from 'react';
import preloadAll from 'jest-next-dynamic';
import renderer from 'react-test-renderer';
import OrderInformationContainer from '../OrderInformationContainer';

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
            orders={[]}
            quotes={[]}
            uuid="aa08cca2-5f8d-4b8c-9506-193d9c32e05f"
          />,
        )
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
