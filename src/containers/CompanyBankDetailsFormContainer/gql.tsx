import { useMutation, gql, useQuery } from '@apollo/client';

import {
  UpdateBankDetailsMutation as Mutation,
  UpdateBankDetailsMutationVariables as MutationVariables,
} from '../../../generated/UpdateBankDetailsMutation';
import {
  GetCompanyBankDetailsPageDataQuery as Query,
  GetCompanyBankDetailsPageDataQueryVariables as QueryVariables,
} from '../../../generated/GetCompanyBankDetailsPageDataQuery';

export const UPDATE_COMPANY_BANK_DETAILS = gql`
  mutation UpdateBankDetailsMutation($input: LimitedCompanyInputObject!) {
    updateLimitedCompany(input: $input) {
      uuid
      bankAccounts {
        accountName
        accountNumber
        sortCode
        joinedAt
      }
    }
  }
`;

export const GET_COMPANY_BANK_DETAILS = gql`
  query GetCompanyBankDetailsPageDataQuery($uuid: ID!) {
    companyByUuid(uuid: $uuid) {
      uuid
      bankAccounts {
        uuid
        accountName
        accountNumber
        sortCode
        joinedAt
      }
    }
  }
`;

export function useBankDetails(companyUuid: string) {
  return useQuery<Query, QueryVariables>(GET_COMPANY_BANK_DETAILS, {
    variables: { uuid: companyUuid },
  });
} 

export function useUpdateBankDetails(
  companyUuid: string,
  onCompleted: () => void,
) {
  return useMutation<Mutation, MutationVariables>(UPDATE_COMPANY_BANK_DETAILS, {
    onCompleted,
  });
}
