import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import {
  SearchCompaniesQuery,
  SearchCompaniesQueryVariables,
} from '../../../../../generated/SearchCompaniesQuery';
import { SEARCH_COMPANIES } from '../../../../components/CompanyDetailsForm/useSearchCompanies';
import {
  CompanyDetailsPage,
  SAVE_COMPANY_DETAILS,
} from '../../../../pages/b2b/olaf/company-details/[companyUuid]';
import {
  SaveCompanyDetailsMutationVariables,
  SaveCompanyDetailsMutation,
} from '../../../../../generated/SaveCompanyDetailsMutation';

jest.spyOn(window, 'alert').mockImplementation(() => {});
jest.mock('../../../../hooks/useMediaQuery');
jest.mock('../../../../gql/order');
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      pathname: '/b2b/olaf/company-details',
      query: {
        companyUuid: '39c19729-b980-46bd-8a8e-ed82705b3e01',
      },
    };
  },
}));

describe('B2B Company Details page', () => {
  it('should allow the user to search for and select a company', async () => {
    // ARRANGE
    let searchExecuted = false;
    let mutationCalled = false;
    const mocks: MockedResponse[] = [
      {
        request: {
          query: SEARCH_COMPANIES,
          variables: {
            searchTerm: 'Autora',
          } as SearchCompaniesQueryVariables,
        },
        result: () => {
          searchExecuted = true;
          return {
            data: {
              searchCompanies: {
                nodes: [
                  {
                    addressSnippet:
                      'The Long Lodge 265-269 Kingston Road, Wimbledon, London, England, SW19 3NW',
                    companyNumber: '08491180',
                    companyStatus: 'active',
                    dateOfCreation: '2013-04-01',
                    title: 'AUTORA LTD',
                  },
                  {
                    addressSnippet:
                      'Vanarama, Maylands Avenue, Hemel Hempstead, Hertfordshire, England, HP2 7DE',
                    companyNumber: '05137709',
                    companyStatus: 'active',
                    dateOfCreation: '2004-05-01',
                    title: 'AUTORAMA UK LTD',
                  },
                ],
              },
            } as SearchCompaniesQuery,
          };
        },
      },
      {
        request: {
          query: SAVE_COMPANY_DETAILS,
          variables: {
            input: {
              uuid: '39c19729-b980-46bd-8a8e-ed82705b3e01',
              legalName: 'AUTORAMA UK LTD',
              companyNumber: '05137709',
              tradingSince: '01-05-2004',
              addresses: [
                {
                  serviceId:
                    'Vanarama, Maylands Avenue, Hemel Hempstead, Hertfordshire, England, HP2 7DE',
                  kind: 'registered',
                },
              ],
              withTradingAddress: false,
              companyNature: 'Selling cars',
              emailAddress: {
                kind: 'Home',
                value: 'info@autorama.co.uk',
                primary: true,
              },
              telephoneNumbers: [{ value: '07777777777', primary: true }],
            },
          } as SaveCompanyDetailsMutationVariables,
        },
        result: () => {
          mutationCalled = true;
          return {
            data: {
              updateLimitedCompany: {
                uuid: '39c19729-b980-46bd-8a8e-ed82705b3e01',
              },
            } as SaveCompanyDetailsMutation,
          };
        },
      },
    ];

    // ACT
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CompanyDetailsPage />
      </MockedProvider>,
    );

    // Type a search term and wait for the results to load
    const companyLookup = screen.getByRole('textbox', {
      name: /company lookup/i,
    });

    fireEvent.focus(companyLookup);
    fireEvent.change(companyLookup, { target: { value: 'Autora' } });
    await waitFor(() => expect(searchExecuted).toBeTruthy());

    // Click the Autorama UK result
    fireEvent.click(screen.getByText(/AUTORAMA UK LTD/i));

    // Confirm selection of this company
    fireEvent.click(screen.getByRole('button', { name: /Yes And Proceed/i }));

    // Fill the rest of the form in
    fireEvent.change(
      screen.getByRole('textbox', { name: /Nature of Business/i }),
      { target: { value: 'Selling cars' } },
    );

    fireEvent.change(
      screen.getByRole('textbox', { name: /Business Telephone Number/i }),
      { target: { value: '07777777777' } },
    );

    fireEvent.change(screen.getByRole('textbox', { name: /Email Address/i }), {
      target: { value: 'info@autorama.co.uk' },
    });

    fireEvent.change(screen.getByTestId('company-details_registered-address'), {
      target: {
        value:
          'Vanarama, Maylands Avenue, Hemel Hempstead, Hertfordshire, England, HP2 7DE',
      },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    // ASSERT
    await waitFor(() => expect(mutationCalled).toBeTruthy());
  });

  it('should allow the user to enter their company details manually', async () => {
    // ARRANGE
    let mutationCalled = false;
    const mocks: MockedResponse[] = [
      {
        request: {
          query: SAVE_COMPANY_DETAILS,
          variables: {
            input: {
              uuid: '39c19729-b980-46bd-8a8e-ed82705b3e01',
              legalName: 'AUTORAMA UK LTD',
              companyNumber: '05137709',
              tradingSince: '01-05-2004',
              addresses: [
                {
                  serviceId:
                    'Vanarama, Maylands Avenue, Hemel Hempstead, Hertfordshire, England, HP2 7DE',
                  kind: 'registered',
                },
              ],
              withTradingAddress: false,
              companyNature: 'Selling cars',
              emailAddress: {
                kind: 'Home',
                value: 'info@autorama.co.uk',
                primary: true,
              },
              telephoneNumbers: [{ value: '07777777777', primary: true }],
            },
          } as SaveCompanyDetailsMutationVariables,
        },
        result: () => {
          mutationCalled = true;
          return {
            data: {
              updateLimitedCompany: {
                uuid: '39c19729-b980-46bd-8a8e-ed82705b3e01',
              },
            } as SaveCompanyDetailsMutation,
          };
        },
      },
    ];

    // ACT
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CompanyDetailsPage />
      </MockedProvider>,
    );

    // Choose to enter details manually
    fireEvent.click(
      screen.getAllByRole('button', {
        name: /I’d Rather Enter My Details Manually/i,
      })[0],
    );

    // Fill the rest of the form in manually
    fireEvent.change(screen.getByRole('textbox', { name: /Company Name/i }), {
      target: { value: 'AUTORAMA UK LTD' },
    });

    fireEvent.change(
      screen.getByRole('textbox', { name: /Company Registration Number/i }),
      { target: { value: '05137709' } },
    );

    fireEvent.change(screen.getByRole('combobox', { name: /Trading Since/i }), {
      target: { value: '5' },
    });

    fireEvent.change(screen.getByTestId('company-details_trading-since-year'), {
      target: { value: '2004' },
    });

    fireEvent.change(
      screen.getByRole('textbox', { name: /Nature of Business/i }),
      { target: { value: 'Selling cars' } },
    );

    fireEvent.change(
      screen.getByRole('textbox', { name: /Business Telephone Number/i }),
      { target: { value: '07777777777' } },
    );

    fireEvent.change(screen.getByRole('textbox', { name: /Email Address/i }), {
      target: { value: 'info@autorama.co.uk' },
    });

    fireEvent.change(screen.getByTestId('company-details_registered-address'), {
      target: {
        value:
          'Vanarama, Maylands Avenue, Hemel Hempstead, Hertfordshire, England, HP2 7DE',
      },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    // ASSERT
    await waitFor(() => expect(mutationCalled).toBeTruthy());
  });

  it('should allow the user to select a trading address that is different from the registered address', async () => {
    // ARRANGE
    let searchExecuted = false;
    let mutationCalled = false;
    const mocks: MockedResponse[] = [
      {
        request: {
          query: SEARCH_COMPANIES,
          variables: {
            searchTerm: 'Autora',
          } as SearchCompaniesQueryVariables,
        },
        result: () => {
          searchExecuted = true;
          return {
            data: {
              searchCompanies: {
                nodes: [
                  {
                    addressSnippet:
                      'The Long Lodge 265-269 Kingston Road, Wimbledon, London, England, SW19 3NW',
                    companyNumber: '08491180',
                    companyStatus: 'active',
                    dateOfCreation: '2013-04-01',
                    title: 'AUTORA LTD',
                  },
                  {
                    addressSnippet:
                      'Vanarama, Maylands Avenue, Hemel Hempstead, Hertfordshire, England, HP2 7DE',
                    companyNumber: '05137709',
                    companyStatus: 'active',
                    dateOfCreation: '2004-05-01',
                    title: 'AUTORAMA UK LTD',
                  },
                ],
              },
            } as SearchCompaniesQuery,
          };
        },
      },
      {
        request: {
          query: SAVE_COMPANY_DETAILS,
          variables: {
            input: {
              uuid: '39c19729-b980-46bd-8a8e-ed82705b3e01',
              legalName: 'AUTORAMA UK LTD',
              companyNumber: '05137709',
              tradingSince: '01-05-2004',
              addresses: [
                {
                  serviceId:
                    'Vanarama, Maylands Avenue, Hemel Hempstead, Hertfordshire, England, HP2 7DE',
                  kind: 'registered',
                },
                {
                  serviceId: 'Vanarama Trading Address, PO BOX 999',
                  kind: 'trading',
                },
              ],
              withTradingAddress: true,
              companyNature: 'Selling cars',
              emailAddress: {
                kind: 'Home',
                value: 'info@autorama.co.uk',
                primary: true,
              },
              telephoneNumbers: [{ value: '07777777777', primary: true }],
            },
          } as SaveCompanyDetailsMutationVariables,
        },
        result: () => {
          mutationCalled = true;
          return {
            data: {
              updateLimitedCompany: {
                uuid: '39c19729-b980-46bd-8a8e-ed82705b3e01',
              },
            } as SaveCompanyDetailsMutation,
          };
        },
      },
    ];

    // ACT
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CompanyDetailsPage />
      </MockedProvider>,
    );

    // Type a search term and wait for the results to load
    const companyLookup = screen.getByRole('textbox', {
      name: /company lookup/i,
    });

    fireEvent.focus(companyLookup);
    fireEvent.change(companyLookup, { target: { value: 'Autora' } });
    await waitFor(() => expect(searchExecuted).toBeTruthy());

    // Click the Autorama UK result
    fireEvent.click(screen.getByText(/AUTORAMA UK LTD/i));

    // Confirm selection of this company
    fireEvent.click(screen.getByRole('button', { name: /Yes And Proceed/i }));

    // Fill the rest of the form in
    fireEvent.change(
      screen.getByRole('textbox', { name: /Nature of Business/i }),
      { target: { value: 'Selling cars' } },
    );

    fireEvent.change(
      screen.getByRole('textbox', { name: /Business Telephone Number/i }),
      { target: { value: '07777777777' } },
    );

    fireEvent.change(screen.getByRole('textbox', { name: /Email Address/i }), {
      target: { value: 'info@autorama.co.uk' },
    });

    fireEvent.change(screen.getByTestId('company-details_registered-address'), {
      target: {
        value:
          'Vanarama, Maylands Avenue, Hemel Hempstead, Hertfordshire, England, HP2 7DE',
      },
    });

    // Choose that the trading address is different
    fireEvent.click(
      screen.getByRole('checkbox', {
        name: /Trading address is different to registered address/i,
      }),
    );

    fireEvent.change(screen.getByTestId('company-details_trading-address'), {
      target: {
        value: 'Vanarama Trading Address, PO BOX 999',
      },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    // ASSERT
    await waitFor(() => expect(mutationCalled).toBeTruthy());
  });
});
