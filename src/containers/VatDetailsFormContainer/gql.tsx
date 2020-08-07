import { gql, useMutation, useLazyQuery } from '@apollo/client';
import {
  UpdateVatDetailsMutation as Mutation,
  UpdateVatDetailsMutationVariables as MutationVariables,
} from '../../../generated/UpdateVatDetailsMutation';
import BusinessSummaryFormVATDetailsSection from '../../components/BusinessSummaryForm/BusinessSummaryFormVATDetailsSection';
import {
  GetVatDetailsQuery,
  GetVatDetailsQueryVariables,
} from '../../../generated/GetVatDetailsQuery';

export const UPDATE_VAT_DETAILS = gql`
  mutation UpdateVatDetailsMutation($input: LimitedCompanyInputObject!) {
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

export function useUpdateVatDetails() {
  return useMutation<Mutation, MutationVariables>(UPDATE_VAT_DETAILS);
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
