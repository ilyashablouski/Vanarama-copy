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
      aboutDetails
      bankAccounts
      companyDetails
      vatDetails
      soleTraderDetails
      directorsDetails
      employmentHistories
      incomeAndExpenses
      lineItem {
        uuid
        quantity
        status
        productId
        productType
        creditApplications {
          uuid
        }
        order {
          partyUuid
          uuid
        }
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
          depositPayment
          vehicleType
        }
      }
      leadManagerProposalId
      createdAt
      status
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
      skip: !id,
    },
  );
}

export const CREATE_UPDATE_CREDIT_APPLICATION = gql`
  mutation CreateUpdateCreditApplication(
    $input: CreditApplicationInputObject!
  ) {
    createUpdateCreditApplication(input: $input) {
      addresses
      aboutDetails
      bankAccounts
      companyDetails
      vatDetails
      soleTraderDetails
      directorsDetails
      employmentHistories
      incomeAndExpenses
      lineItem {
        uuid
        quantity
        status
        productId
        productType
        creditApplications {
          uuid
        }
        order {
          partyUuid
          uuid
        }
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
          depositPayment
          vehicleType
        }
      }
      leadManagerProposalId
      createdAt
      status
      updatedAt
      uuid
      B2C_PERSONAL
      B2B_SOLE_TRADER
      B2B_LIMITED
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
        const aboutDetails =
          result.data?.createUpdateCreditApplication?.aboutDetails ||
          data?.creditApplicationByOrderUuid?.aboutDetails;
        const addresses =
          result.data?.createUpdateCreditApplication?.addresses ||
          data?.creditApplicationByOrderUuid?.addresses;
        const bankAccounts =
          result.data?.createUpdateCreditApplication?.bankAccounts ||
          data?.creditApplicationByOrderUuid?.bankAccounts;
        const employmentHistories =
          result.data?.createUpdateCreditApplication?.employmentHistories ||
          data?.creditApplicationByOrderUuid?.employmentHistories;
        const incomeAndExpenses =
          result.data?.createUpdateCreditApplication?.incomeAndExpenses ||
          data?.creditApplicationByOrderUuid?.incomeAndExpenses;
        const status =
          result.data?.createUpdateCreditApplication?.status ||
          data?.creditApplicationByOrderUuid?.status;
        const updatedAt =
          result.data?.createUpdateCreditApplication?.updatedAt ||
          data?.creditApplicationByOrderUuid?.updatedAt;
        const companyDetails =
          result.data?.createUpdateCreditApplication?.companyDetails ||
          data?.creditApplicationByOrderUuid?.companyDetails;
        const vatDetails =
          result.data?.createUpdateCreditApplication?.vatDetails ||
          data?.creditApplicationByOrderUuid?.vatDetails;
        const soleTraderDetails =
          result.data?.createUpdateCreditApplication?.soleTraderDetails ||
          data?.creditApplicationByOrderUuid?.soleTraderDetails;
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
              aboutDetails,
              addresses,
              bankAccounts,
              employmentHistories,
              incomeAndExpenses,
              lineItem: null,
              status: status || 'draft',
              updatedAt,
              uuid: orderId,
              leadManagerProposalId: null,
              companyDetails,
              vatDetails,
              soleTraderDetails,
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
  aboutDetails: 'aboutDetails',
  bankAccounts: [
    {
      account_name: 'Eternal account',
      account_number: '67272820',
      joined_at_month: '1',
      joined_at_year: '2020',
      sort_code: '019387',
    },
  ],
  companyDetails: null,
  vatDetails: 'vatDetails',
  soleTraderDetails: 'soleTraderDetails',
  directorsDetails: 'directorsDetails',
  employmentHistories: 'employmentHistories',
  incomeAndExpenses: 'incomeAndExpenses',
  lineItem: {
    uuid: 'uuid',
    quantity: 'quantity',
    status: 'status',
    productId: 'productId',
    productType: 'productType',
    creditApplications: [
      {
        uuid: 'uuid',
      },
    ],
    order: {
      partyUuid: 'partyUuid',
      uuid: 'uuid',
    },
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
      depositPayment: 'depositPayment',
      vehicleType: 'vehicleType',
    },
  },
  leadManagerProposalId: 'leadManagerProposalId',
  createdAt: 'createdAt',
  status: 'status',
  updatedAt: 'updatedAt',
  uuid: 'uuid',
  B2C_PERSONAL: 'B2C_PERSONAL',
  B2B_SOLE_TRADER: 'B2B_SOLE_TRADER',
  B2B_LIMITED: 'B2B_LIMITED',
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
