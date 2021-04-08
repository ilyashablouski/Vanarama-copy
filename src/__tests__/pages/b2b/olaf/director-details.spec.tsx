import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { DirectorDetailsPage } from '../../../../pages/b2b/olaf/director-details/[companyUuid]';
import {
  GET_COMPANY_DIRECTOR_DETAILS,
  SAVE_DIRECTOR_DETAILS,
  GET_DIRECTOR_DETAILS,
  FUNDER_DIRECTORS_QUERY,
} from '../../../../containers/DirectorDetailsFormContainer/gql';
import {
  GetCompanyDirectorDetailsQueryVariables,
  GetCompanyDirectorDetailsQuery,
} from '../../../../../generated/GetCompanyDirectorDetailsQuery';
import {
  GetDirectorDetailsQueryVariables,
  GetDirectorDetailsQuery,
} from '../../../../../generated/GetDirectorDetailsQuery';
import {
  SaveDirectorDetailsMutationVariables,
  SaveDirectorDetailsMutation,
} from '../../../../../generated/SaveDirectorDetailsMutation';
import { makeGetCreditApplicationMock } from '../../../../gql/creditApplication';

const MOCK_COMPANY_UUID = '39c19729-b980-46bd-8a8e-ed82705b3e01';
const MOCK_ORDER_UUID = '7a004b65-a409-4ffe-8a3d-23b9ae28d0dc';
const MOCK_DIRECTOR_UUID = '93452168-bd59-4a70-bb8c-322354e1a7da';
const MOCK_COMPANY_NUMBER = '000000000';

jest.mock('../../../../layouts/OLAFLayout/OLAFLayout');
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/b2b/olaf/director-details/[companyUuid]',
    query: {
      companyUuid: MOCK_COMPANY_UUID,
      directorUuid: MOCK_DIRECTOR_UUID,
      orderId: MOCK_ORDER_UUID,
    },
  }),
}));

const updateCreditApplication = makeGetCreditApplicationMock(MOCK_ORDER_UUID);

const getValidationParams: MockedResponse = {
  request: {
    query: FUNDER_DIRECTORS_QUERY,
    variables: {
      input: {
        companiesHouseDirectors: 3,
        companyType: 'partnership',
        id: '',
      },
    },
  },
  result: {
    data: {
      funderDirectors: {
        id: '2',
        funderData: {
          percentage_shares: '25',
          num_of_directors: '1',
        },
      },
    },
  },
};

const getCompanyMock: MockedResponse = {
  request: {
    query: GET_COMPANY_DIRECTOR_DETAILS,
    variables: {
      uuid: MOCK_COMPANY_UUID,
    } as GetCompanyDirectorDetailsQueryVariables,
  },
  result: {
    data: {
      companyByUuid: {
        uuid: MOCK_COMPANY_UUID,
        companyNumber: MOCK_COMPANY_NUMBER,
        associates: [
          {
            uuid: 'uuid',
            firstName: 'Bruce',
            lastName: 'FORSYTH',
            businessShare: 30,
            addresses: [
              {
                serviceId: 'GB|001',
                propertyStatus: 'Owned',
                startedOn: '2005-01-01',
                city: '',
                lineOne: '',
                lineTwo: '',
                postcode: '',
              },
            ],
            gender: 'Male',
            title: 'Mr',
            dateOfBirth: '1987-06-01',
            roles: [{ position: 'director' }],
            noOfDependants: 'One',
            nationality: 'British',
          },
        ],
      },
      allDropDowns: {
        __typename: 'DropDownType',
        titles: {
          __typename: 'DropDownDataType',
          data: ['Mr', 'Mrs', 'Dr'],
          favourites: [],
        },
        noOfDependants: {
          __typename: 'DropDownDataType',
          data: ['None', 'One', 'Two'],
          favourites: [],
        },
        nationalities: {
          __typename: 'DropDownDataType',
          data: ['None', 'Canadian', 'British'],
          favourites: [],
        },
        propertyStatuses: {
          __typename: 'DropDownDataType',
          data: ['Rented', 'Owned'],
          favourites: [],
        },
      },
    } as GetCompanyDirectorDetailsQuery,
  },
};

