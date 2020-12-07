import React from 'react';
import preloadAll from 'jest-next-dynamic';
import renderer from 'react-test-renderer';
import Banner from '../Banner';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
  }),
}));

describe('BusinessAboutForm', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should show required field validation messages if the user submits without filling the form', async () => {
    const getComponent = () => {
      return renderer.create(<Banner />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
