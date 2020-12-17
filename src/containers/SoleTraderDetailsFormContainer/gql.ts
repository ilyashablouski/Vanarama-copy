import { gql, useQuery, useMutation } from '@apollo/client';
import SoleTraderDetailsForm from '../../components/SoleTraderDetailsForm';
import { SoleTraderDetailsFormDataQuery } from '../../../generated/SoleTraderDetailsFormDataQuery';

import {
  UpdateSoleTraderMutationVariables as MutationVars,
  UpdateSoleTraderMutation as Mutation,
} from '../../../generated/UpdateSoleTraderMutation';

export const GET_SOLETRADER_DETAILS_FORM_DATA = gql`
  query SoleTraderDetailsFormDataQuery($personUuid: ID!, $companyUuid: ID!) {
    allDropDowns {
      ...SoleTraderDetailsDropDownData
    }
    companyByUuid(uuid: $companyUuid) {
      ...SoleTraderAssociate
    }
    personByUuid(uuid: $personUuid) {
      ...SoleTraderPerson
    }
  }
  ${SoleTraderDetailsForm.fragments.soleTrader}
  ${SoleTraderDetailsForm.fragments.person}
  ${SoleTraderDetailsForm.fragments.dropdownData}
`;

export const UPDATE_SOLETRADER_COMPANY = gql`
  mutation UpdateSoleTraderMutation($input: SoleTraderCompanyInputObject!) {
    updateCompanySoleTrader(input: $input) {
      ...SoleTraderAssociate
    }
  }
  ${SoleTraderDetailsForm.fragments.soleTrader}
`;

export function useSoleTraderDetailsFormDataQuery(
  personUuid: string,
  companyUuid: string,
) {
  return useQuery<SoleTraderDetailsFormDataQuery>(
    GET_SOLETRADER_DETAILS_FORM_DATA,
    {
      fetchPolicy: 'no-cache',
      variables: {
        personUuid,
        companyUuid,
      },
      skip: !personUuid || !companyUuid,
    },
  );
}

export function useUpdateSoleTraderMutation() {
  return useMutation<Mutation, MutationVars>(UPDATE_SOLETRADER_COMPANY);
}
