import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  GetCompanyBankDetailsPageDataQuery,
  GetCompanyBankDetailsPageDataQueryVariables,
} from '../../../generated/GetCompanyBankDetailsPageDataQuery';
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
          } as GetCompanyBankDetailsPageDataQueryVariables,
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
          } as GetCompanyBankDetailsPageDataQuery,
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
    await screen.findByTestId('companyBankDetails');
    expect(screen.getByLabelText(/Bank Account Name/)).toHaveValue(
      'Eternal account',
    );

    expect(screen.getByLabelText(/Bank Account Number/)).toHaveValue('27272829');
    expect(screen.getByDisplayValue(/02/)).toBeVisible();
    expect(screen.getByDisplayValue(/93/)).toBeVisible();
    expect(screen.getByDisplayValue(/87/)).toBeVisible();
    expect(screen.getByTestId(/joinedAtMonth/)).toHaveValue('1');
    expect(screen.getByTestId(/joinedAtYear/)).toHaveValue('2019');
  });
});