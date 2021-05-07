import renderer from 'react-test-renderer';
import React from 'react';
// @ts-ignore
import preloadAll from 'jest-next-dynamic';
import {
  TOP_BAR_LINKS,
  PHONE_NUMBER_LINK,
} from '../../../models/enum/HeaderLinks';
import { Header } from '../Header';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
  }),
}));

jest.mock('@apollo/client', () => ({
  useApolloClient: () => ({
    client: () => undefined,
  }),
}));

const mocks = {
  topBarLinks: TOP_BAR_LINKS,
  loginLink: {
    label: 'Login',
    href: `/account/login-register`,
  },
  onLogOut: jest.fn(),
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
  beforeEach(async () => {
    await preloadAll();
  });
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
        ordersLength: 9,
        quotesLength: 9,
      })),
    }));

    const getComponent = () => {
      return renderer.create(<Header {...mocks} />).toJSON();
    };
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
