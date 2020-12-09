import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { GetVatDetailsCountries } from '../../../../../generated/GetVatDetailsCountries';
import {
  UpdateLimitedVatDetailsMutation,
  UpdateLimitedVatDetailsMutationVariables,
} from '../../../../../generated/UpdateLimitedVatDetailsMutation';
import { GET_VAT_DETAILS_COUNTRIES } from '../../../../components/VatDetailsForm/CountryTurnoverFieldArray';
import { VatDetailsPage } from '../../../../pages/b2b/olaf/vat-details/[companyUuid]';
import {
  UPDATE_LIMITED_VAT_DETAILS,
  GET_VAT_DETAILS,
} from '../../../../containers/VatDetailsFormContainer/gql';
import {
  makeGetCreditApplicationMock,
  makeUpdateCreditApplicationMock,
} from '../../../../gql/creditApplication';
import { GetVatDetailsQuery } from '../../../../../generated/GetVatDetailsQuery';

const MOCK_COMPANY_UUID = '39c19729-b980-46bd-8a8e-ed82705b3e01';
const MOCK_ORDER_UUID = '39c19729-1111-46bd-0000-ed82705b3e01';
const MOCK_PERSON_UUID = '39c19729-1111-46bd-0000-0000705b0000'

jest.mock('../../../../layouts/OLAFLayout/OLAFLayout');
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
    pathname: '/b2b/olaf/vat-details',
    query: {
      companyUuid: MOCK_COMPANY_UUID,
      orderId: MOCK_ORDER_UUID,
      personUuid: MOCK_PERSON_UUID,
    },
  }),
}));

const getCreditApplication = makeGetCreditApplicationMock(MOCK_ORDER_UUID);

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

const companyByUuid: MockedResponse = {
  request: {
    query: GET_VAT_DETAILS,
    variables: {
      input: {
        companyUuid: MOCK_COMPANY_UUID,
      },
    },
  },
  result: {
    data: {
      companyByUuid: {
        uuid: 'uuid',
        isVatRegistered: false,
        tradesOutsideUk: false,
        turnoverPercentageOutsideUk: [
          {
            country: 'country',
            percentage: 'percentage',
          },
        ],
        vatNumber: 'vatNumber',
      },
    } as GetVatDetailsQuery,
  },
};

