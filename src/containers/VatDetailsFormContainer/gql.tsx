import { gql, useMutation, useLazyQuery } from '@apollo/client';
import {
  UpdateLimitedVatDetailsMutation,
  UpdateLimitedVatDetailsMutationVariables,
} from '../../../generated/UpdateLimitedVatDetailsMutation';
import {
  UpdateSoleTraderVatDetailsMutation,
  UpdateSoleTraderVatDetailsMutationVariables,
} from '../../../generated/UpdateSoleTraderVatDetailsMutation';
import BusinessSummaryFormVATDetailsSection from '../../components/BusinessSummaryForm/BusinessSummaryFormVATDetailsSection';
import {
  GetVatDetailsQuery,
  GetVatDetailsQueryVariables,
} from '../../../generated/GetVatDetailsQuery';

export const UPDATE_LIMITED_VAT_DETAILS = gql`
  mutation UpdateLimitedVatDetailsMutation($input: LimitedCompanyInputObject!) {
    createUpdateLimitedCompany(input: $input) {
      uuid
      isVatRegistered
      tradesOutsideUk
      turnoverPercentageOutsideUk {
        country
        percentage
      }
      vatNumber
    }
  }
`;

export const GET_VAT_DETAILS = gql`
  query GetVatDetailsQuery($companyUuid: ID!) {
    companyByUuid(uuid: $companyUuid) {
      ...VatDetails
    }
  }
  ${BusinessSummaryFormVATDetailsSection.fragments.vatDetails}
`;

export const UPDATE_SOLE_TRADER_VAT_DETAILS = gql`
  mutation UpdateSoleTraderVatDetailsMutation(
    $input: SoleTraderCompanyInputObject!
  ) {
    createUpdateSoleTraderCompany(input: $input) {
      uuid
      isVatRegistered
      tradesOutsideUk
      turnoverPercentageOutsideUk {
        country
        percentage
      }
      vatNumber
    }
  }
`;

export function useUpdateLimitedVatDetails() {
  return useMutation<
    UpdateLimitedVatDetailsMutation,
    UpdateLimitedVatDetailsMutationVariables
  >(UPDATE_LIMITED_VAT_DETAILS);
}

export function useGetVatDetails(companyUuid: string) {
  return useLazyQuery<GetVatDetailsQuery, GetVatDetailsQueryVariables>(
    GET_VAT_DETAILS,
    {
      variables: {
        companyUuid,
      },
    },
  );
}

export function useUpdateSoleTraderVatDetails() {
  return useMutation<
    UpdateSoleTraderVatDetailsMutation,
    UpdateSoleTraderVatDetailsMutationVariables
  >(UPDATE_SOLE_TRADER_VAT_DETAILS);
}
