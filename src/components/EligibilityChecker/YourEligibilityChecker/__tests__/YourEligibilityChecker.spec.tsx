import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { makeAddressResponseMock } from '../../../../hooks/useLoqate/utils';
import useLoqate from '../../../../hooks/useLoqate';
import YourEligibilityChecker from '..';

jest.mock('../../../../hooks/useLoqate');
(useLoqate as jest.Mock).mockReturnValue(makeAddressResponseMock());

function typeIntoAddressField(value: string) {
  const input = screen.getByTestId('eligibilityCheckerAddress');
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value } });
}

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

  it('should call submit with valid field inputs', async () => {
    fireEvent.input(screen.getByTestId('eligibilityCheckerFirstName'), {
      target: { value: 'John' },
    });
    fireEvent.input(screen.getByTestId('eligibilityCheckerLastName'), {
      target: { value: 'Doe' },
    });
    fireEvent.input(screen.getByTestId('eligibilityCheckerEmail'), {
      target: { value: 'hello@email.com' },
    });

    typeIntoAddressField('GB|001');
    fireEvent.mouseDown(screen.getByText(/^B001, Purbeck House 5-7/));

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