async function waitForLoadingFinish() {
  await waitFor(() =>
    expect(screen.getByTestId('vat-details_heading')).toBeInTheDocument(),
  );
}

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
      <MockedProvider
        addTypename={false}
        mocks={[dropDownData, companyByUuid, getCreditApplication]}
      >
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitForLoadingFinish();

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
      <MockedProvider
        addTypename={false}
        mocks={[dropDownData, companyByUuid, getCreditApplication]}
      >
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitForLoadingFinish();

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
      <MockedProvider
        addTypename={false}
        mocks={[dropDownData, companyByUuid, getCreditApplication]}
      >
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitForLoadingFinish();

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
      <MockedProvider
        addTypename={false}
        mocks={[dropDownData, companyByUuid, getCreditApplication]}
      >
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitForLoadingFinish();

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
      <MockedProvider
        addTypename={false}
        mocks={[dropDownData, companyByUuid, getCreditApplication]}
      >
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitForLoadingFinish();

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
      <MockedProvider
        addTypename={false}
        mocks={[dropDownData, companyByUuid, getCreditApplication]}
      >
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitForLoadingFinish();

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
      <MockedProvider
        addTypename={false}
        mocks={[dropDownData, companyByUuid, getCreditApplication]}
      >
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitForLoadingFinish();

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
      <MockedProvider
        addTypename={false}
        mocks={[dropDownData, companyByUuid, getCreditApplication]}
      >
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitForLoadingFinish();

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
      <MockedProvider
        addTypename={false}
        mocks={[dropDownData, companyByUuid, getCreditApplication]}
      >
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitForLoadingFinish();

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
      <MockedProvider
        addTypename={false}
        mocks={[dropDownData, companyByUuid, getCreditApplication]}
      >
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitForLoadingFinish();

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
      <MockedProvider
        addTypename={false}
        mocks={[dropDownData, companyByUuid, getCreditApplication]}
      >
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitForLoadingFinish();

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
      <MockedProvider
        addTypename={false}
        mocks={[dropDownData, companyByUuid, getCreditApplication]}
      >
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitForLoadingFinish();

    await setTradesOutsideUK();

    // ASSERT
    expect(
      screen.queryByRole('option', { name: /United Kingdom/i }),
    ).not.toBeInTheDocument();
  });

  it('should show a validation message if the user selects the same country twice', async () => {
    // ACT
    render(
      <MockedProvider
        addTypename={false}
        mocks={[dropDownData, companyByUuid, getCreditApplication]}
      >
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitForLoadingFinish();

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
      <MockedProvider
        addTypename={false}
        mocks={[dropDownData, companyByUuid, getCreditApplication]}
      >
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitForLoadingFinish();

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
          companyByUuid,
          {
            request: {
              query: UPDATE_LIMITED_VAT_DETAILS,
              variables: {
                input: {
                  person: {
                    uuid: MOCK_PERSON_UUID,
                  },
                  companyType: 'Limited',
                  uuid: '39c19729-b980-46bd-8a8e-ed82705b3e01',
                  isVatRegistered: false,
                  tradesOutsideUk: false,
                  turnoverPercentageOutsideUk: undefined,
                  vatNumber: undefined,
                },
              } as UpdateLimitedVatDetailsMutationVariables,
            },
            result: mockMutation.mockImplementation(() => ({
              data: {
                createUpdateLimitedCompany: {
                  uuid: MOCK_COMPANY_UUID,
                  isVatRegistered: false,
                  tradesOutsideUk: true,
                  turnoverPercentageOutsideUk: [
                    { country: 'Algeria', percentage: '10' },
                  ],
                  vatNumber: null,
                },
              } as UpdateLimitedVatDetailsMutation,
            })),
          },
          getCreditApplication,
        ]}
      >
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitForLoadingFinish();

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
          companyByUuid,
          {
            request: {
              query: UPDATE_LIMITED_VAT_DETAILS,
              variables: {
                input: {
                  person: {
                    uuid: MOCK_PERSON_UUID,
                  },
                  companyType: 'Limited',
                  uuid: '39c19729-b980-46bd-8a8e-ed82705b3e01',
                  isVatRegistered: true,
                  tradesOutsideUk: false,
                  turnoverPercentageOutsideUk: undefined,
                  vatNumber: '012345678',
                },
              } as UpdateLimitedVatDetailsMutationVariables,
            },
            result: mockMutation.mockImplementation(() => ({
              data: {
                createUpdateLimitedCompany: {
                  uuid: MOCK_COMPANY_UUID,
                  isVatRegistered: true,
                  tradesOutsideUk: false,
                  turnoverPercentageOutsideUk: null,
                  vatNumber: '',
                },
              } as UpdateLimitedVatDetailsMutation,
            })),
          },
          getCreditApplication,
        ]}
      >
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitForLoadingFinish();

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
          companyByUuid,
          {
            request: {
              query: UPDATE_LIMITED_VAT_DETAILS,
              variables: {
                input: {
                  person: {
                    uuid: MOCK_PERSON_UUID,
                  },
                  companyType: 'Limited',
                  uuid: '39c19729-b980-46bd-8a8e-ed82705b3e01',
                  isVatRegistered: false,
                  tradesOutsideUk: true,
                  turnoverPercentageOutsideUk: [
                    { country: 'Algeria', percentage: 10 },
                    { country: 'Andorra', percentage: 12 },
                  ],
                  vatNumber: undefined,
                },
              } as UpdateLimitedVatDetailsMutationVariables,
            },
            result: mockMutation.mockImplementation(() => ({
              data: {
                createUpdateLimitedCompany: {
                  uuid: MOCK_COMPANY_UUID,
                  isVatRegistered: false,
                  tradesOutsideUk: true,
                  turnoverPercentageOutsideUk: null,
                  vatNumber: null,
                },
              } as UpdateLimitedVatDetailsMutation,
            })),
          },
          getCreditApplication,
        ]}
      >
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitForLoadingFinish();

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
          companyByUuid,
          {
            request: {
              query: GET_VAT_DETAILS_COUNTRIES,
            },
            error: new Error('Backend is down!'),
          },
          getCreditApplication,
        ]}
      >
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitForLoadingFinish();

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

  it.skip('should redirect to the "Director Details" page upon successful form submission', async () => {
    // ARRANGE
    const mockMutation = jest.fn();

    // ACT
    render(
      <MockedProvider
        addTypename={false}
        mocks={[
          dropDownData,
          companyByUuid,
          getCreditApplication,
          {
            request: {
              query: UPDATE_LIMITED_VAT_DETAILS,
              variables: {
                input: {
                  companyType: 'Limited',
                  uuid: '39c19729-b980-46bd-8a8e-ed82705b3e01',
                  isVatRegistered: false,
                  tradesOutsideUk: false,
                  turnoverPercentageOutsideUk: undefined,
                  vatNumber: undefined,
                },
              } as UpdateLimitedVatDetailsMutationVariables,
            },
            result: mockMutation.mockImplementation(() => ({
              data: {
                createUpdateLimitedCompany: {
                  uuid: MOCK_COMPANY_UUID,
                  isVatRegistered: false,
                  tradesOutsideUk: true,
                  turnoverPercentageOutsideUk: null,
                  vatNumber: null,
                },
              } as UpdateLimitedVatDetailsMutation,
            })),
          },
          makeUpdateCreditApplicationMock({
            orderUuid: '39c19729-1111-46bd-0000-ed82705b3e01',
            status: 'status',
            addresses: [],
            aboutDetails: 'aboutDetails',
            bankAccounts: [
              {
                account_name: 'Eternal account',
                account_number: '67272820',
                joined_at_month: '1',
                joined_at_year: '2020',
                sort_code: '019387',
              },
            ],
            employmentHistories: 'employmentHistories',
            incomeAndExpenses: 'incomeAndExpenses',
            leadManagerProposalId: 'leadManagerProposalId',
            companyDetails: {},
            vatDetails: { vatRegistered: false, outsideUK: false },
            directorsDetails: 'directorsDetails',
            soleTraderDetails: {},
          }),
        ]}
      >
        <VatDetailsPage />
      </MockedProvider>,
    );

    await waitForLoadingFinish();

    // Just submit the form straight-away
    submitForm();

    // ASSERT
    await waitFor(() => expect(mockMutation).toHaveBeenCalledTimes(1));
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith(
      `/b2b/olaf/director-details/[companyUuid]?orderId=${MOCK_ORDER_UUID}`,
      `/b2b/olaf/director-details/${MOCK_COMPANY_UUID}?orderId=${MOCK_ORDER_UUID}`,
    );
  });
});
