import renderer from 'react-test-renderer';
import React from 'react';
import { render } from '@testing-library/react';
import { TOP_BAR_LINKS } from '../../../models/enum/HeaderLinks';
import HeaderSecondaryMenu from '../HeaderSecondaryMenu';
import { IHeaderLink } from '../Header';

const mocks = {
  links: TOP_BAR_LINKS[1].children as IHeaderLink[],
  title: 'title',
  onClickTitle: jest.fn(),
  isMobile: false,
};

jest.mock('../../../hooks/useMediaQuery');
jest.mock('next/router');

describe('<HeaderSecondaryMenu />', () => {
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
