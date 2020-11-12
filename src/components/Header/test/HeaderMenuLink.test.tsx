import renderer from 'react-test-renderer';
import React from 'react';
// @ts-ignore
import preloadAll from 'jest-next-dynamic';
import { TOP_BAR_LINKS } from '../../../models/enum/HeaderLinks';
import HeaderMenuLink from '../HeaderMenuLink';

const mocks = {
  link: TOP_BAR_LINKS[1],
  isMenuOpen: false,
};

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
  }),
}));
jest.mock('../../../hooks/useMediaQuery');

describe('<HeaderMenuLink />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('renders correctly', () => {
    const getComponent = () => {
      return renderer.create(<HeaderMenuLink {...mocks} />).toJSON();
    };
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly without children', () => {
    mocks.link = {
      label: 'Offers',
      href: '/van-leasing/',
      highlight: true,
      id: '98bb3f76-0126-4448-aae2-f54476b3f887',
    };
    const getComponent = () => {
      return renderer.create(<HeaderMenuLink {...mocks} />).toJSON();
    };
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
