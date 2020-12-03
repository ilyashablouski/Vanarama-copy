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
  it('renders correctly without data', () => {
    jest.mock('../../../hooks/useImperativeQuery', () => [
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
