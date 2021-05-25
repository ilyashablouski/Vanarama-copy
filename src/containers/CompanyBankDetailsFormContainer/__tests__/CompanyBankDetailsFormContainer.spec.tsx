import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import preloadAll from 'jest-next-dynamic';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import React from 'react';
import CompanyBankDetailsFormContainer from '../CompanyBankDetailsFormContainer';
import { UPDATE_LIMITED_BANK_DETAILS } from '../gql';
import { UpdateLimitedBankDetailsMutationVariables as MutationVariables } from '../../../../generated/UpdateLimitedBankDetailsMutation';
import { LimitedCompanyInputObject } from '../../../../generated/globalTypes';
import {
  makeUpdateCreditApplicationMock,
  makeGetCreditApplicationMock,
} from '../../../gql/creditApplication';

const companyUuid = '7f5a4ed2-24a5-42ff-9acd-208db847d678';
const orderUuid = '00000000-24a5-42ff-9acd-00000000';

const getCreditApplication = makeGetCreditApplicationMock(orderUuid);

describe('<CompanyBankDetailsFormContainer />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should prepopulate the form with existing data', async () => {
    // ACT
    render(
      <MockedProvider addTypename={false} mocks={[getCreditApplication]}>
        <CompanyBankDetailsFormContainer
          orderUuid={orderUuid}
          companyUuid={companyUuid}
          onCompleted={jest.fn()}
          onError={jest.fn()}
          isEdited={false}
          isSoleTrader={false}
        />
      </MockedProvider>,
    );

    // Wait for the initial query to resolve
    // await screen.findByTestId('companyBankDetails');
    await waitFor(() => expect(getCreditApplication.result).toHaveBeenCalled());
    expect(screen.getByTestId(/accountName/)).toHaveValue('Eternal account');
    expect(screen.getByTestId(/accountNumber/)).toHaveValue('67272820');
    expect(screen.getByDisplayValue(/01/)).toBeVisible();
    expect(screen.getByDisplayValue(/93/)).toBeVisible();
    expect(screen.getByDisplayValue(/87/)).toBeVisible();
    expect(screen.getByTestId(/joinedAtMonth/)).toHaveValue('1');
    expect(screen.getByTestId(/joinedAtYear/)).toHaveValue('2020');
  });

  // TODO: should be investigate why Mock Provider can't resolve mocked queries
  it.skip('should be render correctly', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider mocks={[getCreditApplication]} addTypename={false}>
        <CompanyBankDetailsFormContainer
          orderUuid={orderUuid}
          companyUuid={companyUuid}
          onCompleted={jest.fn()}
          onError={jest.fn()}
          isEdited={false}
          isSoleTrader={false}
        />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(getCreditApplication.result).toHaveBeenCalled();
    });
    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });

  it.skip('should post data to the server correctly', async () => {
    // ARRANGE
    const onCompletedMock = jest.fn();
    const mutationMock = jest.fn();

    const mutationMocks: MockedResponse[] = [
      getCreditApplication,
      {
        request: {
          query: UPDATE_LIMITED_BANK_DETAILS,
          variables: {
            input: {
              uuid: '7f5a4ed2-24a5-42ff-9acd-208db847d678',
              bankAccount: {
                uuid: null,
                accountName: 'Test',
                accountNumber: '27272829',
                sortCode: '019387',
                joinedAt: '2019-01-01',
              },
            },
          } as MutationVariables,
        },
        result: mutationMock.mockImplementation(() => ({
          data: {
            createUpdateLimitedCompany: {
              uuid: '7f5a4ed2-24a5-42ff-9acd-208db847d678',
              bankAccountsV2: [
                {
                  uuid: '1ab66023-7566-42c1-8e6b-011ed4000ed0',
                  accountName: 'Test',
                  accountNumber: '27272829',
                  sortCode: '019387',
                  joinedAt: '2019-01-01',
                },
              ],
            } as LimitedCompanyInputObject,
          },
        })),
      },
      makeUpdateCreditApplicationMock({
        orderUuid: '00000000-24a5-42ff-9acd-00000000',
        status: 'status',
        addresses: [],
        bankAccountsV2: [
          {
            uuid: '1ab66023-7566-42c1-8e6b-011ed4000ed0',
            accountName: 'Test',
            accountNumber: '27272829',
            joinedAtMonth: '1',
            joinedAtYear: '2019',
            sortCode: '019387',
          },
        ],
        aboutDetails: 'aboutDetails',
        employmentHistories: 'employmentHistories',
        incomeAndExpenses: 'incomeAndExpenses',
        leadManagerProposalId: 'leadManagerProposalId',
        companyDetails: {},
        vatDetails: 'vatDetails',
        directorsDetails: 'directorsDetails',
        soleTraderDetails: {},
      }),
    ];

    // ACT
    render(
      <MockedProvider
        addTypename={false}
        mocks={[getCreditApplication, ...mutationMocks]}
      >
        <CompanyBankDetailsFormContainer
          orderUuid={orderUuid}
          companyUuid={companyUuid}
          onCompleted={onCompletedMock}
          onError={jest.fn()}
          isEdited={false}
          isSoleTrader={false}
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
    await waitFor(() => expect(mutationMock).toHaveBeenCalled());
    await waitFor(() => expect(onCompletedMock).toHaveBeenCalledTimes(1));
  });
});
