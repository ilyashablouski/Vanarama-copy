import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import renderer from 'react-test-renderer';
import React from 'react';
import {
  TOP_BAR_LINKS,
  PHONE_NUMBER_LINK,
} from '../../../models/enum/HeaderLinks';
import { Header, LOGOUT_USER_MUTATION } from '../Header';

const mocks = {
  topBarLinks: TOP_BAR_LINKS,
  loginLink: {
    label: 'Login',
    href: `/account/login-register`,
  },
  phoneNumberLink: PHONE_NUMBER_LINK,
};

const mockedResponse: MockedResponse[] = [
  {
    request: {
      query: LOGOUT_USER_MUTATION,
      variables: {
        token: 'test token',
      },
    },
    result: {
      data: {
        personByUuid: true,
      },
    },
  },
];

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
      return renderer
        .create(
          <MockedProvider addTypename={false} mocks={mockedResponse}>
            <Header {...mocks} />
          </MockedProvider>,
        )
        .toJSON();
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
      return renderer
        .create(
          <MockedProvider addTypename={false} mocks={mockedResponse}>
            <Header {...mocks} />
          </MockedProvider>,
        )
        .toJSON();
    };
    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
