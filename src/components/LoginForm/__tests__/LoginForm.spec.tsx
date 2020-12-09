import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import LoginForm from '../LoginForm';

describe('<LoginForm />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should call `onSubmit` if there are no validation errors', async () => {
    // ARRANGE
    const onSubmit = jest.fn();

    // ACT
    render(<LoginForm onSubmit={onSubmit} />);

    // Set the email address
    fireEvent.input(screen.getByLabelText('Your Email'), {
      target: { value: 'barry.chuckle@gmail.com' },
    });

    // Set the password
    fireEvent.input(screen.getByLabelText('Your Password'), {
      target: { value: 'Password1' },
    });

    fireEvent.submit(screen.getByText('Login'));

    // ASSERT
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  });

  it('should show required field validation messages', async () => {
    // ARRANGE
    const onSubmit = jest.fn();

    // ACT
    render(<LoginForm onSubmit={onSubmit} />);

    fireEvent.submit(screen.getByText('Login'));

    // ASSERT
    await waitFor(() =>
      expect(screen.getByText('Your Email is required')).toBeVisible(),
    );

    expect(screen.getByText('Your Password is required')).toBeVisible();
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it('should show an error message if set', async () => {
    // ACT
    render(<LoginForm onSubmit={jest.fn()} hasError />);

    // ASSERT
    expect(
      screen.getByText('Email address and password combination is not valid'),
    ).toBeVisible();
  });
});