const multiDirectorMock: MockedResponse = {
  request: {
    query: GET_DIRECTOR_DETAILS,
    variables: {
      companyNumber: MOCK_COMPANY_NUMBER,
    } as GetDirectorDetailsQueryVariables,
  },
  result: {
    data: {
      allDropDowns: {
        __typename: 'DropDownType',
        noOfDependants: {
          __typename: 'DropDownDataType',
          data: ['None', 'One', 'Two'],
          favourites: [],
        },
        propertyStatuses: {
          __typename: 'DropDownDataType',
          data: ['Rented', 'Owned'],
          favourites: [],
        },
        titles: {
          __typename: 'DropDownDataType',
          data: ['Mr', 'Mrs', 'Dr'],
          favourites: [],
        },
      },
      companyOfficers: {
        nodes: [
          { name: 'FORSYTH, Bruce' },
          { name: 'CHUCKLE, Barry' },
          { name: 'CHUCKLE, Paul' },
        ],
      },
    } as GetDirectorDetailsQuery,
  },
};

describe('B2B Director Details page', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should show a dropdown of directors when there are multiple', async () => {
    render(
      <MockedProvider
        addTypename={false}
        mocks={[
          getCompanyMock,
          multiDirectorMock,
          multiDirectorMock,
          updateCreditApplication,
          getValidationParams,
        ]}
      >
        <DirectorDetailsPage />
      </MockedProvider>,
    );

    // Wait for the data to load
    await screen.findByRole('combobox', { name: /Select director/i });

    expect(
      screen.getByRole('option', { name: /FORSYTH, Bruce/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('option', { name: /CHUCKLE, Barry/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('option', { name: /CHUCKLE, Paul/i }),
    ).toBeInTheDocument();
  });

  it('should show the form and pre-fill the first & last name when selecting a director', async () => {
    render(
      <MockedProvider
        addTypename={false}
        mocks={[
          getCompanyMock,
          multiDirectorMock,
          multiDirectorMock,
          updateCreditApplication,
          getValidationParams,
        ]}
      >
        <DirectorDetailsPage />
      </MockedProvider>,
    );

    // Wait for dropdown to be on the page
    await screen.findByRole('combobox', { name: /Select director/i });

    // Ensure that the fields are not shown until selecting a director
    expect(
      screen.queryByRole('textbox', { name: /First Name/i }),
    ).not.toBeInTheDocument();

    // Choose a director
    fireEvent.change(
      screen.getByRole('combobox', { name: /Select director/i }),
      { target: { value: 'CHUCKLE, Barry' } },
    );

    // The fields should show and be pre-filled
    await waitFor(() =>
      expect(screen.getByRole('textbox', { name: /First Name/i })).toHaveValue(
        'Barry',
      ),
    );

    expect(screen.getByRole('textbox', { name: /Last Name/i })).toHaveValue(
      'CHUCKLE',
    );
  });

  it('should show the correct validation messages when there are more than one director and the user submits an empty form', async () => {
    render(
      <MockedProvider
        addTypename={false}
        mocks={[
          getCompanyMock,
          multiDirectorMock,
          multiDirectorMock,
          updateCreditApplication,
          getValidationParams,
        ]}
      >
        <DirectorDetailsPage />
      </MockedProvider>,
    );

    // Wait for data to load
    await screen.findByRole('combobox', { name: /Select director/i });

    // Choose a director
    fireEvent.change(
      screen.getByRole('combobox', { name: /Select director/i }),
      { target: { value: 'CHUCKLE, Barry' } },
    );

    // Submit the form
    fireEvent.click(screen.getByTestId('vat-details_continue'));

    // Validation for the select director dropdown should be shown
    await waitFor(() =>
      expect(screen.getByText(/Please select a title/i)).toBeInTheDocument(),
    );

    expect(screen.getByText(/Please select a gender/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Please select a date of birth/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Please enter a number of dependants/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Please enter the share of business/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Please enter your address/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Please select your property status/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Please select a move in date/i),
    ).toBeInTheDocument();
  });

  it('should show the correct validation messages for first and last name when they are cleared', async () => {
    render(
      <MockedProvider
        addTypename={false}
        mocks={[
          getCompanyMock,
          multiDirectorMock,
          multiDirectorMock,
          updateCreditApplication,
          getValidationParams,
        ]}
      >
        <DirectorDetailsPage />
      </MockedProvider>,
    );

    // Wait for data to load
    await screen.findByRole('combobox', { name: /Select director/i });

    // Choose a director
    fireEvent.change(
      screen.getByRole('combobox', { name: /Select director/i }),
      { target: { value: 'CHUCKLE, Barry' } },
    );

    // Clear the fields
    fireEvent.change(screen.getByRole('textbox', { name: /First Name/i }), {
      target: { value: '' },
    });

    fireEvent.change(screen.getByRole('textbox', { name: /Last Name/i }), {
      target: { value: '' },
    });

    // Submit the form
    fireEvent.click(screen.getByTestId('vat-details_continue'));

    // Validation messages should be shown
    await waitFor(() =>
      expect(
        screen.getByText(/Please enter a first name/i),
      ).toBeInTheDocument(),
    );

    expect(screen.getByText(/Please enter a last name/i)).toBeInTheDocument();
  });

  it('should show the correct validation messages when the user enters less than 25% shareholding', async () => {
    render(
      <MockedProvider
        addTypename={false}
        mocks={[
          getCompanyMock,
          multiDirectorMock,
          multiDirectorMock,
          updateCreditApplication,
          getValidationParams,
        ]}
      >
        <DirectorDetailsPage />
      </MockedProvider>,
    );

    // Wait for data to load
    await screen.findByRole('combobox', { name: /Select director/i });

    // Choose a director
    fireEvent.change(
      screen.getByRole('combobox', { name: /Select director/i }),
      { target: { value: 'CHUCKLE, Barry' } },
    );

    // Enter a value lower than 25%
    fireEvent.change(
      screen.getByRole('spinbutton', { name: /% Shareholding of Business/i }),
      { target: { value: '24' } },
    );

    // Submit the form
    fireEvent.click(screen.getByTestId('vat-details_continue'));

    // Validation message should be shown
    await waitFor(() =>
      expect(
        screen.getByText(
          'We require details of a director(s) with a combined shareholding of over 25%. Please add another director.',
        ),
      ).toBeInTheDocument(),
    );

    // Enter a value greater than or equal to 25%
    fireEvent.change(
      screen.getByRole('spinbutton', { name: /% Shareholding of Business/i }),
      { target: { value: '25' } },
    );

    // The validation message should disappear
    await waitFor(() =>
      expect(
        screen.queryByText(
          'We require details of a director(s) with a combined shareholding of over 25%. Please add another director.',
        ),
      ).not.toBeInTheDocument(),
    );
  });

  it('should prompt to add another director when the total shareholding is less than 25%', async () => {
    render(
      <MockedProvider
        addTypename={false}
        mocks={[
          getCompanyMock,
          multiDirectorMock,
          multiDirectorMock,
          updateCreditApplication,
          getValidationParams,
        ]}
      >
        <DirectorDetailsPage />
      </MockedProvider>,
    );

    // Wait for data to load
    await screen.findByRole('combobox', { name: /Select director/i });

    // Choose a director
    fireEvent.change(
      screen.getByRole('combobox', { name: /Select director/i }),
      { target: { value: 'CHUCKLE, Barry' } },
    );

    // Enter a value lower than 25%
    fireEvent.change(
      screen.getByRole('spinbutton', { name: /% Shareholding of Business/i }),
      { target: { value: '15' } },
    );

    // Submit the form
    fireEvent.click(screen.getByTestId('vat-details_continue'));

    // Validation message should be shown
    await waitFor(() =>
      expect(
        screen.getByText(
          'We require details of a director(s) with a combined shareholding of over 25%. Please add another director.',
        ),
      ).toBeInTheDocument(),
    );

    // Choose another director
    fireEvent.change(
      screen.getByRole('combobox', { name: /Select director/i }),
      { target: { value: 'CHUCKLE, Paul' } },
    );

    // Enter a value greater than or equal to 25%
    fireEvent.change(
      screen.getAllByRole('spinbutton', {
        name: /% Shareholding of Business/i,
      })[1],
      { target: { value: '11' } },
    );

    // The validation message should disappear
    await waitFor(() =>
      expect(
        screen.queryByText(
          'We require details of a director(s) with a combined shareholding of over 25%. Please add another director.',
        ),
      ).not.toBeInTheDocument(),
    );
  });

  it('should disable directors that are already selected', async () => {
    render(
      <MockedProvider
        addTypename={false}
        mocks={[
          getCompanyMock,
          multiDirectorMock,
          multiDirectorMock,
          multiDirectorMock,
          updateCreditApplication,
          getValidationParams,
        ]}
      >
        <DirectorDetailsPage />
      </MockedProvider>,
    );

    // Wait for data to load
    await screen.findByRole('combobox', { name: /Select director/i });

    // Choose a director
    fireEvent.change(
      screen.getByRole('combobox', { name: /Select director/i }),
      { target: { value: 'CHUCKLE, Barry' } },
    );

    // Enter a value lower than 25%
    fireEvent.change(
      screen.getByRole('spinbutton', { name: /% Shareholding of Business/i }),
      { target: { value: '15' } },
    );

    // Submit the form
    fireEvent.click(screen.getByTestId('vat-details_continue'));

    // Validation message should be shown
    await waitFor(() =>
      expect(
        screen.getByText(
          'We require details of a director(s) with a combined shareholding of over 25%. Please add another director.',
        ),
      ).toBeInTheDocument(),
    );

    // Barry Chuckle should now be disabled
    expect(
      screen.getByRole('option', { name: /CHUCKLE, Barry/i }),
    ).toBeDisabled();
  });

  it('should allow directors to be deleted', async () => {
    render(
      <MockedProvider
        addTypename={false}
        mocks={[
          getCompanyMock,
          multiDirectorMock,
          multiDirectorMock,
          multiDirectorMock,
          updateCreditApplication,
          getValidationParams,
        ]}
      >
        <DirectorDetailsPage />
      </MockedProvider>,
    );

    // Wait for data to load
    await screen.findByRole('combobox', { name: /Select director/i });

    // Choose a director
    fireEvent.change(
      screen.getByRole('combobox', { name: /Select director/i }),
      { target: { value: 'CHUCKLE, Barry' } },
    );

    // The field should show and be pre-filled
    await waitFor(() =>
      expect(screen.getByRole('textbox', { name: /First Name/i })).toHaveValue(
        'Barry',
      ),
    );

    // Now remove that director
    fireEvent.click(screen.getByRole('button', { name: /Remove director 1/i }));

    // The director should have been removed
    await waitFor(() =>
      expect(
        screen.queryByRole('textbox', { name: /First Name/i }),
      ).not.toBeInTheDocument(),
    );
  });

  it('should show a validation message against each director if the total percentage is over 100%', async () => {
    render(
      <MockedProvider
        addTypename={false}
        mocks={[
          getCompanyMock,
          multiDirectorMock,
          multiDirectorMock,
          multiDirectorMock,
          updateCreditApplication,
          getValidationParams,
        ]}
      >
        <DirectorDetailsPage />
      </MockedProvider>,
    );

    // Wait for data to load
    await screen.findByRole('combobox', { name: /Select director/i });

    // Choose a director
    fireEvent.change(
      screen.getByRole('combobox', { name: /Select director/i }),
      { target: { value: 'CHUCKLE, Barry' } },
    );

    // Enter a value lower than 24 so another director is needed
    fireEvent.change(
      screen.getByRole('spinbutton', { name: /% Shareholding of Business/i }),
      { target: { value: '24' } },
    );

    // Try submit the form
    fireEvent.click(screen.getByTestId('vat-details_continue'));

    // Validation message should be shown
    await waitFor(() =>
      expect(
        screen.getByText(
          'We require details of a director(s) with a combined shareholding of over 25%. Please add another director.',
        ),
      ).toBeInTheDocument(),
    );

    // Choose another director
    fireEvent.change(
      screen.getByRole('combobox', { name: /Select director/i }),
      { target: { value: 'CHUCKLE, Paul' } },
    );

    // Enter a value that combined with the other director is more than 100
    fireEvent.change(
      screen.getAllByRole('spinbutton', {
        name: /% Shareholding of Business/i,
      })[1],
      { target: { value: '77' } },
    );

    // Validation message should be shown against each director
    await waitFor(() =>
      expect(
        screen.getAllByText(
          /Combined shareholding is over 100%. Please review/i,
        ),
      ).toHaveLength(2),
    );
  });

  xit('should submit valid data to the backend', async () => {
    const mockMutation = jest.fn();
    const mocks: MockedResponse[] = [
      getCompanyMock,
      // NOTE: This mock is declared twice in this test because it is set to 'no-cache' and is
      // indeed called twice
      multiDirectorMock,
      multiDirectorMock,
      getValidationParams,
      {
        request: {
          query: SAVE_DIRECTOR_DETAILS,
          variables: {
            input: {
              uuid: MOCK_COMPANY_UUID,
              associates: [
                {
                  firstName: 'Barry',
                  lastName: 'CHUCKLE',
                  businessShare: 30,
                  addresses: [
                    {
                      serviceId: 'GB|001',
                      propertyStatus: 'Owned',
                      startedOn: '2005-01-01',
                    },
                  ],
                  gender: 'Male',
                  title: 'Mr',
                  dateOfBirth: '1987-06-01',
                  role: { position: 'director' },
                  noOfDependants: 'One',
                },
              ],
            },
          } as SaveDirectorDetailsMutationVariables,
        },
        result: mockMutation.mockImplementation(() => ({
          data: {
            createUpdateCompanyDirector: {
              uuid: MOCK_COMPANY_UUID,
            },
          } as SaveDirectorDetailsMutation,
        })),
      },
      updateCreditApplication,
    ];

    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <DirectorDetailsPage />
      </MockedProvider>,
    );

    // Wait for data to load
    await screen.findByRole('combobox', { name: /Select director/i });

    // Choose a director
    fireEvent.change(
      screen.getByRole('combobox', { name: /Select director/i }),
      { target: { value: 'CHUCKLE, Barry' } },
    );

    // Wait for form to load
    await screen.findByRole('combobox', { name: /Title/i });

    // Fill in the rest of the form
    fireEvent.change(screen.getByRole('combobox', { name: /Title/i }), {
      target: { value: 'Mr' },
    });

    fireEvent.change(screen.getByRole('combobox', { name: /Gender/i }), {
      target: { value: 'Male' },
    });

    fireEvent.change(screen.getByTestId('directors[0].dayOfBirth'), {
      target: { value: '1' },
    });

    fireEvent.change(screen.getByTestId('directors[0].monthOfBirth'), {
      target: { value: '6' },
    });

    fireEvent.change(screen.getByTestId('directors[0].yearOfBirth'), {
      target: { value: '1987' },
    });

    fireEvent.change(
      screen.getByRole('combobox', { name: /Number of Dependants/i }),
      { target: { value: 'One' } },
    );

    fireEvent.change(
      screen.getByRole('spinbutton', { name: /% Shareholding of Business/i }),
      { target: { value: '30' } },
    );

    fireEvent.change(screen.getByTestId('directors[0].history[0].address'), {
      target: { value: 'GB|001' },
    });

    fireEvent.change(
      screen.getByRole('combobox', { name: /Your Property Status/i }),
      { target: { value: 'Owned' } },
    );

    fireEvent.change(screen.getByTestId('directors[0].history[0].month'), {
      target: { value: '1' },
    });

    fireEvent.change(screen.getByTestId('directors[0].history[0].year'), {
      target: { value: '2005' },
    });

    // Submit the form
    fireEvent.click(screen.getByTestId('vat-details_continue'));

    await waitFor(() => expect(mockMutation).toHaveBeenCalledTimes(1));
  });

  it("should show the correct validation message if the director's date of birth is invalid (e.g. 31st Feb)", async () => {
    render(
      <MockedProvider
        addTypename={false}
        mocks={[
          getCompanyMock,
          multiDirectorMock,
          multiDirectorMock,
          multiDirectorMock,
          updateCreditApplication,
          getValidationParams,
        ]}
      >
        <DirectorDetailsPage />
      </MockedProvider>,
    );

    // Wait for data to load
    await screen.findByRole('combobox', { name: /Select director/i });

    // Choose a director
    fireEvent.change(
      screen.getByRole('combobox', { name: /Select director/i }),
      { target: { value: 'CHUCKLE, Barry' } },
    );

    // Wait for form to load
    await screen.findByRole('combobox', { name: /Title/i });

    // Choose an invalid date
    fireEvent.change(screen.getByTestId('directors[0].dayOfBirth'), {
      target: { value: '31' },
    });

    fireEvent.change(screen.getByTestId('directors[0].monthOfBirth'), {
      target: { value: '2' },
    });

    fireEvent.change(screen.getByTestId('directors[0].yearOfBirth'), {
      target: { value: '1987' },
    });

    // Submit the form
    fireEvent.click(screen.getByTestId('vat-details_continue'));
    await waitFor(() =>
      expect(
        screen.getByText('Oops, is your age correct?'),
      ).toBeInTheDocument(),
    );
  });

  it('should show the correct validation message if the director is too young', async () => {
    render(
      <MockedProvider
        addTypename={false}
        mocks={[
          getCompanyMock,
          multiDirectorMock,
          multiDirectorMock,
          updateCreditApplication,
          getValidationParams,
        ]}
      >
        <DirectorDetailsPage />
      </MockedProvider>,
    );

    // Wait for data to load
    await screen.findByRole('combobox', { name: /Select director/i });

    // Choose a director
    fireEvent.change(
      screen.getByRole('combobox', { name: /Select director/i }),
      { target: { value: 'CHUCKLE, Barry' } },
    );

    // Wait for form to load
    await screen.findByRole('combobox', { name: /Title/i });

    // Choose an invalid date
    fireEvent.change(screen.getByTestId('directors[0].dayOfBirth'), {
      target: { value: '1' },
    });

    fireEvent.change(screen.getByTestId('directors[0].monthOfBirth'), {
      target: { value: '1' },
    });

    fireEvent.change(screen.getByTestId('directors[0].yearOfBirth'), {
      target: { value: String(new Date().getFullYear() - 10) }, // 10 years ago
    });

    // Submit the form
    fireEvent.click(screen.getByTestId('vat-details_continue'));
    await waitFor(() =>
      expect(screen.getByText('Oops, you’re too young.')).toBeInTheDocument(),
    );
  });

  it("should show the correct validation message if the director's first name is too short", async () => {
    render(
      <MockedProvider
        addTypename={false}
        mocks={[
          getCompanyMock,
          multiDirectorMock,
          multiDirectorMock,
          updateCreditApplication,
          getValidationParams,
        ]}
      >
        <DirectorDetailsPage />
      </MockedProvider>,
    );

    // Wait for data to load
    await screen.findByRole('combobox', { name: /Select director/i });

    // Choose a director
    fireEvent.change(
      screen.getByRole('combobox', { name: /Select director/i }),
      { target: { value: 'CHUCKLE, Barry' } },
    );

    // Wait for form to load
    await screen.findByRole('combobox', { name: /Title/i });

    // Change the first name
    fireEvent.change(screen.getByRole('textbox', { name: /First Name/i }), {
      target: { value: 'M' },
    });

    // Submit the form
    fireEvent.click(screen.getByTestId('vat-details_continue'));
    await waitFor(() =>
      expect(
        screen.getByText(
          'Oops, this name’s too short. Please make it 2 characters or more.',
        ),
      ).toBeInTheDocument(),
    );
  });

  it("should show the correct validation message if the director's first name is too long", async () => {
    render(
      <MockedProvider
        addTypename={false}
        mocks={[
          getCompanyMock,
          multiDirectorMock,
          multiDirectorMock,
          updateCreditApplication,
          getValidationParams,
        ]}
      >
        <DirectorDetailsPage />
      </MockedProvider>,
    );

    // Wait for data to load
    await screen.findByRole('combobox', { name: /Select director/i });

    // Choose a director
    fireEvent.change(
      screen.getByRole('combobox', { name: /Select director/i }),
      { target: { value: 'CHUCKLE, Barry' } },
    );

    // Wait for form to load
    await screen.findByRole('combobox', { name: /Title/i });

    // Change the first name
    fireEvent.change(screen.getByRole('textbox', { name: /First Name/i }), {
      target: { value: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' },
    });

    // Submit the form
    fireEvent.click(screen.getByTestId('vat-details_continue'));
    await waitFor(() =>
      expect(
        screen.getByText(
          'Oops, this name’s too long. Please keep it to 50 characters or less.',
        ),
      ).toBeInTheDocument(),
    );
  });

  it('should not show the date of birth validation message until the day, month and year have all been filled out', async () => {
    render(
      <MockedProvider
        addTypename={false}
        mocks={[
          getCompanyMock,
          multiDirectorMock,
          multiDirectorMock,
          multiDirectorMock,
          updateCreditApplication,
          getValidationParams,
        ]}
      >
        <DirectorDetailsPage />
      </MockedProvider>,
    );

    // Wait for data to load
    await screen.findByRole('combobox', { name: /Select director/i });

    // Choose a director
    fireEvent.change(
      screen.getByRole('combobox', { name: /Select director/i }),
      { target: { value: 'CHUCKLE, Barry' } },
    );

    // Wait for form to load
    await screen.findByRole('combobox', { name: /Title/i });

    // Enter only the day
    fireEvent.change(screen.getByTestId('directors[0].dayOfBirth'), {
      target: { value: '1' },
    });

    await waitFor(() =>
      expect(
        screen.queryByText('Please select a date of birth'),
      ).not.toBeInTheDocument(),
    );
  });

  it('should show a validation message for the director dropdown when another is required', async () => {
    render(
      <MockedProvider
        addTypename={false}
        mocks={[
          getCompanyMock,
          multiDirectorMock,
          multiDirectorMock,
          updateCreditApplication,
          getValidationParams,
        ]}
      >
        <DirectorDetailsPage />
      </MockedProvider>,
    );

    // Wait for data to load
    await screen.findByRole('combobox', { name: /Select director/i });

    // Choose a director
    fireEvent.change(
      screen.getByRole('combobox', { name: /Select director/i }),
      { target: { value: 'CHUCKLE, Barry' } },
    );

    // Wait for form to load
    await screen.findByRole('combobox', { name: /Title/i });

    // Choose a percentage below 25%
    fireEvent.change(
      screen.getByRole('spinbutton', { name: /% Shareholding of Business/i }),
      {
        target: { value: '20' },
      },
    );

    // There should not be a validation message until after submission of the form
    await waitFor(() =>
      expect(
        screen.queryByText('Please select a director'),
      ).not.toBeInTheDocument(),
    );

    // Submit the form
    fireEvent.click(screen.getByTestId('vat-details_continue'));

    // There should be a validation message
    await waitFor(() =>
      expect(screen.getByText('Please select a director')).toBeInTheDocument(),
    );
  });
});
