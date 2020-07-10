import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { GetVatDetailsCountries } from '../../../../../generated/GetVatDetailsCountries';
import {
  UpdateVatDetailsMutation,
  UpdateVatDetailsMutationVariables,
} from '../../../../../generated/UpdateVatDetailsMutation';
import { GET_VAT_DETAILS_COUNTRIES } from '../../../../components/VatDetailsForm/CountryTurnoverFieldArray';
import {
  UPDATE_VAT_DETAILS,
  VatDetailsPage,
} from '../../../../pages/b2b/olaf/vat-details/[companyUuid]';

const MOCK_COMPANY_UUID = '39c19729-b980-46bd-8a8e-ed82705b3e01';

jest.mock('../../../../layouts/OLAFLayout/OLAFLayout');
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
    pathname: '/b2b/olaf/company-details',
    query: {
      companyUuid: MOCK_COMPANY_UUID,
    },
  }),
}));

const dropDownData: MockedResponse = {
  request: {
    query: GET_VAT_DETAILS_COUNTRIES,
  },
  result: {
    data: {
      allDropDowns: {
        __typename: 'DropDownType',
        countries: {
          __typename: 'DropDownDataType',
          data: [
            'Afghanistan',
            'Albania',
            'Algeria',
            'American Samoa',
            'Andorra',
          ],
          favourites: ['United Kingdom'],
        },
      },
    } as GetVatDetailsCountries,
  },
};

function submitForm() {
  fireEvent.click(screen.getByRole('button', { name: /Continue/i }));
}

function toggleIsVATRegistered() {
  fireEvent.click(
    screen.getByRole('checkbox', { name: /The company is VAT registered/i }),
  );
}

function enterVATNumber(value: string) {
  fireEvent.input(screen.getByRole('textbox', { name: /VAT Number/i }), {
    target: { value },
  });
}

async function setTradesOutsideUK() {
  fireEvent.click(
    screen.getByRole('checkbox', {
      name: /The company trades outside the UK/i,
    }),
  );

  await screen.findByRole('combobox', { name: /Country 1/i });
}

function clickAddCountry() {
  fireEvent.click(
    screen.getByRole('button', {
      name: /add country/i,
    }),
  );
}

