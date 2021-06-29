import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import preloadAll from 'jest-next-dynamic';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import {
  SaveCompanyDetailsMutation,
  SaveCompanyDetailsMutationVariables,
} from '../../../../../generated/SaveCompanyDetailsMutation';
import {
  SearchCompaniesQuery,
  SearchCompaniesQueryVariables,
} from '../../../../../generated/SearchCompaniesQuery';
import { SEARCH_COMPANIES } from '../../../../components/CompanyDetailsForm/useSearchCompanies';
import { CompanyDetailsPage } from '../../../../pages/b2b/olaf/company-details';
import { SAVE_COMPANY_DETAILS } from '../../../../containers/CompanyDetailsFormContainer/CompanyDetailsFormContainer';
import { makeGetCreditApplicationMock } from '../../../../gql/creditApplication';
import { CREATE_UPDATE_ORDER_MUTATION } from '../../../../gql/order';
import {
  makeSicCodesMock,
  makeCompanyProfileMock,
} from '../../../../containers/CompanyDetailsFormContainer/gql';
import { makeAddressResponseMock } from '../../../../hooks/useLoqate/utils';
import useLoqate from '../../../../hooks/useLoqate';

const MOCK_PERSON_UUID = '39c19729-b980-46bd-8a8e-ed82705b3e01';
const MOCK_ORDER_ID = '11111111-b980-46bd-8a8e-ed82705b3e01';
const MOCK_COMPANY_UUID = '11111111-2222-2222-2222-ed82705b3e01';

let companyProfileCalled = false;
let getSicCodesCalled = false;

jest.mock('../../../../hooks/useLoqate');
(useLoqate as jest.Mock).mockReturnValue(makeAddressResponseMock());
jest.mock('../../../../layouts/OLAFLayout/OLAFLayout');
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/b2b/olaf/company-details',
    query: {
      orderId: MOCK_ORDER_ID,
      personUuid: MOCK_PERSON_UUID,
      companyUuid: MOCK_COMPANY_UUID,
    },
  }),
}));

const getCreditApplication = makeGetCreditApplicationMock(MOCK_ORDER_ID);

async function waitForLoadingFinish() {
  await waitFor(() =>
    expect(screen.getByTestId('company-details_heading')).toBeInTheDocument(),
  );
}

function typeIntoAddressField(testId: string, value: string) {
  const input = screen.getByTestId(testId);
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value } });
}

function typeIntoSearchField(value: string) {
  const field = screen.getByRole('textbox', { name: /Company Lookup/i });
  fireEvent.focus(field);
  fireEvent.change(field, { target: { value } });
}

function typeIntoNatureField(value: string) {
  const field = screen.getByTestId('company-details_nature');
  fireEvent.focus(field);
  fireEvent.change(field, { target: { value } });
}

const sicDataMocks = [
  makeCompanyProfileMock(() => {
    companyProfileCalled = true;
  }),
  makeSicCodesMock(() => {
    getSicCodesCalled = true;
  }),
];

