import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import CompanyBankDetails from '..';

describe('<CompanyBankDetails />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should show required form field validation messages', async () => {
    // ACT
    render(<CompanyBankDetails onSubmit={jest.fn()} isEdited={false} />);
    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() =>
      expect(screen.getByText('Please enter bank account name')).toBeVisible(),
    );

    expect(screen.getByText('Please enter account number')).toBeVisible();
    expect(screen.getByText('Please enter sort code')).toBeVisible();
    expect(
      screen.getByText('Please select account opening date'),
    ).toBeVisible();
  });
});
