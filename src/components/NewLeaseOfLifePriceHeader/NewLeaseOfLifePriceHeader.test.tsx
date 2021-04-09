import React from 'react';
import { screen, render } from '@testing-library/react';
import NewLeaseOfLifePriceHeader from '.';

describe('NewLeaseOfLifeHeader', () => {
  test('Renders the title', async () => {
    render(
      <NewLeaseOfLifePriceHeader
        title="Tesla Model 3 Saloon"
        body="From £423 + vat per month"
      />,
    );
    expect(screen.getByText(/Tesla Model 3 Saloon/i)).toBeInTheDocument();
  });
  test('Renders the price in a span tag', async () => {
    render(
      <NewLeaseOfLifePriceHeader
        title="Tesla Model 3 Saloon"
        body="From £423+ vat per month"
      />,
    );
    expect(screen.getByTestId('price')).toHaveTextContent(/423/i);
  });
});