describe('B2B VAT Details page', () => {
  it('should only show the "VAT Number" field when checking "The company is VAT registered"', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={[dropDownData]}>
        <VatDetailsPage />
      </MockedProvider>,
    );

    // Initially, the VAT Number field should not be shown
    expect(
      screen.queryByRole('textbox', { name: /VAT Number/i }),
    ).not.toBeInTheDocument();

    toggleIsVATRegistered();

    // ASSERT
    expect(
      screen.getByRole('textbox', { name: /VAT Number/i }),
    ).toBeInTheDocument();
  });

  it('should validate the "VAT Number" field is not empty when checking "The company is VAT registered"', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={[dropDownData]}>
        <VatDetailsPage />
      </MockedProvider>,
    );

    toggleIsVATRegistered();
    submitForm();

    // ASSERT
    await waitFor(() =>
      expect(
        screen.getByText(/Please fill in VAT Number/i),
      ).toBeInTheDocument(),
    );
  });

  it('should validate the "VAT Number" field does not contain characters', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={[dropDownData]}>
        <VatDetailsPage />
      </MockedProvider>,
    );

    toggleIsVATRegistered();
    enterVATNumber('chickens!🐔');
    submitForm();

    // ASSERT
    await waitFor(() =>
      expect(
        screen.getByText(/Your VAT number must be 9 digits long/i),
      ).toBeInTheDocument(),
    );
  });

  it('should validate the "VAT Number" field is 9 digits', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={[dropDownData]}>
        <VatDetailsPage />
      </MockedProvider>,
    );

    toggleIsVATRegistered();
    enterVATNumber('0000000000');
    submitForm();

    // ASSERT
    await waitFor(() =>
      expect(
        screen.getByText(/Your VAT number must be 9 digits long/i),
      ).toBeInTheDocument(),
    );
  });

  it('should only show the "Countries of Trade and % of Turnover" field when checking "The company trades outside the UK"', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={[dropDownData]}>
        <VatDetailsPage />
      </MockedProvider>,
    );

    // Initially, the turnover fields should not be shown
    expect(
      screen.queryByRole('combobox', { name: /Country 1/i }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('spinbutton', { name: /Percentage 1/i }),
    ).not.toBeInTheDocument();

    await setTradesOutsideUK();

    // ASSERT
    expect(
      screen.getByRole('spinbutton', { name: /Percentage for country 1/i }),
    ).toBeInTheDocument();
  });

  it('should allow the user to add multiple countries', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={[dropDownData]}>
        <VatDetailsPage />
      </MockedProvider>,
    );

    await setTradesOutsideUK();

    // Second country should not exist until clicking "add country" button
    expect(
      screen.queryByRole('combobox', { name: /Country 2/i }),
    ).not.toBeInTheDocument();

    clickAddCountry();

    // ASSERT
    await waitFor(() =>
      expect(
        screen.getByRole('combobox', { name: /Country 2/i }),
      ).toBeInTheDocument(),
    );
  });

  it('should allow the user to remove all but one country', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={[dropDownData]}>
        <VatDetailsPage />
      </MockedProvider>,
    );

    await setTradesOutsideUK();
    clickAddCountry();
    await screen.findByRole('combobox', { name: /Country 2/i });

    fireEvent.click(
      screen.getByRole('button', {
        name: /Remove country 1/i,
      }),
    );

    // ASSERT
    // The second entry should disappear
    await waitFor(() =>
      expect(
        screen.queryByRole('combobox', { name: /Country 2/i }),
      ).not.toBeInTheDocument(),
    );

    // And the user should not be able to remove any more countries
    expect(
      screen.queryAllByRole('button', { name: /Remove country \d/i }),
    ).toHaveLength(0);
  });

  it('should show a validation message if the user does not select a country', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={[dropDownData]}>
        <VatDetailsPage />
      </MockedProvider>,
    );

    await setTradesOutsideUK();
    submitForm();

    // ASSERT
    await waitFor(() =>
      expect(
        screen.getByText(/Please fill in country of trade and % of turnover/i),
      ).toBeInTheDocument(),
    );
  });

  it('should show a validation message if the user enters a percentage less than 1', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={[dropDownData]}>
        <VatDetailsPage />
      </MockedProvider>,
    );

    await setTradesOutsideUK();

    fireEvent.input(screen.getByRole('combobox', { name: /Country 1/i }), {
      target: { value: 'Algeria' },
    });

    fireEvent.input(
      screen.getByRole('spinbutton', { name: /Percentage for country 1/i }),
      { target: { value: '0' } },
    );

    submitForm();

    // ASSERT
    await waitFor(() =>
      expect(
        screen.getByText(/The % of turnover must be at least 1%/i),
      ).toBeInTheDocument(),
    );
  });

  it('should show a validation message if the user enters a percentage greater than 100', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={[dropDownData]}>
        <VatDetailsPage />
      </MockedProvider>,
    );

    await setTradesOutsideUK();

    fireEvent.input(screen.getByRole('combobox', { name: /Country 1/i }), {
      target: { value: 'Algeria' },
    });

    fireEvent.input(
      screen.getByRole('spinbutton', { name: /Percentage for country 1/i }),
      { target: { value: '101' } },
    );

    submitForm();

    // ASSERT
    await waitFor(() =>
      expect(
        screen.getByText(/The Total % of Turnover Cannot Exceed 100%/i),
      ).toBeInTheDocument(),
    );
  });

  it('should show a validation message if the total percentage is greater than 100', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={[dropDownData]}>
        <VatDetailsPage />
      </MockedProvider>,
    );

    await setTradesOutsideUK();

    fireEvent.input(screen.getByRole('combobox', { name: /Country 1/i }), {
      target: { value: 'Algeria' },
    });

    fireEvent.input(
      screen.getByRole('spinbutton', { name: /Percentage for country 1/i }),
      { target: { value: '80' } },
    );

    clickAddCountry();
    await screen.findByRole('combobox', { name: /Country 2/i });

    fireEvent.input(
      screen.getByRole('spinbutton', { name: /Percentage for country 2/i }),
      { target: { value: '21' } },
    );

    submitForm();

    // ASSERT
    await waitFor(() =>
      expect(
        screen.getByText(/The Total % of Turnover Cannot Exceed 100%/i),
      ).toBeInTheDocument(),
    );
  });

  it('should not show an option for the "United Kingdom"', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={[dropDownData]}>
        <VatDetailsPage />
      </MockedProvider>,
    );

    await setTradesOutsideUK();

    // ASSERT
    expect(
      screen.queryByRole('option', { name: /United Kingdom/i }),
    ).not.toBeInTheDocument();
  });

  it('should show a validation message if the user selects the same country twice', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={[dropDownData]}>
        <VatDetailsPage />
      </MockedProvider>,
    );

    await setTradesOutsideUK();

    fireEvent.input(screen.getByRole('combobox', { name: /Country 1/i }), {
      target: { value: 'Algeria' },
    });

    fireEvent.input(
      screen.getByRole('spinbutton', { name: /Percentage for country 1/i }),
      { target: { value: '80' } },
    );

    clickAddCountry();
    await screen.findByRole('combobox', { name: /Country 2/i });

    fireEvent.input(screen.getByRole('combobox', { name: /Country 2/i }), {
      target: { value: 'Algeria' },
    });

    fireEvent.input(
      screen.getByRole('spinbutton', { name: /Percentage for country 2/i }),
      { target: { value: '20' } },
    );

    submitForm();

    // ASSERT
    await waitFor(() =>
      expect(
        screen.getByText(/You cannot select the same country more than once/i),
      ).toBeInTheDocument(),
    );
  });

  it('should not show the duplicate country validation when the dropdowns are both empty', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={[dropDownData]}>
        <VatDetailsPage />
      </MockedProvider>,
    );

    await setTradesOutsideUK();
    clickAddCountry();
    await screen.findByRole('combobox', { name: /Country 2/i });

    // ASSERT
    await waitFor(() =>
      expect(
        screen.queryByText(
          /You cannot select the same country more than once/i,
        ),
      ).not.toBeInTheDocument(),
    );
  });

  it('should submit successfully to the backend when the company is neither VAT registered nor trades outside of the UK', async () => {
    // ARRANGE
    const mockMutation = jest.fn();

    // ACT
    render(
      <MockedProvider
        addTypename={false}
        mocks={[
          dropDownData,
          {
            request: {
              query: UPDATE_VAT_DETAILS,
              variables: {
                input: {
                  uuid: MOCK_COMPANY_UUID,
                  isVatRegistered: false,
                  turnoverPercentageOutsideUk: undefined,
                  tradesOutsideUk: false,
                  vatNumber: undefined,
                },
              } as UpdateVatDetailsMutationVariables,
            },
            result: mockMutation.mockImplementation(() => ({
              data: {
                createUpdateLimitedCompany: {
                  uuid: MOCK_COMPANY_UUID,
                },
              } as UpdateVatDetailsMutation,
            })),
          },
        ]}
      >
        <VatDetailsPage />
      </MockedProvider>,
    );

    // Just submit the form straight-away
    submitForm();

    // ASSERT
    await waitFor(() => expect(mockMutation).toHaveBeenCalledTimes(1));
  });

  it('should submit successfully to the backend when the company is VAT registered', async () => {
    // ARRANGE
    const mockMutation = jest.fn();

    // ACT
    render(
      <MockedProvider
        addTypename={false}
        mocks={[
          dropDownData,
          {
            request: {
              query: UPDATE_VAT_DETAILS,
              variables: {
                input: {
                  uuid: MOCK_COMPANY_UUID,
                  isVatRegistered: true,
                  turnoverPercentageOutsideUk: undefined,
                  tradesOutsideUk: false,
                  vatNumber: '012345678',
                },
              } as UpdateVatDetailsMutationVariables,
            },
            result: mockMutation.mockImplementation(() => ({
              data: {
                createUpdateLimitedCompany: {
                  uuid: MOCK_COMPANY_UUID,
                },
              } as UpdateVatDetailsMutation,
            })),
          },
        ]}
      >
        <VatDetailsPage />
      </MockedProvider>,
    );

    toggleIsVATRegistered();

    fireEvent.input(screen.getByRole('textbox', { name: /VAT Number/i }), {
      target: { value: '012345678' },
    });

    submitForm();

    // ASSERT
    await waitFor(() => expect(mockMutation).toHaveBeenCalledTimes(1));
  });

  it('should submit successfully to the backend when the company trades outside the UK', async () => {
    // ARRANGE
    const mockMutation = jest.fn();

    // ACT
    render(
      <MockedProvider
        addTypename={false}
        mocks={[
          dropDownData,
          {
            request: {
              query: UPDATE_VAT_DETAILS,
              variables: {
                input: {
                  uuid: MOCK_COMPANY_UUID,
                  isVatRegistered: false,
                  turnoverPercentageOutsideUk: [
                    { country: 'Algeria', percentage: 10 },
                    { country: 'Andorra', percentage: 12 },
                  ],
                  tradesOutsideUk: true,
                  vatNumber: undefined,
                },
              } as UpdateVatDetailsMutationVariables,
            },
            result: mockMutation.mockImplementation(() => ({
              data: {
                createUpdateLimitedCompany: {
                  uuid: MOCK_COMPANY_UUID,
                },
              } as UpdateVatDetailsMutation,
            })),
          },
        ]}
      >
        <VatDetailsPage />
      </MockedProvider>,
    );

    await setTradesOutsideUK();

    fireEvent.input(screen.getByRole('combobox', { name: /Country 1/i }), {
      target: { value: 'Algeria' },
    });

    fireEvent.input(
      screen.getByRole('spinbutton', { name: /Percentage for country 1/i }),
      { target: { value: '10' } },
    );

    clickAddCountry();
    await screen.findByRole('combobox', { name: /Country 2/i });

    fireEvent.input(screen.getByRole('combobox', { name: /Country 2/i }), {
      target: { value: 'Andorra' },
    });

    fireEvent.input(
      screen.getByRole('spinbutton', { name: /Percentage for country 2/i }),
      { target: { value: '12' } },
    );

    submitForm();

    // ASSERT
    await waitFor(() => expect(mockMutation).toHaveBeenCalledTimes(1));
  });

  it('should show an error message if the countries cannot be loaded', async () => {
    // ACT
    render(
      <MockedProvider
        addTypename={false}
        mocks={[
          {
            request: {
              query: GET_VAT_DETAILS_COUNTRIES,
            },
            error: new Error('Backend is down!'),
          },
        ]}
      >
        <VatDetailsPage />
      </MockedProvider>,
    );

    fireEvent.click(
      screen.getByRole('checkbox', {
        name: /The company trades outside the UK/i,
      }),
    );

    // ASSERT
    await waitFor(() =>
      expect(
        screen.getByText('Could not load list of countries'),
      ).toBeInTheDocument(),
    );
  });

  it('should redirect to the "Director Details" page upon successful form submission', async () => {
    // ARRANGE
    const mockMutation = jest.fn();

    // ACT
    render(
      <MockedProvider
        addTypename={false}
        mocks={[
          dropDownData,
          {
            request: {
              query: UPDATE_VAT_DETAILS,
              variables: {
                input: {
                  uuid: MOCK_COMPANY_UUID,
                  isVatRegistered: false,
                  turnoverPercentageOutsideUk: undefined,
                  tradesOutsideUk: false,
                  vatNumber: undefined,
                },
              } as UpdateVatDetailsMutationVariables,
            },
            result: mockMutation.mockImplementation(() => ({
              data: {
                createUpdateLimitedCompany: {
                  uuid: MOCK_COMPANY_UUID,
                },
              } as UpdateVatDetailsMutation,
            })),
          },
        ]}
      >
        <VatDetailsPage />
      </MockedProvider>,
    );

    // Just submit the form straight-away
    submitForm();

    // ASSERT
    await waitFor(() => expect(mockMutation).toHaveBeenCalledTimes(1));
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith(
      '/b2b/olaf/director-details/[companyUuid]',
      `/b2b/olaf/director-details/${MOCK_COMPANY_UUID}`,
    );
  });
});
