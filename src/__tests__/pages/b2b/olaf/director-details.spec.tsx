import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import {
  DirectorDetailsPage,
  GET_COMPANY_DIRECTOR_DETAILS,
} from '../../../../pages/b2b/olaf/director-details/[companyUuid]';
import {
  GetCompanyDirectorDetailsQueryVariables,
  GetCompanyDirectorDetailsQuery,
} from '../../../../../generated/GetCompanyDirectorDetailsQuery';
import {
  GetDirectorDetailsQueryVariables,
  GetDirectorDetailsQuery,
} from '../../../../../generated/GetDirectorDetailsQuery';
import { GET_DIRECTOR_DETAILS } from '../../../../components/DirectorDetailsForm/DirectorDetailsForm';

const MOCK_COMPANY_UUID = '39c19729-b980-46bd-8a8e-ed82705b3e01';
const MOCK_COMPANY_NUMBER = '000000000';

jest.mock('../../../../layouts/OLAFLayout/OLAFLayout');
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/b2b/olaf/director-details',
    query: {
      companyUuid: MOCK_COMPANY_UUID,
    },
  }),
}));

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
          { __typename: 'CompanyOfficersDataType', name: 'FORSYTH, Bruce' },
          { __typename: 'CompanyOfficersDataType', name: 'CHUCKLE, Barry' },
          { __typename: 'CompanyOfficersDataType', name: 'CHUCKLE, Paul' },
        ],
      },
    } as GetDirectorDetailsQuery,
  },
};

const singleDirectorMock: MockedResponse = {
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
          { __typename: 'CompanyOfficersDataType', name: 'FORSYTH, Bruce' },
        ],
      },
    } as GetDirectorDetailsQuery,
  },
};

describe('B2B Director Details page', () => {
  it('should show a dropdown of directors when there are multiple', async () => {
    const mocks = [getCompanyMock, multiDirectorMock];
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <DirectorDetailsPage />
      </MockedProvider>,
    );

    // Wait for the data to load
    await screen.findByRole('combobox', { name: /Select director 1/i });

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
    const mocks = [getCompanyMock, multiDirectorMock];
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <DirectorDetailsPage />
      </MockedProvider>,
    );

    // Wait for dropdown to be on the page
    await screen.findByRole('combobox', { name: /Select director 1/i });

    // Ensure that the fields are not shown until selecting a director
    expect(
      screen.queryByRole('textbox', { name: /First Name/i }),
    ).not.toBeInTheDocument();

    // Choose a director
    fireEvent.change(
      screen.getByRole('combobox', { name: /Select director 1/i }),
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

  it('should pre-fill the first & last name and not show the director select if there is only one director', async () => {
    const mocks = [getCompanyMock, singleDirectorMock];
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <DirectorDetailsPage />
      </MockedProvider>,
    );

    // Wait for data to load
    await screen.findByRole('textbox', { name: /First Name/i });

    expect(
      screen.queryByRole('combobox', { name: /Select director 1/i }),
    ).not.toBeInTheDocument();

    // Should be pre-filled
    expect(screen.getByRole('textbox', { name: /First Name/i })).toHaveValue(
      'Bruce',
    );

    expect(screen.getByRole('textbox', { name: /Last Name/i })).toHaveValue(
      'FORSYTH',
    );
  });

  it('should show the correct validation messages when there are more than one director and the user submits an empty form', async () => {
    const mocks = [getCompanyMock, multiDirectorMock];
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <DirectorDetailsPage />
      </MockedProvider>,
    );

    // Wait for data to load
    await screen.findByRole('combobox', { name: /Select director 1/i });

    // Choose a director
    fireEvent.change(
      screen.getByRole('combobox', { name: /Select director 1/i }),
      { target: { value: 'CHUCKLE, Barry' } },
    );

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

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
    const mocks = [getCompanyMock, multiDirectorMock];
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <DirectorDetailsPage />
      </MockedProvider>,
    );

    // Wait for data to load
    await screen.findByRole('combobox', { name: /Select director 1/i });

    // Choose a director
    fireEvent.change(
      screen.getByRole('combobox', { name: /Select director 1/i }),
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
    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    // Validation messages should be shown
    await waitFor(() =>
      expect(
        screen.getByText(/Please enter a first name/i),
      ).toBeInTheDocument(),
    );

    expect(screen.getByText(/Please enter a last name/i)).toBeInTheDocument();
  });

  it('should show the correct validation messages when the user enters less than 25% shareholding', async () => {
    const mocks = [getCompanyMock, multiDirectorMock];
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <DirectorDetailsPage />
      </MockedProvider>,
    );

    // Wait for data to load
    await screen.findByRole('combobox', { name: /Select director 1/i });

    // Choose a director
    fireEvent.change(
      screen.getByRole('combobox', { name: /Select director 1/i }),
      { target: { value: 'CHUCKLE, Barry' } },
    );

    // Enter a value lower than 25%
    fireEvent.change(
      screen.getByRole('spinbutton', { name: /% Shareholder of Business/i }),
      { target: { value: '24' } },
    );

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

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
      screen.getByRole('spinbutton', { name: /% Shareholder of Business/i }),
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
});
