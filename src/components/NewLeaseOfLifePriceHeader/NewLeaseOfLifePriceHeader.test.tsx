import React from 'react';
import { render } from '@testing-library/react';
import NewLeaseOfLifePriceHeader from '.';

describe('NewLeaseOfLifeHeader', () => {
  test('Renders the title', async () => {
    const { getByText, getByTestId } = render(
      <NewLeaseOfLifePriceHeader
        title="Tesla Model 3 Saloon"
        body="From £423+ vat per month"
      />,
    );
    expect(getByText(/Tesla Model 3 Saloon/i)).toBeInTheDocument();
  });
  test('Renders the price in a span tag', async () => {
    const { getByTestId } = render(
      <NewLeaseOfLifePriceHeader
        title="Tesla Model 3 Saloon"
        body="From £423+ vat per month"
      />,
    );
    expect(getByTestId('price')).toHaveTextContent(/423/i);
  });
});
