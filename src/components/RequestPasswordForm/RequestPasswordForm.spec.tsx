import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import React from 'react';
import RequestPasswordForm from './RequestPasswordForm';

describe('<RequestPasswordForm />', () => {
  it('should call `onSubmit` if there are no validation errors', async () => {
    // ARRANGE
    const onSubmit = jest.fn();

    // ACT
    render(<RequestPasswordForm onSubmit={onSubmit} />);

    // Set the email address
    fireEvent.input(screen.getByLabelText('Email'), {
      target: { value: 'test@test.tt' },
    });

    fireEvent.submit(screen.getByText('Reset Password'));

    // ASSERT
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  });

  it('should show required field validation messages', async () => {
    // ARRANGE
    const onSubmit = jest.fn();

    // ACT
    render(<RequestPasswordForm onSubmit={onSubmit} />);

    fireEvent.submit(screen.getByText('Reset Password'));

    // ASSERT
    await waitFor(() =>
      expect(screen.getByText('Your Email is required')).toBeVisible(),
    );

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });
});
