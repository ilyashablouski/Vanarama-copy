import React from 'react';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import ConsumerProgressIndicator from './ConsumerProgressIndicator';

jest.mock('next/router');

describe('<ConsumerProgressIndicator />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should show previous pages as completed', () => {
    // ARRANGE
    // Mock that the user is on the address history page
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/olaf/address-history/[uuid]',
      query: {
        redirect: '',
        uuid: '602093f8-4d53-44aa-b54b-cfebfaef24d9',
      },
    });

    // ACT
    render(<ConsumerProgressIndicator />);

    // ASSERT
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

  it('should mark the current page', () => {
    // ARRANGE
    // Mock that the user is on the bank details page
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/olaf/bank-details/[uuid]',
      query: {
        redirect: '',
        uuid: '602093f8-4d53-44aa-b54b-cfebfaef24d9',
      },
    });

    // ACT
    render(<ConsumerProgressIndicator />);

    // ASSERT
    expect(
      screen.getByRole('link', { name: /Bank Details - current/ }),
    ).toBeInTheDocument();
  });

  it('should allow navigation to previous pages', () => {
    // ARRANGE
    // Mock that the user is on the expenses page
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/olaf/expenses/[uuid]',
      query: {
        redirect: '',
        uuid: '602093f8-4d53-44aa-b54b-cfebfaef24d9',
      },
    });

    // ACT
    render(<ConsumerProgressIndicator />);

    // ASSERT
    expect(
      screen.getByRole('link', { name: /About You - complete/ }),
    ).toHaveAttribute(
      'href',
      '/olaf/about/602093f8-4d53-44aa-b54b-cfebfaef24d9',
    );

    expect(
      screen.getByRole('link', { name: /Address History - complete/ }),
    ).toHaveAttribute(
      'href',
      '/olaf/address-history/602093f8-4d53-44aa-b54b-cfebfaef24d9',
    );

    expect(
      screen.getByRole('link', { name: /Employment History - complete/ }),
    ).toHaveAttribute(
      'href',
      '/olaf/employment-history/602093f8-4d53-44aa-b54b-cfebfaef24d9',
    );
  });

  it('should prevent navigation to future pages', () => {
    // ARRANGE
    // Mock that the user is on the expenses page
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/olaf/expenses/[uuid]',
      query: {
        redirect: '',
        uuid: '602093f8-4d53-44aa-b54b-cfebfaef24d9',
      },
    });

    // ACT
    render(<ConsumerProgressIndicator />);

    // ASSERT
    // The anchors should not exist for the future pages
    expect(
      screen.queryByRole('link', { name: /^Bank Details/ }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('link', { name: /^Summary/ }),
    ).not.toBeInTheDocument();
  });
});
