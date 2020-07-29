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

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('<Header />', () => {
  it('renders correctly', () => {
    jest.mock('localforage', () => ({
      getItem: jest.fn(() => null),
    }));
    const getComponent = () => {
      return renderer.create(<Header {...mocks} />).toJSON();
    };
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with login user', () => {
    jest.mock('localforage', () => ({
      getItem: jest.fn(() => ({
        personByToken: {
          firstName: 'firstName',
          lastName: 'lastName',
          uuid: 'uuid',
          partyUuid: '',
        },
      })),
    }));

    const getComponent = () => {
      return renderer.create(<Header {...mocks} />).toJSON();
    };
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
