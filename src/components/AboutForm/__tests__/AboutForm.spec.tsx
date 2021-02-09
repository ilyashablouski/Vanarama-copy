import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import AboutForm from '..';

describe('<AboutForm />', () => {
  const submit = jest.fn();
  const emailExistenceCheckMock = jest.fn(() => Promise.resolve(undefined));
  const onLogInClickMock = jest.fn();

  beforeEach(async () => {
    await preloadAll();
    render(
      <AboutForm
        onLogInClick={onLogInClickMock}
        emailValidator={emailExistenceCheckMock}
        submit={submit}
        dropdownData={{
          __typename: 'DropDownType',
          titles: {
            __typename: 'DropDownDataType',
            data: ['Mr.', 'Mrs.', 'Professor'],
            favourites: [],
          },
          countries: {
            __typename: 'DropDownDataType',
            data: ['United Kingdom', 'United States'],
            favourites: [],
          },
          nationalities: {
            __typename: 'DropDownDataType',
            data: ['British', 'Irish'],
            favourites: [],
          },
          maritalStatuses: {
            __typename: 'DropDownDataType',
            data: ['Single', 'Married'],
          },
          noOfAdultsInHousehold: {
            __typename: 'DropDownDataType',
            data: ['1', 'More than 1'],
          },
          noOfDependants: {
            __typename: 'DropDownDataType',
            data: ['None', 'Lots...'],
          },
        }}
      />,
    );
  });

  it('should show required form field validation messages', async () => {
    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() =>
      expect(screen.getByText('Please select a title')).toBeVisible(),
    );

    expect(screen.getByText('Please select a title')).toBeVisible();
    expect(screen.getByText('Please enter your first name')).toBeVisible();
    expect(screen.getByText('Please enter your last name')).toBeVisible();
    expect(screen.getByText('Please enter your email address')).toBeVisible();
    expect(
      screen.getByText('Please enter your telephone number'),
    ).toBeVisible();
    expect(
      screen.getByText('Please complete your date of birth'),
    ).toBeVisible();
    expect(
      screen.getByText('Please enter your country of birth'),
    ).toBeVisible();
    expect(screen.getByText('Please enter your nationality')).toBeVisible();
    expect(screen.getByText('Please enter your marital status')).toBeVisible();
    expect(screen.getByText('Please enter number of dependants')).toBeVisible();
    expect(screen.getByText('Please enter adults in household')).toBeVisible();
    expect(
      screen.getByText('The terms and conditions must be accepted.'),
    ).toBeVisible();
  });

  it('should assure minimum characters allowed for first name', async () => {
    fireEvent.input(screen.getByTestId('aboutFirstName'), {
      target: { value: 'W' },
    });
    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() => {
      expect(
        screen.getByText(
          'Oops, this name’s too short. Please make it 2 characters or longer',
        ),
      );
    });
  });

  it('should assure max characters allowed for first name', async () => {
    fireEvent.input(screen.getByTestId('aboutFirstName'), {
      target: { value: 'ThisFirstNameIsOverFiftyCharactersLongggggggggggggg' },
    });
    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() => {
      expect(
        screen.getByText(
          'Oops, this name’s too long. Please keep it to 50 characters',
        ),
      );
    });
  });

  it('should assure minimum characters allowed for last name', async () => {
    fireEvent.input(screen.getByTestId('aboutLastName'), {
      target: { value: 'W' },
    });
    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() => {
      expect(
        screen.getByText(
          'Oops, this name’s too short. Please make it 2 characters or longer',
        ),
      );
    });
  });

  it('should assure max characters allowed for last name', async () => {
    fireEvent.input(screen.getByTestId('aboutLastName'), {
      target: { value: 'ThisLastNameIsOverFiftyCharactersLonggggggggggggggg' },
    });
    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() => {
      expect(
        screen.getByText(
          'Oops, this name’s too long. Please keep it to 50 characters',
        ),
      );
    });
  });

  it('should assure correct email format', async () => {
    fireEvent.input(screen.getByTestId('aboutEmail'), {
      target: { value: 'invalid@' },
    });
    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() => {
      expect(screen.getByText('Oops, this email address is invalid'));
    });
  });

  it('should assure min telephone chars', async () => {
    fireEvent.input(screen.getByTestId('aboutTelephone'), {
      target: { value: '0740292992' },
    });
    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() => {
      expect(
        screen.getByText(
          'Please enter telephone number without spaces or hyphens',
        ),
      );
    });
  });

  it('should assure max telephone chars', async () => {
    fireEvent.input(screen.getByTestId('aboutTelephone'), {
      // over 16 digits
      target: { value: '074029299222222200' },
    });
    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() => {
      expect(
        screen.getByText(
          'Oops, this telephone number is too long. Please enter 16 characters or less',
        ),
      );
    });
  });

  it('should assure minimum age', async () => {
    const thisYear = new Date().getFullYear();
    fireEvent.input(screen.getByTestId('aboutSelectDOB'), {
      target: { value: '1' },
    });
    fireEvent.input(screen.getByTestId('aboutSelectMOB'), {
      target: { value: '2' },
    });
    fireEvent.input(screen.getByTestId('aboutSelectYOB'), {
      target: { value: thisYear },
    });
    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() => {
      expect(screen.getByText('Oops, you’re too young.'));
    });
  });

  it('should call submit with valid field inputs', async () => {
    fireEvent.input(screen.getByTestId('aboutTitle'), {
      target: { value: 'Mr.' },
    });
    fireEvent.input(screen.getByTestId('aboutFirstName'), {
      target: { value: 'John' },
    });
    fireEvent.input(screen.getByTestId('aboutLastName'), {
      target: { value: 'Doe' },
    });
    fireEvent.input(screen.getByTestId('aboutEmail'), {
      target: { value: 'hello@email.com' },
    });
    fireEvent.input(screen.getByTestId('aboutTelephone'), {
      target: { value: '07402020200' },
    });
    fireEvent.input(screen.getByTestId('aboutSelectDOB'), {
      target: { value: '1' },
    });
    fireEvent.input(screen.getByTestId('aboutSelectMOB'), {
      target: { value: '4' },
    });
    fireEvent.input(screen.getByTestId('aboutSelectYOB'), {
      target: { value: '2000' },
    });
    fireEvent.input(screen.getByTestId('aboutSelectCOB'), {
      target: { value: 'United Kingdom' },
    });
    fireEvent.input(screen.getByTestId('aboutNationality'), {
      target: { value: 'British' },
    });
    fireEvent.input(screen.getByTestId('aboutMaritalStatus'), {
      target: { value: 'Single' },
    });
    fireEvent.input(screen.getByTestId('aboutDependants'), {
      target: { value: 'None' },
    });
    fireEvent.input(screen.getByTestId('aboutAdultsInHouse'), {
      target: { value: '1' },
    });
    fireEvent.input(screen.getByTestId('aboutTermsAndCons'), {
      target: { checked: true },
    });
    fireEvent.input(screen.getByTestId('aboutPrivacyPolicy'), {
      target: { checked: true },
    });
    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() => expect(submit).toHaveBeenCalledTimes(1));
  });
});