describe('B2B Company Details page', () => {
  beforeEach(async () => {
    await preloadAll();
    companyProfileCalled = false;
    getSicCodesCalled = false;
  });
  it.skip('should allow the user to search for and select a company', async () => {
    // ARRANGE
    const queryMock = jest.fn();
    const mutationMock = jest.fn();
    const mocks: MockedResponse[] = [
      getCreditApplication,
      ...sicDataMocks,
      {
        request: {
          query: SEARCH_COMPANIES,
          variables: {
            searchTerm: '05137709',
          } as SearchCompaniesQueryVariables,
        },
        result: queryMock.mockImplementation(() => ({
          data: {
            searchCompanies: {
              nodes: [
                {
                  title: 'AUTORAMA UK LTD',
                  companyNumber: '05137709',
                  addressSnippet:
                    'Vanarama, Maylands Avenue, Hemel Hempstead, Hertfordshire, England, HP2 7DE',
                  dateOfCreation: '2004-05-25',
                  companyStatus: 'active',
                },
              ],
            },
          } as SearchCompaniesQuery,
        })),
      },
      {
        request: {
          query: SAVE_COMPANY_DETAILS,
          variables: {
            input: {
              person: { uuid: '' },
              uuid: MOCK_COMPANY_UUID,
              companyType: 'Limited',
              legalName: 'AUTORAMA UK LTD',
              companyNumber: '05137709',
              tradingSince: '01-05-2004',
              addresses: [
                {
                  kind: 'registered',
                  serviceId: 'GB|RM|A|54725860',
                },
              ],
              withTradingAddress: false,
              companyNature: 'Information technology consultancy activities',
              emailAddress: {
                kind: 'Home',
                value: 'info@autorama.co.uk',
                primary: true,
              },
              telephoneNumbers: [
                {
                  value: '07777777777',
                  primary: true,
                },
              ],
            },
          } as SaveCompanyDetailsMutationVariables,
        },
        result: mutationMock.mockImplementation(() => ({
          data: {
            createUpdateLimitedCompany: {
              uuid: MOCK_PERSON_UUID,
              partyUuid: 'partyUuid',
              addresses: [
                {
                  lineOne: 'B001',
                  lineTwo: 'Purbeck House',
                  lineThree: '5-7 Oxford Road',
                  city: 'Bournemouth',
                  county: null,
                  postcode: 'BH8 8ES',
                  country: 'GB',
                  startedOn: null,
                  endedOn: null,
                  propertyStatus: null,
                  serviceId: 'GB|RM|A|54725860',
                  kind: 'registered',
                },
              ],
            },
          } as SaveCompanyDetailsMutation,
        })),
      },
    ];

    // ACT
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CompanyDetailsPage />
      </MockedProvider>,
    );

    await waitForLoadingFinish();
    // Type a search term and wait for the results to load
    typeIntoSearchField('05137709');
    await waitFor(() => expect(queryMock).toHaveBeenCalledTimes(1));

    // Click the Autorama UK result
    fireEvent.click(screen.getByText(/AUTORAMA UK LTD/i));

    // Confirm selection of this company
    fireEvent.click(screen.getByRole('button', { name: /Save And Proceed/i }));

    // Fill the rest of the form in
    await waitFor(() => expect(companyProfileCalled).toBeTruthy());

    typeIntoNatureField('62020');
    await waitFor(() => expect(getSicCodesCalled).toBeTruthy());
    fireEvent.mouseDown(screen.getByText(/^62020/));

    typeIntoAddressField('company-details_registered-address', 'GB|001');
    fireEvent.mouseDown(screen.getByText(/^B001, Purbeck House 5-7/));

    fireEvent.change(
      screen.getByRole('textbox', { name: /Business Telephone Number/i }),
      { target: { value: '07777777777' } },
    );

    fireEvent.change(screen.getByRole('textbox', { name: /Email Address/i }), {
      target: { value: 'info@autorama.co.uk' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    // ASSERT
    await waitFor(() => expect(mutationMock).toHaveBeenCalledTimes(1));
  });

  it.skip('should allow the user to enter their company details manually', async () => {
    // ARRANGE
    const mutationMock = jest.fn();
    const mocks: MockedResponse[] = [
      getCreditApplication,
      ...sicDataMocks,
      {
        request: {
          query: SAVE_COMPANY_DETAILS,
          variables: {
            input: {
              person: {
                uuid: '',
              },
              uuid: MOCK_COMPANY_UUID,
              companyType: 'Limited',
              legalName: 'AUTORAMA UK LTD',
              companyNumber: '05137709',
              tradingSince: '01-05-2004',
              addresses: [
                {
                  kind: 'registered',
                  serviceId: 'GB|RM|A|54725860',
                },
              ],
              withTradingAddress: false,
              companyNature: 'Information technology consultancy activities',
              emailAddress: {
                kind: 'Home',
                value: 'info@autorama.co.uk',
                primary: true,
              },
              telephoneNumbers: [
                {
                  value: '07777777777',
                  primary: true,
                },
              ],
            },
          } as SaveCompanyDetailsMutationVariables,
        },
        result: mutationMock.mockImplementation(() => ({
          data: {
            createUpdateLimitedCompany: {
              uuid: MOCK_PERSON_UUID,
              partyUuid: 'partyUuid',
              addresses: [
                {
                  lineOne: 'B001',
                  lineTwo: 'Purbeck House',
                  lineThree: '5-7 Oxford Road',
                  city: 'Bournemouth',
                  county: null,
                  postcode: 'BH8 8ES',
                  country: 'GB',
                  startedOn: null,
                  endedOn: null,
                  propertyStatus: null,
                  serviceId: 'GB|RM|A|54725860',
                  kind: 'registered',
                },
              ],
            },
          } as SaveCompanyDetailsMutation,
        })),
      },
    ];

    // ACT
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CompanyDetailsPage />
      </MockedProvider>,
    );

    await waitForLoadingFinish();
    // Choose to enter details manually
    fireEvent.click(
      screen.getByRole('button', {
        name: /I’d Rather Enter My Details Manually/i,
      }),
    );

    // Fill the rest of the form in manually
    fireEvent.change(screen.getByRole('textbox', { name: /Company Name/i }), {
      target: { value: 'AUTORAMA UK LTD' },
    });

    fireEvent.change(
      screen.getByRole('textbox', { name: /Company Registration Number/i }),
      { target: { value: '05137709' } },
    );

    fireEvent.change(
      screen.getByTestId('company-details_trading-since-month'),
      {
        target: { value: '5' },
      },
    );

    fireEvent.change(screen.getByTestId('company-details_trading-since-year'), {
      target: { value: '2004' },
    });

    // Fill the rest of the form in
    typeIntoNatureField('62020');
    await waitFor(() => expect(getSicCodesCalled).toBeTruthy());
    fireEvent.mouseDown(screen.getByText(/^62020/));

    typeIntoAddressField('company-details_registered-address', 'GB|001');
    fireEvent.mouseDown(screen.getByText(/^B001, Purbeck House 5-7/));

    fireEvent.change(
      screen.getByRole('textbox', { name: /Business Telephone Number/i }),
      { target: { value: '07777777777' } },
    );

    fireEvent.change(screen.getByRole('textbox', { name: /Email Address/i }), {
      target: { value: 'info@autorama.co.uk' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    // ASSERT
    await waitFor(() => expect(mutationMock).toHaveBeenCalledTimes(1));
  });

  it.skip('should allow the user to select a trading address that is different from the registered address', async () => {
    // ARRANGE
    const queryMock = jest.fn();
    const mutationMock = jest.fn();
    const mocks: MockedResponse[] = [
      getCreditApplication,
      ...sicDataMocks,
      {
        request: {
          query: SEARCH_COMPANIES,
          variables: {
            searchTerm: '05137709',
          } as SearchCompaniesQueryVariables,
        },
        result: queryMock.mockImplementation(() => ({
          data: {
            searchCompanies: {
              nodes: [
                {
                  title: 'AUTORAMA UK LTD',
                  companyNumber: '05137709',
                  addressSnippet:
                    'Vanarama, Maylands Avenue, Hemel Hempstead, Hertfordshire, England, HP2 7DE',
                  dateOfCreation: '2004-05-25',
                  companyStatus: 'active',
                },
              ],
            },
          } as SearchCompaniesQuery,
        })),
      },
      {
        request: {
          query: SAVE_COMPANY_DETAILS,
          variables: {
            input: {
              person: { uuid: '' },
              uuid: MOCK_COMPANY_UUID,
              companyType: 'Limited',
              legalName: 'AUTORAMA UK LTD',
              companyNumber: '05137709',
              tradingSince: '01-05-2004',
              addresses: [
                {
                  kind: 'registered',
                  serviceId: 'GB|RM|A|54725860',
                },
                {
                  kind: 'trading',
                  serviceId: 'GB|RM|A|54725861',
                },
              ],
              withTradingAddress: true,
              companyNature: 'Information technology consultancy activities',
              emailAddress: {
                kind: 'Home',
                value: 'info@autorama.co.uk',
                primary: true,
              },
              telephoneNumbers: [
                {
                  value: '07777777777',
                  primary: true,
                },
              ],
            },
          } as SaveCompanyDetailsMutationVariables,
        },
        result: mutationMock.mockImplementation(() => ({
          data: {
            createUpdateLimitedCompany: {
              uuid: MOCK_PERSON_UUID,
              partyUuid: 'partyUuid',
              addresses: [
                {
                  lineOne: 'B002',
                  lineTwo: 'Purbeck House',
                  lineThree: '5-7 Oxford Road',
                  city: 'Bournemouth',
                  county: null,
                  postcode: 'BH8 8ES',
                  country: 'GB',
                  startedOn: null,
                  endedOn: null,
                  propertyStatus: null,
                  serviceId: 'GB|RM|A|54725861',
                  kind: 'trading',
                },
                {
                  lineOne: 'B001',
                  lineTwo: 'Purbeck House',
                  lineThree: '5-7 Oxford Road',
                  city: 'Bournemouth',
                  county: null,
                  postcode: 'BH8 8ES',
                  country: 'GB',
                  startedOn: null,
                  endedOn: null,
                  propertyStatus: null,
                  serviceId: 'GB|RM|A|54725860',
                  kind: 'registered',
                },
              ],
            },
          } as SaveCompanyDetailsMutation,
        })),
      },
      {
        request: {
          query: CREATE_UPDATE_ORDER_MUTATION,
          variables: {
            input: {
              uuid: MOCK_COMPANY_UUID,
              partyUuid: 'partyUuid',
              leaseType: 'BUSINESS',
              lineItems: [],
            },
          },
        },
        result: {
          data: {
            createUpdateOrder: {
              uuid: 'uuid',
              createdAt: 'createdAt',
              salesChannel: '0',
              status: 'status',
            },
          },
        },
      },
    ];

    // ACT
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CompanyDetailsPage />
      </MockedProvider>,
    );

    await waitForLoadingFinish();
    // Type a search term and wait for the results to load
    typeIntoSearchField('05137709');
    await waitFor(() => expect(queryMock).toHaveBeenCalledTimes(1));

    // Click the Autorama UK result
    fireEvent.click(screen.getByText(/AUTORAMA UK LTD/i));

    // Confirm selection of this company
    fireEvent.click(screen.getByRole('button', { name: /Save And Proceed/i }));

    // Fill the rest of the form in
    await waitFor(() => expect(companyProfileCalled).toBeTruthy());

    typeIntoNatureField('62020');
    await waitFor(() => expect(getSicCodesCalled).toBeTruthy());
    fireEvent.click(screen.getByText('62020'));

    typeIntoAddressField('company-details_registered-address', 'GB|001');
    fireEvent.mouseDown(screen.getByText(/^B001, Purbeck House 5-7/));

    // Choose that the trading address is different
    fireEvent.click(
      screen.getByRole('checkbox', {
        name: /Trading address is different to registered address/i,
      }),
    );

    typeIntoAddressField('company-details_trading-address', 'GB|002');
    fireEvent.mouseDown(screen.getByText(/^B002, Purbeck House 5-7/));

    fireEvent.change(
      screen.getByRole('textbox', { name: /Business Telephone Number/i }),
      { target: { value: '07777777777' } },
    );

    fireEvent.change(screen.getByRole('textbox', { name: /Email Address/i }), {
      target: { value: 'info@autorama.co.uk' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    // ASSERT
    await waitFor(() => expect(mutationMock).toHaveBeenCalledTimes(1));
  });

  it('should show a validation message if the user selects a company that is not active', async () => {
    // ARRANGE
    const inactiveQueryMock = jest.fn();
    const activeQueryMock = jest.fn();
    const mocks: MockedResponse[] = [
      ...sicDataMocks,
      {
        request: {
          query: SEARCH_COMPANIES,
          variables: {
            searchTerm: 'INACTIVE LTD',
          } as SearchCompaniesQueryVariables,
        },
        result: inactiveQueryMock.mockImplementation(() => ({
          data: {
            searchCompanies: {
              nodes: [
                {
                  addressSnippet: '123 Fake Street',
                  companyNumber: '05137709',
                  companyStatus: 'dissolved',
                  dateOfCreation: '2013-04-01',
                  title: 'INACTIVE LTD',
                },
              ],
            },
          } as SearchCompaniesQuery,
        })),
      },
      {
        request: {
          query: SEARCH_COMPANIES,
          variables: {
            searchTerm: 'ACTIVE LTD',
          } as SearchCompaniesQueryVariables,
        },
        result: activeQueryMock.mockImplementation(() => ({
          data: {
            searchCompanies: {
              nodes: [
                {
                  addressSnippet: '123 Fake Street',
                  companyNumber: '05137709',
                  companyStatus: 'active',
                  dateOfCreation: '2013-04-01',
                  title: 'ACTIVE LTD',
                },
              ],
            },
          } as SearchCompaniesQuery,
        })),
      },
      getCreditApplication,
    ];

    // ACT
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CompanyDetailsPage />
      </MockedProvider>,
    );

    await waitForLoadingFinish();

    // Type a search term and wait for the results to load
    typeIntoSearchField('INACTIVE LTD');
    await waitFor(() => expect(inactiveQueryMock).toHaveBeenCalledTimes(1));
    const field = screen.getByRole('textbox', { name: /Company Lookup/i });
    fireEvent.focus(field);
    // Click the inactive company result
    fireEvent.click(screen.getByText(/INACTIVE LTD/i));

    await screen.findByText(
      /This company seems not to be trading actively. Please try a new search/i,
    );

    // Search again
    fireEvent.click(screen.getByRole('button', { name: /Search Again/i }));

    // Type a search term and wait for the results to load
    typeIntoSearchField('ACTIVE LTD');
    await waitFor(() => expect(activeQueryMock).toHaveBeenCalledTimes(1));

    // Click the active company result
    fireEvent.click(screen.getByText(/ACTIVE LTD/i));

    await waitFor(() =>
      expect(
        screen.queryByText(
          /This company seems not to be trading actively. Please try a new search/i,
        ),
      ).not.toBeInTheDocument(),
    );
  });
});
