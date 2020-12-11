import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import preloadAll from 'jest-next-dynamic';
import RegisterForm from '../RegisterForm';

const jestMock = (emailAlreadyExists: boolean) => {
  return jest.fn().mockReturnValue(emailAlreadyExists);
};

const renderComponent = (
  onSubmit: jest.Mock<any, any>,
  emailAlreadyExists: jest.Mock<any, any>,
) => {
  render(
    <RegisterForm
      onSubmit={onSubmit}
      onCheckEmailExists={emailAlreadyExists}
    />,
  );
};

const fillTextandBlur = async (labelText: string, email: string) => {
  fireEvent.input(screen.getByLabelText(labelText), {
    target: { value: email },
  });

  fireEvent.blur(screen.getByLabelText(labelText));
};

describe('<RegisterForm />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should call `onSubmit` if there are no validation errors', async () => {
    // ARRANGE
    const onSubmit = jest.fn();
    const emailAlreadyExists = jestMock(false);

    // ACT
    renderComponent(onSubmit, emailAlreadyExists);

    // Set the first name
    fireEvent.input(screen.getByLabelText('First Name'), {
      target: { value: 'Barry' },
    });

    // Set the last name
    fireEvent.input(screen.getByLabelText('Last Name'), {
      target: { value: 'Chuckle' },
    });

    // Set the email address
    fireEvent.input(screen.getByLabelText('Your Email'), {
      target: { value: 'barry.chuckle@gmail.com' },
    });

    // Set the password
    fireEvent.input(screen.getByLabelText('Your Password'), {
      target: { value: 'Password1' },
    });

    // Set the confirm password
    fireEvent.input(screen.getByLabelText('Repeat Password'), {
      target: { value: 'Password1' },
    });

    fireEvent.click(screen.getByText('Register'));

    // ASSERT
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  });

  it('should show required field validation messages', async () => {
    // ARRANGE
    const onSubmit = jest.fn();

    // ACT
    renderComponent(onSubmit, jest.fn());

    fireEvent.click(screen.getByText('Register'));

    // ASSERT
    await waitFor(() =>
      expect(screen.getByText('Your Email is required')).toBeVisible(),
    );

    expect(screen.getByText('Please enter your first name')).toBeVisible();
    expect(screen.getByText('Please enter your last name')).toBeVisible();
    expect(screen.getByText('Your Password is required')).toBeVisible();
    expect(
      screen.getByText('Please fill in your repeat password'),
    ).toBeVisible();
  });

  it('should ensure the First Name and Last Name are in correct format', async () => {
    // ARRANGE
    const onSubmit = jest.fn();

    // ACT
    renderComponent(onSubmit, jest.fn());

    // Set the first name
    fireEvent.input(screen.getByLabelText('First Name'), {
      target: { value: 'B2arry' },
    });

    // Set the last name
    fireEvent.input(screen.getByLabelText('Last Name'), {
      target: { value: 'C' },
    });

    // Set the email address
    fireEvent.input(screen.getByLabelText('Your Email'), {
      target: { value: 'barry.chuckle@gmail.com' },
    });

    // Set the password
    fireEvent.input(screen.getByLabelText('Your Password'), {
      target: { value: 'invalid' },
    });

    // Set the confirm password
    fireEvent.input(screen.getByLabelText('Repeat Password'), {
      target: { value: 'invalid' },
    });

    fireEvent.click(screen.getByText('Register'));

    // ASSERT
    await waitFor(() =>
      expect(
        screen.getByText('Please use only letters, apostrophes and dashes.'),
      ).toBeVisible(),
    );

    expect(
      screen.getByText(
        'Oops, this last name’s too short. Please make it 2 characters or more.',
      ),
    ).toBeVisible();
  });

  it('should ensure the password is the correct format', async () => {
    // ARRANGE
    const onSubmit = jest.fn();

    // ACT
    renderComponent(onSubmit, jest.fn());

    // Set the email address
    fireEvent.input(screen.getByLabelText('Your Email'), {
      target: { value: 'barry.chuckle@gmail.com' },
    });

    // Set the password
    fireEvent.input(screen.getByLabelText('Your Password'), {
      target: { value: 'invalid' },
    });

    // Set the confirm password
    fireEvent.input(screen.getByLabelText('Repeat Password'), {
      target: { value: 'invalid' },
    });

    fireEvent.click(screen.getByText('Register'));

    // ASSERT
    await waitFor(() =>
      expect(
        screen.getByText('Your Password does not meet the requirements'),
      ).toBeVisible(),
    );
  });

  it('should ensure the password and confirm password match', async () => {
    // ARRANGE
    const onSubmit = jest.fn();

    // ACT
    renderComponent(onSubmit, jest.fn());

    // Set the email address
    fireEvent.input(screen.getByLabelText('Your Email'), {
      target: { value: 'barry.chuckle@gmail.com' },
    });

    // Set the password
    fireEvent.input(screen.getByLabelText('Your Password'), {
      target: { value: 'Password1' },
    });

    // Set the confirm password
    fireEvent.input(screen.getByLabelText('Repeat Password'), {
      target: { value: 'Password2' },
    });

    fireEvent.click(screen.getByText('Register'));

    // ASSERT
    await waitFor(() =>
      expect(screen.getByText('Repeat Password does not match')).toBeVisible(),
    );
  });

  describe('Email Already Exists', () => {
    beforeEach(async () => {
      await preloadAll();
    });
    const message = () => {
      return 'This email address already exists. Please log in';
    };

    let onSubmit: jest.Mock<any, any>;
    const labelText = 'Your Email';
    const errorMessage = message();
    const email = 'test@test.com';

    beforeEach(() => {
      onSubmit = jest.fn();
    });

    afterEach(() => {
      onSubmit.mockReset();
    });

    it('should show validation email error for existing email', async () => {
      const emailAlreadyExists = jestMock(true);
      renderComponent(onSubmit, emailAlreadyExists);

      fillTextandBlur(labelText, email);

      await waitFor(() => expect(screen.getByText(errorMessage)).toBeVisible());
    });

    it('should not show validation email error for new email', async () => {
      const emailAlreadyExists = jestMock(false);
      renderComponent(onSubmit, emailAlreadyExists);

      fillTextandBlur(labelText, email);

      await waitFor(() =>
        expect(screen.queryByText(errorMessage)).not.toBeInTheDocument(),
      );
    });
  });
});
