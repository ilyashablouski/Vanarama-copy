import React from 'react';
import {
  fireEvent,
  render,
  waitFor,
  screen,
  cleanup,
} from '@testing-library/react';
import AboutForm from '..';

describe.skip('<AboutForm />', () => {
  const submit = jest.fn();
  let rendered;

  beforeEach(() => {
    const { container } = render(
      <AboutForm submit={submit} allDropDowns={{}} preloadData={{}} />,
    );
    rendered = container;
  });

  afterEach(cleanup);

  it('renders with default props correctly', () => {
    expect(rendered).toMatchSnapshot();
  });

  it('should show required form field validation messages', async () => {
    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() => {
      expect(screen.getByText('Please select your a title')).toBeVisible();
      expect(screen.getByText('Please enter your first name')).toBeVisible();
      expect(screen.getByText('Please enter your last name')).toBeVisible();
      expect(screen.getByText('Pleas enter your email address')).toBeVisible();
      expect(screen.getByText('Please enter your mobile')).toBeVisible();
      expect(
        screen.getByText('Please complete your date of birth'),
      ).toBeVisible();
      expect(
        screen.getByText('Please enter your country of birth'),
      ).toBeVisible();
      expect(screen.getByText('Please enter your nationality')).toBeVisible();
      expect(
        screen.getByText('Please enter your marital status'),
      ).toBeVisible();
      expect(
        screen.getByText('Please enter number of dependants'),
      ).toBeVisible();
      expect(
        screen.getByText('Please enter number of adults in household'),
      ).toBeVisible();
      expect(
        screen.getByText('Please confirm terms and conditions'),
      ).toBeVisible();
    });
  });

  it('should assure minimum characters allowed for first name', async () => {
    fireEvent.change(screen.getByTestId('aboutFirstName'), {
      target: { value: 'W' },
    });
    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() => {
      expect(
        screen.getByText(
          'Oops, this name’s too short. Please make it longer than 2 characters',
        ),
      );
    });
  });

  it('should assure max characters allowed for first name', async () => {
    fireEvent.change(screen.getByTestId('aboutFirstName'), {
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
    fireEvent.change(screen.getByTestId('aboutLastName'), {
      target: { value: 'W' },
    });
    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() => {
      expect(
        screen.getByText(
          'Oops, this name’s too short. Please make it longer than 2 characters',
        ),
      );
    });
  });

  it('should assure max characters allowed for last name', async () => {
    fireEvent.change(screen.getByTestId('aboutLastName'), {
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
    fireEvent.change(screen.getByTestId('aboutEmail'), {
      target: { value: 'invalid@' },
    });
    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() => {
      expect(screen.getByText('Oops, this email address is invalid'));
    });
  });

  it('should assure min mobile chars', async () => {
    fireEvent.change(screen.getByTestId('aboutMobile'), {
      target: { value: '0740292992' },
    });
    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() => {
      expect(
        screen.getByText(
          'Please enter mobile number without spaces or hyphens',
        ),
      );
    });
  });

  it('should assure max mobile chars', async () => {
    fireEvent.change(screen.getByTestId('aboutMobile'), {
      // over 15 digits
      target: { value: '0740292992222222' },
    });
    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() => {
      expect(
        screen.getByText(
          'Please enter mobile number without spaces or hyphens',
        ),
      );
    });
  });

  it('should assure minimum age', async () => {
    const thisYear = new Date().getFullYear();
    fireEvent.change(screen.getByTestId('aboutSelectDOB'), {
      target: { value: '1' },
    });
    fireEvent.change(screen.getByTestId('aboutSelectMOB'), {
      target: { value: 'January' },
    });
    fireEvent.change(screen.getByTestId('aboutSelectYOB'), {
      target: { value: thisYear },
    });
    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() => {
      expect(screen.getByText('Oops, you’re too young.'));
    });
  });

  it('should call submit with valid field inputs', async () => {
    fireEvent.change(screen.getByTestId('aboutFirstName'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByTestId('aboutLastName'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByTestId('aboutEmail'), {
      target: { value: 'hello@email.com' },
    });
    fireEvent.change(screen.getByTestId('aboutMobile'), {
      target: { value: '07402020200' },
    });
    fireEvent.change(screen.getByTestId('aboutSelectDOB'), {
      target: { value: '1' },
    });
    fireEvent.change(screen.getByTestId('aboutSelectMOB'), {
      target: { value: 'January' },
    });
    fireEvent.change(screen.getByTestId('aboutSelectYOB'), {
      target: { value: '2000' },
    });
    fireEvent.change(screen.getByTestId('countryOfBirth'), {
      target: { value: 'United Kingdom' },
    });
    fireEvent.change(screen.getByTestId('aboutNationality'), {
      target: { value: 'British' },
    });
    fireEvent.change(screen.getByTestId('aboutMaritalStatus'), {
      target: { value: 'British' },
    });
    fireEvent.change(screen.getByTestId('aboutDependants'), {
      target: { value: '1' },
    });
    fireEvent.change(screen.getByTestId('aboutAdultsInHouse'), {
      target: { value: '1' },
    });
    fireEvent.change(screen.getByTestId('aboutTermsAndCons'), {
      target: { checked: true },
    });
    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() => expect(submit).toHaveBeenCalledTimes(1));
  });
});
