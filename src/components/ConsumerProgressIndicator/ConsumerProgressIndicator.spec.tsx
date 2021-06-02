import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import ConsumerProgressIndicator from './ConsumerProgressIndicator';
import { query } from '../../hooks/useProgressHistory';

jest.mock('next/router');

describe('<ConsumerProgressIndicator />', () => {
  beforeEach(async () => {
    await preloadAll();
  });

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(mock => ({
      matches: false,
      media: mock,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  const mocks: MockedResponse[] = [
    {
      request: {
        query,
      },
      result: {
        data: {
          lastStep: {
            value: 2,
          },
        },
      },
    },
  ];

  it.skip('should show previous pages as completed', async () => {
    // ARRANGE
    // Mock that the user is on the address history page
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/olaf/address-history',
      query: {
        redirect: '',
        uuid: '602093f8-4d53-44aa-b54b-cfebfaef24d9',
        orderId: '9d9fd2e0-ecbb-41fb-aa04-1b2b87258467',
      },
    });

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <ConsumerProgressIndicator />
      </MockedProvider>,
    );

    // ASSERT
    await waitFor(() => expect(screen.getByText('About You')).toBeVisible());

    expect(
      screen.getByRole('link', { name: /^About You - complete/ }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('link', { name: /^Address History - complete/ }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('link', { name: /^Employment History - complete/ }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('link', { name: /^Expenses - complete/ }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('link', { name: /^Bank Details - complete/ }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('link', { name: /^Summary - complete/ }),
    ).not.toBeInTheDocument();
  });

  it('should mark the current page', async () => {
    // ARRANGE
    // Mock that the user is on the bank details page
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/olaf/about',
      query: {
        redirect: '',
        uuid: '602093f8-4d53-44aa-b54b-cfebfaef24d9',
        orderId: '9d9fd2e0-ecbb-41fb-aa04-1b2b87258467',
      },
    });

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <ConsumerProgressIndicator />
      </MockedProvider>,
    );

    // ASSERT
    await waitFor(() => expect(screen.getByText('About You')).toBeVisible());

    expect(
      screen.getByRole('link', { name: /About You - current/ }),
    ).toBeInTheDocument();
  });

  it.skip('should allow navigation to previous pages', async () => {
    // ARRANGE
    // Mock that the user is on the expenses page
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/olaf/expenses',
      query: {
        redirect: '',
        uuid: '602093f8-4d53-44aa-b54b-cfebfaef24d9',
        orderId: '9d9fd2e0-ecbb-41fb-aa04-1b2b87258467',
      },
    });

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <ConsumerProgressIndicator />
      </MockedProvider>,
    );

    // ASSERT
    await waitFor(() => expect(screen.getByText('About You')).toBeVisible());

    expect(
      screen.getByRole('link', { name: /About You - complete/ }),
    ).toHaveAttribute(
      'href',
      '/olaf/about/9d9fd2e0-ecbb-41fb-aa04-1b2b87258467?uuid=602093f8-4d53-44aa-b54b-cfebfaef24d9',
    );

    expect(
      screen.getByRole('link', { name: /Address History - complete/ }),
    ).toHaveAttribute(
      'href',
      '/olaf/address-history/9d9fd2e0-ecbb-41fb-aa04-1b2b87258467?uuid=602093f8-4d53-44aa-b54b-cfebfaef24d9',
    );

    expect(
      screen.getByRole('link', { name: /Employment History - complete/ }),
    ).toHaveAttribute(
      'href',
      '/olaf/employment-history/9d9fd2e0-ecbb-41fb-aa04-1b2b87258467?uuid=602093f8-4d53-44aa-b54b-cfebfaef24d9',
    );
  });

  it('should prevent navigation to future pages', async () => {
    // ARRANGE
    // Mock that the user is on the expenses page
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/olaf/expenses',
      query: {
        redirect: '',
        uuid: '602093f8-4d53-44aa-b54b-cfebfaef24d9',
        orderId: '9d9fd2e0-ecbb-41fb-aa04-1b2b87258467',
      },
    });

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <ConsumerProgressIndicator />
      </MockedProvider>,
    );

    // ASSERT
    await waitFor(() => expect(screen.getByText('About You')).toBeVisible());

    // The anchors should not exist for the future pages
    expect(
      screen.queryByRole('link', { name: /^Bank Details/ }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('link', { name: /^Summary/ }),
    ).not.toBeInTheDocument();
  });
});
