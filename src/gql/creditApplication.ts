import { useQuery, gql, useMutation } from '@apollo/client';
import { MockedResponse } from '@apollo/client/testing';
import {
  CreateUpdateCreditApplication,
  CreateUpdateCreditApplicationVariables,
} from '../../generated/CreateUpdateCreditApplication';
import { CreditApplicationInputObject } from '../../generated/globalTypes';
import {
  GetCreditApplicationByOrderUuid as Query,
  GetCreditApplicationByOrderUuidVariables as QueryVariables,
} from '../../generated/GetCreditApplicationByOrderUuid';

export const GET_CREDIT_APPLICATION_BY_ORDER_UUID_DATA = gql`
  query GetCreditApplicationByOrderUuid($id: ID!) {
    creditApplicationByOrderUuid(orderUuid: $id) {
      addresses
      bankAccounts
      companyDetails
      vatDetails
      directorsDetails
      employmentHistories
      incomeAndExpenses
      lineItem {
        uuid
        quantity
        status
        productId
        productType
        vehicleProduct {
          derivativeCapId
          description
          vsku
          term
          annualMileage
          monthlyPayment
          depositMonths
          funderId
          funderData
        }
      }
      leadManagerProposalId
      createdAt
      emailAddresses
      partyDetails
      status
      telephoneNumbers
      updatedAt
      uuid
    }
  }
`;

export function useGetCreditApplicationByOrderUuid(id: string) {
  return useQuery<Query, QueryVariables>(
    GET_CREDIT_APPLICATION_BY_ORDER_UUID_DATA,
    {
      variables: {
        id,
      },
    },
  );
}

export const CREATE_UPDATE_CREDIT_APPLICATION = gql`
  mutation CreateUpdateCreditApplication(
    $input: CreditApplicationInputObject!
  ) {
    createUpdateCreditApplication(input: $input) {
      addresses
      bankAccounts
      companyDetails
      vatDetails
      directorsDetails
      employmentHistories
      incomeAndExpenses
      lineItem {
        uuid
        quantity
        status
        productId
        productType
        vehicleProduct {
          derivativeCapId
          description
          vsku
          term
          annualMileage
          monthlyPayment
          depositMonths
          funderId
          funderData
        }
      }
      leadManagerProposalId
      createdAt
      emailAddresses
      partyDetails
      status
      telephoneNumbers
      updatedAt
      uuid
    }
  }
`;

export function useCreateUpdateCreditApplication(
  orderId: string,
  onCompleted: (data: CreateUpdateCreditApplication) => void,
) {
  return useMutation<
    CreateUpdateCreditApplication,
    CreateUpdateCreditApplicationVariables
  >(CREATE_UPDATE_CREDIT_APPLICATION, {
    onCompleted,
    update: (store, result) => {
      // Read the data from our cache for this query.
      const data = store.readQuery<Query, QueryVariables>({
        query: GET_CREDIT_APPLICATION_BY_ORDER_UUID_DATA,
        variables: { id: orderId },
      });

      // Add the employment from the mutation to the end.
      if (
        data?.creditApplicationByOrderUuid ||
        result.data?.createUpdateCreditApplication
      ) {
        const addresses =
          result.data?.createUpdateCreditApplication?.addresses ||
          data?.creditApplicationByOrderUuid?.addresses;
        const bankAccounts =
          result.data?.createUpdateCreditApplication?.bankAccounts ||
          data?.creditApplicationByOrderUuid?.bankAccounts;
        const emailAddresses =
          result.data?.createUpdateCreditApplication?.emailAddresses ||
          data?.creditApplicationByOrderUuid?.emailAddresses;
        const employmentHistories =
          result.data?.createUpdateCreditApplication?.employmentHistories ||
          data?.creditApplicationByOrderUuid?.employmentHistories;
        const incomeAndExpenses =
          result.data?.createUpdateCreditApplication?.incomeAndExpenses ||
          data?.creditApplicationByOrderUuid?.incomeAndExpenses;
        const status =
          result.data?.createUpdateCreditApplication?.status ||
          data?.creditApplicationByOrderUuid?.status;
        const telephoneNumbers =
          result.data?.createUpdateCreditApplication?.telephoneNumbers ||
          data?.creditApplicationByOrderUuid?.telephoneNumbers;
        const updatedAt =
          result.data?.createUpdateCreditApplication?.updatedAt ||
          data?.creditApplicationByOrderUuid?.updatedAt;
        const companyDetails =
          result.data?.createUpdateCreditApplication?.companyDetails ||
          data?.creditApplicationByOrderUuid?.companyDetails;
        const vatDetails =
          result.data?.createUpdateCreditApplication?.vatDetails ||
          data?.creditApplicationByOrderUuid?.vatDetails;
        const directorsDetails =
          result.data?.createUpdateCreditApplication?.directorsDetails ||
          data?.creditApplicationByOrderUuid?.directorsDetails;

        // Write our data back to the cache.
        store.writeQuery<Query, QueryVariables>({
          query: GET_CREDIT_APPLICATION_BY_ORDER_UUID_DATA,
          variables: { id: orderId },
          data: {
            creditApplicationByOrderUuid: {
              createdAt: data?.creditApplicationByOrderUuid?.createdAt,
              addresses,
              bankAccounts,
              emailAddresses,
              employmentHistories,
              incomeAndExpenses,
              lineItem: null,
              status: status || 'draft',
              telephoneNumbers,
              updatedAt,
              uuid: orderId,
              partyDetails: null,
              leadManagerProposalId: null,
              companyDetails,
              vatDetails,
              directorsDetails,
            },
          },
        });
      }
    },
  });
}

const responseMock = {
  addresses: [],
  bankAccounts: [
    {
      account_name: 'Eternal account',
      account_number: '67272820',
      joined_at_month: '1',
      joined_at_year: '2020',
      sort_code: ['01', '93', '87'],
    },
  ],
  companyDetails: null,
  vatDetails: 'vatDetails',
  directorsDetails: 'directorsDetails',
  employmentHistories: 'employmentHistories',
  incomeAndExpenses: 'incomeAndExpenses',
  lineItem: {
    uuid: 'uuid',
    quantity: 'quantity',
    status: 'status',
    productId: 'productId',
    productType: 'productType',
    vehicleProduct: {
      derivativeCapId: 'derivativeCapId',
      description: 'description',
      vsku: 'vsku',
      term: 'term',
      annualMileage: 'annualMileage',
      monthlyPayment: 'monthlyPayment',
      depositMonths: 'depositMonths',
      funderId: 'funderId',
      funderData: 'funderData',
    },
  },
  leadManagerProposalId: 'leadManagerProposalId',
  createdAt: 'createdAt',
  emailAddresses: [],
  partyDetails: 'partyDetails',
  status: 'status',
  telephoneNumbers: [],
  updatedAt: 'updatedAt',
  uuid: 'uuid',
};

export const makeGetCreditApplicationMock = (id: string): MockedResponse => ({
  request: {
    query: GET_CREDIT_APPLICATION_BY_ORDER_UUID_DATA,
    variables: { id },
  },
  result: jest.fn().mockImplementation(() => ({
    data: {
      creditApplicationByOrderUuid: {
        ...responseMock,
      },
    },
  })),
});

export const makeUpdateCreditApplicationMock = (
  input: CreditApplicationInputObject,
): MockedResponse => ({
  request: {
    query: CREATE_UPDATE_CREDIT_APPLICATION,
    variables: { input },
  },
  result: jest.fn().mockImplementation(() => ({
    data: {
      createUpdateCreditApplication: {
        ...responseMock,
      },
    },
  })),
});
