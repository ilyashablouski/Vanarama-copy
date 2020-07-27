import renderer from 'react-test-renderer';
import React from 'react';
import {
  TOP_BAR_LINKS,
  PHONE_NUMBER_LINK,
} from '../../../models/enum/HeaderLinks';
import Header from '../Header';

const mocks = {
  topBarLinks: TOP_BAR_LINKS,
  loginLink: {
    label: 'Login',
    href: `/account/login-register`,
  },
  phoneNumberLink: PHONE_NUMBER_LINK,
};

describe('<Header />', () => {
  it('renders correctly', () => {
    const getComponent = () => {
      return renderer.create(<Header {...mocks} />).toJSON();
    };
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
