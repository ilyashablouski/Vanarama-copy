import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react';
import BankDetails from '..';

describe('<BankDetails />', () => {
  const submit = jest.fn();
  let rendered: HTMLElement;

  beforeEach(() => {
    const { container } = render(<BankDetails onSubmit={submit} />);
    rendered = container;
  });

  afterEach(cleanup);

  it('renders with default props correctly', () => {
    expect(rendered).toMatchSnapshot();
  });

  it('should show required form field validation messages', async () => {
    fireEvent.click(screen.getByText('Continue'));

    await waitFor(() => {
      expect(screen.getByText('Please enter name on account')).toBeVisible();
      expect(screen.getByText('Please enter account number')).toBeVisible();
      expect(screen.getByText('Please enter sort code')).toBeVisible();
      expect(screen.getByText('Please enter bank name')).toBeVisible();
      expect(
        screen.getByText('Please select account opening date'),
      ).toBeVisible();
      expect(
        screen.getByText('The understanding must be accepted'),
      ).toBeVisible();
      expect(
        screen.getByText('The terms and conditions must be accepted'),
      ).toBeVisible();
    });
  });
});
