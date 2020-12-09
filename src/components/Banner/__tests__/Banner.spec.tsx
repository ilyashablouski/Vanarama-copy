import React from 'react';
import preloadAll from 'jest-next-dynamic';
import renderer from 'react-test-renderer';
import Banner from '../Banner';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
  }),
}));

describe('Banner', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should correct render', async () => {
    const getComponent = () => {
      return renderer.create(<Banner />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
  it('should correct render with text for vans', async () => {
    const getComponent = () => {
      return renderer.create(<Banner vans />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
