import renderer from 'react-test-renderer';
import React from 'react';
import { TOP_BAR_LINKS } from '../../../models/enum/HeaderLinks';
import HeaderMenu from '../HeaderMenu';

const mocks = {
  menuLinks: TOP_BAR_LINKS,
  open: false,
  onClickMenu: jest.fn(),
};

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
  }),
}));
jest.mock('../../../hooks/useMediaQuery');

describe('<HeaderMenu />', () => {
  it('renders correctly', () => {
    const getComponent = () => {
      return renderer.create(<HeaderMenu {...mocks} />).toJSON();
    };
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with open', () => {
    mocks.open = true;
    const getComponent = () => {
      return renderer.create(<HeaderMenu {...mocks} />).toJSON();
    };
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
