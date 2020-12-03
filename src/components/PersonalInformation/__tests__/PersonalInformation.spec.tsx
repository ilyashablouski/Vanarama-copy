import React from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import PersonalInformation from '..';

const person = {
  address: {
    lineOne: 'Building 1000',
    lineTwo: 'Lakeside North Harbour',
    city: 'Portsmouth',
    postcode: 'PO6 3EN',
    serviceId: 'GB|RM|B|55855593',
  },
  emailAddress: 'someone.testing.motorama+44@gmail.com',
  firstName: 'Robby',
  lastName: 'William',
  personUuid: 'aa08cca2-5f8d-4b8c-9506-193d9c32e05f',
  telephoneNumber: '07987654567d',
  emailConsent: false,
  smsConsent: false,
};

describe('<PersonalInformation />', () => {
  const submit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    render(<PersonalInformation person={person} submit={submit} />);
  });

  it('should render correctly', async () => {
    const getComponent = () => {
      return renderer
        .create(<PersonalInformation person={person} submit={submit} />)
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('should show correctly error name’s too long', async () => {
    fireEvent.click(screen.getByTestId('personalSubmit'));

    fireEvent.input(screen.getByTestId('personFirstName'), {
      target: { value: 'ThisFirstNameIsOverFiftyCharactersLongggggggggggggg' },
    });

    fireEvent.click(screen.getByTestId('personalSubmitEdit'));

    await waitFor(() => {
      expect(
        screen.getByText(
          'Oops, this name’s too long. Please keep it to 50 characters',
        ),
      );
    });
  });

  it('should show correctly error name’s too long', async () => {
    fireEvent.click(screen.getByTestId('personalSubmit'));

    fireEvent.input(screen.getByTestId('personFirstName'), {
      target: { value: 'ThisFirstNameIsOverFiftyCharactersLongggggggggggggg' },
    });

    fireEvent.click(screen.getByTestId('personalSubmitEdit'));

    await waitFor(() => {
      expect(
        screen.getByText(
          'Oops, this name’s too long. Please keep it to 50 characters',
        ),
      );
    });
  });

  it('should assure max characters allowed for last name', async () => {
    fireEvent.click(screen.getByTestId('personalSubmit'));

    fireEvent.input(screen.getByTestId('personLastName'), {
      target: { value: 'ThisLastNameIsOverFiftyCharactersLonggggggggggggggg' },
    });

    fireEvent.click(screen.getByTestId('personalSubmitEdit'));

    // ASSERT
    await waitFor(() => {
      expect(
        screen.getByText(
          'Oops, this name’s too long. Please keep it to 50 characters',
        ),
      );
    });
  });

  it('should assure min mobile chars', async () => {
    fireEvent.click(screen.getByTestId('personalSubmit'));

    fireEvent.input(screen.getByTestId('personMobile'), {
      target: { value: '07402 92992' },
    });

    fireEvent.click(screen.getByTestId('personalSubmitEdit'));

    // ASSERT
    await waitFor(() => {
      expect(
        screen.getByText(
          'Please enter mobile number without spaces or hyphens',
        ),
      );
    });
  });

  it('should call submit with valid field inputs', async () => {
    fireEvent.click(screen.getByTestId('personalSubmit'));

    fireEvent.input(screen.getByTestId('personFirstName'), {
      target: { value: 'John' },
    });
    fireEvent.input(screen.getByTestId('personLastName'), {
      target: { value: 'Doe' },
    });

    fireEvent.input(screen.getByTestId('personMobile'), {
      target: { value: '07402020200' },
    });

    fireEvent.click(screen.getByTestId('personalSubmitEdit'));

    // ASSERT
    await waitFor(() => expect(submit).toHaveBeenCalledTimes(1));
  });
});
