import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import {
  SearchCompaniesQuery,
  SearchCompaniesQueryVariables,
} from '../../../../../generated/SearchCompaniesQuery';
import { SEARCH_COMPANIES } from '../../../../components/CompanyDetailsForm/useSearchCompanies';
import { CompanyDetailsPage } from '../../../../pages/b2b/olaf/company-details/[uuid]';

jest.spyOn(window, 'alert').mockImplementation(() => {});
jest.mock('../../../../hooks/useMediaQuery');
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      pathname: '/b2b/olaf/company-details',
      query: {},
    };
  },
}));

describe('B2B Company Details page', () => {
  it('should allow the user to search for and select a company', async () => {
    // ARRANGE
    let searchExecuted = false;
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

    // Expect an alert show with the correct form values
    // NOTE: This is temporary until the BE integration is done
    await waitFor(() => expect(window.alert).toHaveBeenCalledTimes(1));
    const parsed = JSON.parse((window.alert as jest.Mock).mock.calls[0][0]);
    expect(parsed).toEqual({
      nature: 'Selling cars',
      tradingDifferent: false,
      email: 'info@autorama.co.uk',
      registeredAddress: {
        id:
          'Vanarama, Maylands Avenue, Hemel Hempstead, Hertfordshire, England, HP2 7DE',
      },
      telephone: '07777777777',
      company: {
        title: 'AUTORAMA UK LTD',
        companyNumber: '05137709',
        addressSnippet:
          'Vanarama, Maylands Avenue, Hemel Hempstead, Hertfordshire, England, HP2 7DE',
        dateOfCreation: '2004-05-01',
        companyStatus: 'active',
      },
    });
  });

  it('should allow the user to enter their company details manually', async () => {
    // ARRANGE
    const mocks: MockedResponse[] = [];

    // ACT
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CompanyDetailsPage />
      </MockedProvider>,
    );

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

    // Expect an alert show with the correct form values
    // NOTE: This is temporary until the BE integration is done
    await waitFor(() => expect(window.alert).toHaveBeenCalledTimes(1));
    const parsed = JSON.parse((window.alert as jest.Mock).mock.calls[0][0]);
    expect(parsed).toEqual({
      companyName: 'AUTORAMA UK LTD',
      companyNumber: '05137709',
      tradingSinceMonth: '5',
      tradingSinceYear: '2004',
      nature: 'Selling cars',
      tradingDifferent: false,
      email: 'info@autorama.co.uk',
      registeredAddress: {
        id:
          'Vanarama, Maylands Avenue, Hemel Hempstead, Hertfordshire, England, HP2 7DE',
      },
      telephone: '07777777777',
    });
  });

  it('should allow the user to select a trading address that is different from the registered address', async () => {
    // ARRANGE
    let searchExecuted = false;
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

    // Expect an alert show with the correct form values
    // NOTE: This is temporary until the BE integration is done
    await waitFor(() => expect(window.alert).toHaveBeenCalledTimes(1));
    const parsed = JSON.parse((window.alert as jest.Mock).mock.calls[0][0]);
    expect(parsed).toEqual({
      nature: 'Selling cars',
      tradingDifferent: true,
      email: 'info@autorama.co.uk',
      registeredAddress: {
        id:
          'Vanarama, Maylands Avenue, Hemel Hempstead, Hertfordshire, England, HP2 7DE',
      },
      tradingAddress: {
        id: 'Vanarama Trading Address, PO BOX 999',
      },
      telephone: '07777777777',
      company: {
        title: 'AUTORAMA UK LTD',
        companyNumber: '05137709',
        addressSnippet:
          'Vanarama, Maylands Avenue, Hemel Hempstead, Hertfordshire, England, HP2 7DE',
        dateOfCreation: '2004-05-01',
        companyStatus: 'active',
      },
    });
  });
});
