import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import RegisterForm from './RegisterForm';

describe('<RegisterForm />', () => {
  xit('should call `onSubmit` if there are no validation errors', async () => {
    // ARRANGE
    const onSubmit = jest.fn();

    // ACT
    const { getByLabelText, getByText } = render(
      <RegisterForm onSubmit={onSubmit} />,
    );

    // Set the email address
    fireEvent.change(getByLabelText('Your Email'), {
      target: { value: 'barry.chuckle@gmail.com' },
    });

    // Set the password
    fireEvent.change(getByLabelText('Your Password'), {
      target: { value: 'Password1' },
    });

    // Set the confirm password
    fireEvent.change(getByLabelText('Repeat Password'), {
      target: { value: 'Password1' },
    });

    fireEvent.click(getByText('Register'));

    // ASSERT
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  });

  it('should show required field validation messages', async () => {
    // ARRANGE
    const onSubmit = jest.fn();

    // ACT
    const { getByText } = render(<RegisterForm onSubmit={onSubmit} />);

    fireEvent.click(getByText('Register'));

    // ASSERT
    await waitFor(() =>
      expect(getByText('Your Email is required')).toBeVisible(),
    );

    expect(getByText('Your Password is required')).toBeVisible();
    expect(getByText('Repeat Password is required')).toBeVisible();
  });

  it('should ensure the password is the correct format', async () => {
    // ARRANGE
    const onSubmit = jest.fn();

    // ACT
    const { getByLabelText, getByText } = render(
      <RegisterForm onSubmit={onSubmit} />,
    );

    // Set the email address
    fireEvent.change(getByLabelText('Your Email'), {
      target: { value: 'barry.chuckle@gmail.com' },
    });

    // Set the password
    fireEvent.change(getByLabelText('Your Password'), {
      target: { value: 'invalid' },
    });

    // Set the confirm password
    fireEvent.change(getByLabelText('Repeat Password'), {
      target: { value: 'invalid' },
    });

    fireEvent.click(getByText('Register'));

    // ASSERT
    await waitFor(() =>
      expect(
        getByText('Your Password does not meet the requirements'),
      ).toBeVisible(),
    );
  });

  it('should ensure the password and confirm password match', async () => {
    // ARRANGE
    const onSubmit = jest.fn();

    // ACT
    const { getByLabelText, getByText } = render(
      <RegisterForm onSubmit={onSubmit} />,
    );

    // Set the email address
    fireEvent.change(getByLabelText('Your Email'), {
      target: { value: 'barry.chuckle@gmail.com' },
    });

    // Set the password
    fireEvent.change(getByLabelText('Your Password'), {
      target: { value: 'Password1' },
    });

    // Set the confirm password
    fireEvent.change(getByLabelText('Repeat Password'), {
      target: { value: 'Password2' },
    });

    fireEvent.click(getByText('Register'));

    // ASSERT
    await waitFor(() =>
      expect(getByText('Repeat Password does not match')).toBeVisible(),
    );
  });
});
