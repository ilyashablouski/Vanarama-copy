import { useMutation, gql, useQuery } from '@apollo/client';

import {
  UpdateBankDetailsMutation as Mutation,
  UpdateBankDetailsMutationVariables as MutationVariables,
} from '../../../generated/UpdateBankDetailsMutation';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import CompanyBankDetails from '../../components/CompanyBankDetails';
import {
  GetCompanyDirectorDetailsQuery as Query,
  GetCompanyDirectorDetailsQueryVariables as QueryVariables,
} from '../../../generated/GetCompanyDirectorDetailsQuery';

export const UPDATE_COMPANY_BANK_DETAILS = gql`
  mutation UpdateBankDetailsMutation($input: LimitedCompanyInputObject!) {
    updateLimitedCompany(input: $input) {
      uuid
      bankAccounts{
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
    uuid,
    bankAccounts {
      uuid
      accountName
      accountNumber
      joinedAt
      sortCode
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
  const [updateBankDetails] = useMutation<Mutation, MutationVariables>(
    UPDATE_COMPANY_BANK_DETAILS,
    {
      onError: () =>
        toast.error(
          'Oops, an unexpected error occurred',
          'Your details could not be saved. Please try submitting the form again.',
        ),
      onCompleted
    },
  );

  return updateBankDetails;
}
