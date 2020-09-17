import { useMutation, gql, useQuery } from '@apollo/client';

import CompanyBankDetails from '../../components/CompanyBankDetails';
import {
  UpdateLimitedBankDetailsMutation as MutationLimited,
  UpdateLimitedBankDetailsMutationVariables as MutationLimitedVariables,
} from '../../../generated/UpdateLimitedBankDetailsMutation';
import {
  UpdateSoleTraderBankDetailsMutation as MutationSoleTrader,
  UpdateSoleTraderBankDetailsMutationVariables as MutationSoleTraderVariables,
} from '../../../generated/UpdateSoleTraderBankDetailsMutation';
import {
  GetCompanyBankDetailsPageDataQuery as Query,
  GetCompanyBankDetailsPageDataQueryVariables as QueryVariables,
} from '../../../generated/GetCompanyBankDetailsPageDataQuery';

export const UPDATE_LIMITED_BANK_DETAILS = gql`
  mutation UpdateLimitedBankDetailsMutation(
    $input: LimitedCompanyInputObject!
  ) {
    createUpdateLimitedCompany(input: $input) {
      uuid
      bankAccounts {
        ...CompanyBankDetailsAccount
      }
    }
  }
  ${CompanyBankDetails.fragments.account}
`;

export const UPDATE_SOLETRADER_BANK_DETAILS = gql`
  mutation UpdateSoleTraderBankDetailsMutation(
    $input: SoleTraderCompanyInputObject!
  ) {
    createUpdateSoleTraderCompany(input: $input) {
      uuid
      bankAccounts {
        ...CompanyBankDetailsAccount
      }
    }
  }
  ${CompanyBankDetails.fragments.account}
`;

export const GET_COMPANY_BANK_DETAILS = gql`
  query GetCompanyBankDetailsPageDataQuery($uuid: ID!) {
    companyByUuid(uuid: $uuid) {
      uuid
      bankAccounts {
        ...CompanyBankDetailsAccount
      }
    }
  }
  ${CompanyBankDetails.fragments.account}
`;

export function useBankDetails(companyUuid: string) {
  return useQuery<Query, QueryVariables>(GET_COMPANY_BANK_DETAILS, {
    variables: { uuid: companyUuid },
  });
}

export function useUpdateLimitedBankDetails() {
  return useMutation<MutationLimited, MutationLimitedVariables>(
    UPDATE_LIMITED_BANK_DETAILS,
  );
}

export function useUpdateSoleTraderBankDetails() {
  return useMutation<MutationSoleTrader, MutationSoleTraderVariables>(
    UPDATE_SOLETRADER_BANK_DETAILS,
  );
}
