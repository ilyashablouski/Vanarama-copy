import { fireEvent, render, waitFor, act } from '@testing-library/react';
import React from 'react';
import RegisterForm from './RegisterForm';

const jestMock = (emailAlreadyExists: boolean) => {
  return jest.fn().mockReturnValue({ data: { emailAlreadyExists } });
};

const renderComponent = (
  onSubmit: jest.Mock<any, any>,
  emailAlreadyExists: jest.Mock<any, any>,
) => {
  return render(
    <RegisterForm
      onSubmit={onSubmit}
      onEmailAlreadyExists={emailAlreadyExists}
    />,
  );
};

const fillTextandBlur = async (
  getByLabelText: any,
  labelText: string,
  email: string,
) => {
  fireEvent.input(getByLabelText(labelText), {
    target: { value: email },
  });

  await act(async () => {
    fireEvent.blur(getByLabelText(labelText));
  });
};

describe('<RegisterForm />', () => {
  it('should call `onSubmit` if there are no validation errors', async () => {
    // ARRANGE
    const onSubmit = jest.fn();
    const emailAlreadyExists = jestMock(false);

    // ACT
    const { getByLabelText, getByText } = renderComponent(
      onSubmit,
      emailAlreadyExists,
    );

    // Set the email address
    fireEvent.input(getByLabelText('Your Email'), {
      target: { value: 'barry.chuckle@gmail.com' },
    });

    // Set the password
    fireEvent.input(getByLabelText('Your Password'), {
      target: { value: 'Password1' },
    });

    // Set the confirm password
    fireEvent.input(getByLabelText('Repeat Password'), {
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
    const { getByText } = renderComponent(onSubmit, jest.fn());

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
    const { getByLabelText, getByText } = renderComponent(onSubmit, jest.fn());

    // Set the email address
    fireEvent.input(getByLabelText('Your Email'), {
      target: { value: 'barry.chuckle@gmail.com' },
    });

    // Set the password
    fireEvent.input(getByLabelText('Your Password'), {
      target: { value: 'invalid' },
    });

    // Set the confirm password
    fireEvent.input(getByLabelText('Repeat Password'), {
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
    const { getByLabelText, getByText } = renderComponent(onSubmit, jest.fn());

    // Set the email address
    fireEvent.input(getByLabelText('Your Email'), {
      target: { value: 'barry.chuckle@gmail.com' },
    });

    // Set the password
    fireEvent.input(getByLabelText('Your Password'), {
      target: { value: 'Password1' },
    });

    // Set the confirm password
    fireEvent.input(getByLabelText('Repeat Password'), {
      target: { value: 'Password2' },
    });

    fireEvent.click(getByText('Register'));

    // ASSERT
    await waitFor(() =>
      expect(getByText('Repeat Password does not match')).toBeVisible(),
    );
  });

  describe('Email Already Exists', () => {
    let onSubmit: jest.Mock<any, any>;
    const labelText = 'Your Email';
    const errorMessage = 'Email Already Exists';
    const email = 'test@test.com';

    beforeEach(() => {
      onSubmit = jest.fn();
    });

    afterEach(() => {
      onSubmit.mockReset();
    });

    it('should show validation email error for existing email', async () => {
      const emailAlreadyExists = jestMock(true);
      const { getByLabelText, getByText } = renderComponent(
        onSubmit,
        emailAlreadyExists,
      );

      fillTextandBlur(getByLabelText, labelText, email);

      await waitFor(() => expect(getByText(errorMessage)).toBeVisible());
    });

    it('should not show validation email error for new email', async () => {
      const emailAlreadyExists = jestMock(false);
      const { getByLabelText, queryByText } = renderComponent(
        onSubmit,
        emailAlreadyExists,
      );

      fillTextandBlur(getByLabelText, labelText, email);

      await waitFor(() =>
        expect(queryByText(errorMessage)).not.toBeInTheDocument(),
      );
    });
  });
});
