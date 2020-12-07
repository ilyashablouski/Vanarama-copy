import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import preloadAll from 'jest-next-dynamic';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  GetBankDetailsPageDataQuery,
  GetBankDetailsPageDataQueryVariables,
} from '../../../../generated/GetBankDetailsPageDataQuery';
import BankDetailsFormContainer from '../BankDetailsFormContainer';
import { GET_BANK_DETAILS_PAGE_DATA } from '../gql';

describe('<BankDetailsFormContainer />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should prepopulate the form with existing data', async () => {
    // ARRANGE
    const personUuid = '1927e308-18f8-4d95-aef3-57cc46459930';
    const mocks: MockedResponse[] = [
      {
        request: {
          query: GET_BANK_DETAILS_PAGE_DATA,
          variables: {
            uuid: personUuid,
          } as GetBankDetailsPageDataQueryVariables,
        },
        result: {
          data: {
            personByUuid: {
              uuid: personUuid,
              partyId: '1',
              bankAccounts: [
                {
                  __typename: 'BankAccountType',
                  uuid: '81afa3b3-54ef-4d2a-9bd0-dbb9b97ddb55',
                  accountName: 'Mr. A N Other',
                  accountNumber: '001122334',
                  bankName: 'Monzo Ltd.',
                  joinedAt: '2012-09-01',
                  sortCode: '998877',
                },
              ],
            },
          } as GetBankDetailsPageDataQuery,
        },
      },
    ];

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <BankDetailsFormContainer
          personUuid={personUuid}
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
    expect(screen.getByLabelText(/I agree to the/)).toBeChecked();
  });
});
