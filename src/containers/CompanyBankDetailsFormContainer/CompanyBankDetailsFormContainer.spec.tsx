import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  GetBankDetailsPageDataQuery,
  GetBankDetailsPageDataQueryVariables,
} from '../../../generated/GetBankDetailsPageDataQuery';
import CompanyBankDetailsFormContainer from './CompanyBankDetailsFormContainer';
import { GET_COMPANY_BANK_DETAILS,/* UPDATE_BANK_DETAILS */ } from './gql';

describe('<CompanyBankDetailsFormContainer />', () => {
  it('should prepopulate the form with existing data', async () => {
    // ARRANGE
    const personUuid = 'ebdec701-6bc3-4f23-a636-cb4fbe419414';
    const mocks: MockedResponse[] = [
      {
        request: {
          query: GET_COMPANY_BANK_DETAILS,
          variables: {
            uuid: personUuid,
          } as GetBankDetailsPageDataQueryVariables,
        },
        result: {
          data: {
            companyByUuid: {
              uuid: "7f5a4ed2-24a5-42ff-9acd-208db847d678",
              bankAccounts: [
                {
                  uuid: "0b5847cc-d9aa-4588-8a5b-aef64307caff",
                  accountName: "Eternal account",
                  accountNumber: "27272829",
                  joinedAt: "2019-01-22",
                  sortCode: "029387"
                }
              ]
            }
          } //as GetBankDetailsPageDataQuery,
        },
      },
    ];

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <CompanyBankDetailsFormContainer
          companyUuid={personUuid}
          onCompleted={jest.fn()}
        />
      </MockedProvider>,
    );

    // Wait for the initial query to resolve
    await screen.findByTestId('bankDetails');
    expect(screen.getByLabelText(/Name on the Account/)).toHaveValue(
      'Mr. A N Other',
    );

    expect(screen.getByLabelText(/Account Number/)).toHaveValue('001122334');
    expect(screen.getByDisplayValue(/99/)).toBeVisible();
    expect(screen.getByDisplayValue(/88/)).toBeVisible();
    expect(screen.getByDisplayValue(/77/)).toBeVisible();
    expect(screen.getByLabelText(/Bank Name/)).toHaveValue('Monzo Ltd.');
    expect(screen.getByTestId(/accountOpenSinceMonth/)).toHaveValue('9');
    expect(screen.getByTestId(/accountOpenSinceYear/)).toHaveValue('2012');
    expect(
      screen.getByLabelText(/I have read and understood the above./),
    ).toBeChecked();

    expect(
      screen.getByLabelText(
        /I can afford the monthly rentals without creating undue financial hardship./,
      ),
    ).toBeChecked();

    expect(screen.getByTestId(/checkCreditHistory/)).toBeChecked();
    expect(
      screen.getByLabelText(/I agree to the Terms and conditions./),
    ).toBeChecked();
  });
});
