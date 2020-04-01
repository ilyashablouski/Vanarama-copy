import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import LoginForm from './LoginForm';

describe('<LoginForm />', () => {
  it('should call `onSubmit` if there are no validation errors', async () => {
    // ARRANGE
    const onSubmit = jest.fn();

    // ACT
    const { getByLabelText, getByText } = render(
      <LoginForm onSubmit={onSubmit} />,
    );

    // Set the email address
    fireEvent.change(getByLabelText('Your Email'), {
      target: { value: 'barry.chuckle@gmail.com' },
    });

    // Set the password
    fireEvent.change(getByLabelText('Your Password'), {
      target: { value: 'Password1' },
    });

    fireEvent.submit(getByText('Login'));

    // ASSERT
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  });

  it('should show required field validation messages', async () => {
    // ARRANGE
    const onSubmit = jest.fn();

    // ACT
    const { getByText } = render(<LoginForm onSubmit={onSubmit} />);

    fireEvent.submit(getByText('Login'));

    // ASSERT
    await waitFor(() =>
      expect(getByText('Your Email is required')).toBeVisible(),
    );

    expect(getByText('Your Password is required')).toBeVisible();
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });
});
