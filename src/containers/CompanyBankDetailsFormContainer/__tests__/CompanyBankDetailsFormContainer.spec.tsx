import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import React from 'react';
import {
  GetCompanyBankDetailsPageDataQuery,
  GetCompanyBankDetailsPageDataQueryVariables,
} from '../../../../generated/GetCompanyBankDetailsPageDataQuery';
import CompanyBankDetailsFormContainer from '../CompanyBankDetailsFormContainer';
import { GET_COMPANY_BANK_DETAILS, UPDATE_COMPANY_BANK_DETAILS } from '../gql';
import {
  UpdateBankDetailsMutation as Mutation,
  UpdateBankDetailsMutationVariables as MutationVariables,
} from '../../../../generated/UpdateBankDetailsMutation';
import { LimitedCompanyInputObject } from '../../../../generated/globalTypes';

let prepopulatedMockCalled = false;

const personUuid = 'ebdec701-6bc3-4f23-a636-cb4fbe419414';
const mocks: MockedResponse[] = [
  {
    request: {
      query: GET_COMPANY_BANK_DETAILS,
      variables: {
        uuid: personUuid,
      } as GetCompanyBankDetailsPageDataQueryVariables,
    },
    result: () => {
      prepopulatedMockCalled = true;
      return {
        data: {
          companyByUuid: {
            uuid: '7f5a4ed2-24a5-42ff-9acd-208db847d678',
            bankAccounts: [
              {
                uuid: '0b5847cc-d9aa-4588-8a5b-aef64307caff',
                accountName: 'Eternal account',
                accountNumber: '27272829',
                joinedAt: '2019-01-22',
                sortCode: '029387',
              },
            ],
          },
        } as GetCompanyBankDetailsPageDataQuery,
      }
    },
  },
];
describe('<CompanyBankDetailsFormContainer />', () => {
  it('should prepopulate the form with existing data', async () => {
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

    expect(screen.getByLabelText(/Bank Account Number/)).toHaveValue(
      '27272829',
    );
    expect(screen.getByDisplayValue(/02/)).toBeVisible();
    expect(screen.getByDisplayValue(/93/)).toBeVisible();
    expect(screen.getByDisplayValue(/87/)).toBeVisible();
    expect(screen.getByTestId(/joinedAtMonth/)).toHaveValue('1');
    expect(screen.getByTestId(/joinedAtYear/)).toHaveValue('2019');
  });

  it('should be render correctly', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CompanyBankDetailsFormContainer
          companyUuid={personUuid}
          onCompleted={jest.fn()}
        />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(prepopulatedMockCalled).toBeTruthy();
    });
    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });

  it('should post data to the server correctly', async () => {
    // ARRANGE
    let mutationCalled = false;
    const onCompletedMock = jest.fn();
    const mutationMocks: MockedResponse[] = [
      {
        request: {
          query: UPDATE_COMPANY_BANK_DETAILS,
          variables: {
            input: {
              uuid: 'ebdec701-6bc3-4f23-a636-cb4fbe419414',
              bankAccount:
              {
                accountName: 'Test',
                accountNumber: '27272829',
                sortCode: '029387',
                joinedAt: '2019-01-01',
              },
            },
          } as MutationVariables,
        },
        result: () => {
          mutationCalled = true;
          return {
            data: {
              updateLimitedCompany:
                {
                  uuid: '7f5a4ed2-24a5-42ff-9acd-208db847d678',
                  bankAccount:
                  {
                    accountName: 'Test',
                    accountNumber: '27272829',
                    sortCode: '029387',
                    joinedAt: '2019-01-22',
                  },
                } as LimitedCompanyInputObject,
            },
          };
        },
      },
    ];

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks.concat(...mutationMocks)}>
        <CompanyBankDetailsFormContainer
          companyUuid={personUuid}
          onCompleted={onCompletedMock}
        />
      </MockedProvider>,
    );

    await screen.findByTestId('companyBankDetails');

    fireEvent.change(screen.getByTestId('accountName'), {
      target: { value: 'Test' },
    });

    fireEvent.change(screen.getByTestId('accountNumber'), {
      target: { value: '27272829' },
    });

    fireEvent.change(screen.getByLabelText('Sort code first two digits'), {
      target: { value: '02' },
    });

    fireEvent.change(screen.getByLabelText('Sort code middle two digits'), {
      target: { value: '93' },
    });

    fireEvent.change(screen.getByLabelText('Sort code last two digits'), {
      target: { value: '87' },
    });

    fireEvent.change(screen.getByTestId('joinedAtMonth'), {
      target: { value: '1' },
    });

    fireEvent.change(screen.getByTestId('joinedAtYear'), {
      target: { value: '2019' },
    });

    fireEvent.click(screen.getByTestId('continue'));

    // ASSERT
    await waitFor(() => expect(mutationCalled).toBeTruthy());
    expect(onCompletedMock).toHaveBeenCalledTimes(1);
  });
});
