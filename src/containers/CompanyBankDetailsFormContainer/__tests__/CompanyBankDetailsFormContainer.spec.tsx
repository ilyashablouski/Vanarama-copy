import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import React from 'react';
import {
  GetCompanyBankDetailsPageDataQuery,
  GetCompanyBankDetailsPageDataQueryVariables,
} from '../../../../generated/GetCompanyBankDetailsPageDataQuery';
import CompanyBankDetailsFormContainer from '../CompanyBankDetailsFormContainer';
import { GET_COMPANY_BANK_DETAILS, UPDATE_COMPANY_BANK_DETAILS } from '../gql';
import { UpdateBankDetailsMutationVariables as MutationVariables } from '../../../../generated/UpdateBankDetailsMutation';
import { LimitedCompanyInputObject } from '../../../../generated/globalTypes';
import { CREATE_UPDATE_CREDIT_APPLICATION } from '../../../gql/creditApplication';

let prepopulatedMockCalled = false;

const companyUuid = '7f5a4ed2-24a5-42ff-9acd-208db847d678';
const orderUuid = '00000000-24a5-42ff-9acd-00000000';
const mocks: MockedResponse[] = [
  {
    request: {
      query: GET_COMPANY_BANK_DETAILS,
      variables: {
        uuid: companyUuid,
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
                __typename: 'BankAccountType',
                uuid: '0b5847cc-d9aa-4588-8a5b-aef64307caff',
                accountName: 'Eternal account1',
                accountNumber: '27272829',
                joinedAt: '2019-01-22',
                sortCode: '029387',
                updatedAt: '2020-07-16T10:38:26.416+00:00',
              },
              {
                __typename: 'BankAccountType',
                uuid: '3f461056-5eb1-44e6-a953-13975b74adea',
                accountName: 'Eternal account',
                accountNumber: '27272829',
                joinedAt: '2019-01-01',
                sortCode: '029387',
                updatedAt: '2020-07-20T12:14:59.326+00:00',
              },
              {
                __typename: 'BankAccountType',
                uuid: 'e0805856-fc03-4487-a457-f577ca6ff78a',
                accountName: 'Eternal account',
                accountNumber: '27272820',
                joinedAt: '2019-01-01',
                sortCode: '029387',
                updatedAt: '2020-07-20T12:19:11.456+00:00',
              },
              {
                __typename: 'BankAccountType',
                uuid: 'c192b4ba-5426-4f26-a998-b2fc50f804cd',
                accountName: 'Eternal account',
                accountNumber: '07272820',
                joinedAt: '2019-01-01',
                sortCode: '029387',
                updatedAt: '2020-07-20T12:23:21.238+00:00',
              },
              {
                __typename: 'BankAccountType',
                uuid: '0aa553d4-c7cc-47b7-ad6f-45f3ce6c1f61',
                accountName: 'Eternal account',
                accountNumber: '17272820',
                joinedAt: '2019-01-01',
                sortCode: '029387',
                updatedAt: '2020-07-20T12:29:03.972+00:00',
              },
              {
                __typename: 'BankAccountType',
                uuid: 'fa7e2a1a-f623-43c7-8ce4-eb2f5d511a51',
                accountName: 'Eternal account',
                accountNumber: '37272820',
                joinedAt: '2019-01-01',
                sortCode: '029387',
                updatedAt: '2020-07-20T12:30:55.825+00:00',
              },
              {
                __typename: 'BankAccountType',
                uuid: '1ab66023-7566-42c1-8e6b-011ed4000ed0',
                accountName: 'Eternal account',
                accountNumber: '67272820',
                joinedAt: '2020-01-01',
                sortCode: '019387',
                updatedAt: '2020-07-21T14:29:09.623+00:00',
              },
            ],
          },
        } as GetCompanyBankDetailsPageDataQuery,
      };
    },
  },
];
describe('<CompanyBankDetailsFormContainer />', () => {
  it('should prepopulate the form with existing data', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <CompanyBankDetailsFormContainer
          orderUuid={orderUuid}
          companyUuid={companyUuid}
          onCompleted={jest.fn()}
          isEdited={false}
        />
      </MockedProvider>,
    );

    // Wait for the initial query to resolve
    await screen.findByTestId('companyBankDetails');
    expect(screen.getByTestId(/accountName/)).toHaveValue('Eternal account');
    expect(screen.getByTestId(/accountNumber/)).toHaveValue('67272820');
    expect(screen.getByDisplayValue(/01/)).toBeVisible();
    expect(screen.getByDisplayValue(/93/)).toBeVisible();
    expect(screen.getByDisplayValue(/87/)).toBeVisible();
    expect(screen.getByTestId(/joinedAtMonth/)).toHaveValue('1');
    expect(screen.getByTestId(/joinedAtYear/)).toHaveValue('2020');
  });

  it('should be render correctly', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CompanyBankDetailsFormContainer
          orderUuid={orderUuid}
          companyUuid={companyUuid}
          onCompleted={jest.fn()}
          isEdited={false}
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
              uuid: '7f5a4ed2-24a5-42ff-9acd-208db847d678',
              bankAccount: {
                uuid: '1ab66023-7566-42c1-8e6b-011ed4000ed0',
                accountName: 'Test',
                accountNumber: '27272829',
                sortCode: '019387',
                joinedAt: '2019-01-01',
              },
            },
          } as MutationVariables,
        },
        result: () => {
          mutationCalled = true;
          return {
            data: {
              createUpdateLimitedCompany: {
                uuid: '7f5a4ed2-24a5-42ff-9acd-208db847d678',
                bankAccount: {
                  uuid: '1ab66023-7566-42c1-8e6b-011ed4000ed0',
                  accountName: 'Test',
                  accountNumber: '27272829',
                  sortCode: '019387',
                  joinedAt: '2019-01-01',
                },
              } as LimitedCompanyInputObject,
            },
          };
        },
      },
      {
        request: {
          query: CREATE_UPDATE_CREDIT_APPLICATION,
          variables: {
            input: {
              orderUuid: '00000000-24a5-42ff-9acd-00000000',
            },
          },
        },
        result: {
          data: {
            createUpdateCreditApplication: {
              addresses: [],
              bankAccounts: [],
              employmentHistories: null,
              incomeAndExpenses: null,
              lineItem: {
                uuid: 'test uuid',
                quantity: 1,
                status: 'test status',
                productId: 'test productId',
                productType: 'test productType',
                vehicleProduct: {
                  derivativeCapId: 'test derivativeCapId',
                  description: 'test description',
                  vsku: 'test vsku',
                  term: 'test term',
                  annualMileage: 123,
                  monthlyPayment: 1232,
                  depositMonths: 12,
                  funder: 'test funder',
                },
              },
              leadManagerProposalId: 'test leadManagerProposalId',
              createdAt: 'test createdAt',
              emailAddresses: [],
              partyDetails: null,
              status: 'test status',
              telephoneNumbers: [],
              updatedAt: 'test updatedAt',
              uuid: 'test uuid',
            },
          },
        },
      },
    ];

    // ACT
    render(
      <MockedProvider
        addTypename={false}
        mocks={mocks.concat(...mutationMocks)}
      >
        <CompanyBankDetailsFormContainer
          orderUuid={orderUuid}
          companyUuid={companyUuid}
          onCompleted={onCompletedMock}
          isEdited={false}
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
      target: { value: '01' },
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
