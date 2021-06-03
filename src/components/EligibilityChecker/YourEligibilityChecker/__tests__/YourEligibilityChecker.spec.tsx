import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import YourEligibilityChecker from '..';

describe('<YourEligibilityChecker />', () => {
  const submit = jest.fn();

  beforeEach(async () => {
    await preloadAll();
    render(<YourEligibilityChecker submit={submit} />);
  });

  it('should show required form field validation messages', async () => {
    fireEvent.click(screen.getByText('Check Your Eligibility'));

    await waitFor(() =>
      expect(screen.getByText('Please enter your first name')).toBeVisible(),
    );
    expect(screen.getByText('Please enter your last name')).toBeVisible();
    expect(screen.getByText('Please enter your email address')).toBeVisible();
    expect(
      screen.getByText('Please complete your date of birth'),
    ).toBeVisible();
  });

  it('should assure minimum characters allowed for first name', async () => {
    fireEvent.input(screen.getByTestId('eligibilityCheckerFirstName'), {
      target: { value: 'W' },
    });

    fireEvent.click(screen.getByText('Check Your Eligibility'));

    await waitFor(() => {
      expect(
        screen.getByText(
          'Oops, this name’s too short. Please make it 2 characters or longer',
        ),
      );
    });
  });

  it('should assure max characters allowed for first name', async () => {
    fireEvent.input(screen.getByLabelText('First Name'), {
      target: { value: 'ThisFirstNameIsOverFiftyCharactersLongggggggggggggg' },
    });

    fireEvent.click(screen.getByText('Check Your Eligibility'));

    await waitFor(() => {
      expect(
        screen.getByText(
          'Oops, this name’s too long. Please keep it to 50 characters',
        ),
      );
    });
  });

  it('should assure minimum characters allowed for last name', async () => {
    fireEvent.input(screen.getByTestId('eligibilityCheckerLastName'), {
      target: { value: 'W' },
    });

    fireEvent.click(screen.getByText('Check Your Eligibility'));

    await waitFor(() => {
      expect(
        screen.getByText(
          'Oops, this name’s too short. Please make it 2 characters or longer',
        ),
      );
    });
  });

  it('should assure max characters allowed for last name', async () => {
    fireEvent.input(screen.getByTestId('eligibilityCheckerLastName'), {
      target: { value: 'ThisLastNameIsOverFiftyCharactersLonggggggggggggggg' },
    });

    fireEvent.click(screen.getByText('Check Your Eligibility'));

    await waitFor(() => {
      expect(
        screen.getByText(
          'Oops, this name’s too long. Please keep it to 50 characters',
        ),
      );
    });
  });

  it('should assure correct email format', async () => {
    fireEvent.input(screen.getByTestId('eligibilityCheckerEmail'), {
      target: { value: 'invalid@' },
    });

    fireEvent.click(screen.getByText('Check Your Eligibility'));

    await waitFor(() => {
      expect(screen.getByText('Oops, this email address is invalid'));
    });
  });

  it('should assure minimum age', async () => {
    const thisYear = new Date().getFullYear();
    fireEvent.input(screen.getByTestId('eligibilityCheckerSelectDOB'), {
      target: { value: '1' },
    });
    fireEvent.input(screen.getByTestId('eligibilityCheckerSelectMOB'), {
      target: { value: '2' },
    });
    fireEvent.input(screen.getByTestId('eligibilityCheckerSelectYOB'), {
      target: { value: thisYear },
    });

    fireEvent.click(screen.getByText('Check Your Eligibility'));

    await waitFor(() => {
      expect(screen.getByText('Oops, you’re too young.'));
    });
  });

  it.skip('should call submit with valid field inputs', async () => {
    fireEvent.input(screen.getByTestId('eligibilityCheckerFirstName'), {
      target: { value: 'John' },
    });
    fireEvent.input(screen.getByTestId('eligibilityCheckerLastName'), {
      target: { value: 'Doe' },
    });
    fireEvent.input(screen.getByTestId('eligibilityCheckerEmail'), {
      target: { value: 'hello@email.com' },
    });
    fireEvent.input(screen.getByTestId('eligibilityCheckerAddress'), {
      target: { value: '1234' },
    });
    fireEvent.input(screen.getByTestId('eligibilityCheckerSelectDOB'), {
      target: { value: '1' },
    });
    fireEvent.input(screen.getByTestId('eligibilityCheckerSelectMOB'), {
      target: { value: '4' },
    });
    fireEvent.input(screen.getByTestId('eligibilityCheckerSelectYOB'), {
      target: { value: '2000' },
    });

    fireEvent.click(screen.getByTestId('eligibilityTermsAndCons'));
    fireEvent.click(screen.getByTestId('eligibilityPrivacyPolicy'));

    fireEvent.click(screen.getByText('Check Your Eligibility'));

    await waitFor(() => expect(submit).toHaveBeenCalledTimes(1));
  });
});
