import { useQuery, gql, useMutation, useLazyQuery } from '@apollo/client';
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

import {
  GetLeaseCompanyData as ILeaseData,
  GetLeaseCompanyDataVariables as ILeaseDataVariables,
} from '../../generated/GetLeaseCompanyData';

export const GET_CREDIT_APPLICATION_BY_ORDER_UUID_DATA = gql`
  query GetCreditApplicationByOrderUuid($id: ID!) {
    creditApplicationByOrderUuid(orderUuid: $id) {
      addresses
      aboutDetails
      bankAccountsV2 {
        uuid
        accountName
        accountNumber
        bankName
        joinedAt
        joinedAtMonth
        joinedAtYear
        sortCode
      }
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
      creditApplicationType
      leadManagerProposalId
      createdAt
      status
      updatedAt
      uuid
    }
  }
`;

export const GET_LEASE_COMPANY_BY_ORDER_UUID_DATA = gql`
  query GetLeaseCompanyData($id: ID!) {
    creditApplicationByOrderUuid(orderUuid: $id) {
      aboutDetails
      lineItem {
        vehicleProduct {
          funderId
          funderData
        }
      }
    }
  }
`;

export function useGetLeaseCompanyDataByOrderUuid(id: string) {
  return useLazyQuery<ILeaseData, ILeaseDataVariables>(
    GET_LEASE_COMPANY_BY_ORDER_UUID_DATA,
    {
      variables: {
        id,
      },
      fetchPolicy: 'no-cache',
    },
  );
}

export function useGetCreditApplicationByOrderUuid(id: string) {
  return useQuery<Query, QueryVariables>(
    GET_CREDIT_APPLICATION_BY_ORDER_UUID_DATA,
    {
      variables: {
        id,
      },
      skip: !id,
      fetchPolicy: 'no-cache',
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
      bankAccountsV2 {
        uuid
        accountName
        accountNumber
        bankName
        joinedAt
        joinedAtMonth
        joinedAtYear
        sortCode
      }
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
      creditApplicationType
      leadManagerProposalId
      createdAt
      status
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
  });
}

const responseMock = {
  addresses: [],
  aboutDetails: {
    company_type: 'Limited',
  },
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
  creditApplicationType: 'B2B_LIMITED',
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
