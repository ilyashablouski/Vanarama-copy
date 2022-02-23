import renderer from 'react-test-renderer';
import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { render } from '@testing-library/react';
import { TOP_BAR_LINKS } from '../../../models/enum/HeaderLinks';
import HeaderSecondaryMenu from '../HeaderSecondaryMenu';
import { IHeaderLink } from '../Header';

const mocks = {
  links: TOP_BAR_LINKS[1].children as IHeaderLink[],
  title: 'title',
  onClickTitle: jest.fn(),
  isTabletOrMobile: false,
  isMenuOpen: false,
  isSecondaryMenuOpen: false,
  dataUiTestId: 'header_secondary-menu_CARS',
  promotionalImage: {
    url: '',
    image: {
      url: '',
      fileName: '',
    },
  },
};

jest.mock('../../../hooks/useMediaQuery');
jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
  }),
}));

describe('<HeaderSecondaryMenu />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  beforeEach(() => {
    jest.clearAllMocks();
    render(<HeaderSecondaryMenu {...mocks} />);
  });

  it('renders correctly', () => {
    const getComponent = () => {
      return renderer.create(<HeaderSecondaryMenu {...mocks} />).toJSON();
    };
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
