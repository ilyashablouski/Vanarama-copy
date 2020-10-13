import { gql, useMutation } from '@apollo/client';
import {
  UpdateSoleTraderCompanyMutation as Mutation,
  UpdateSoleTraderCompanyMutationVariables as MutationVars,
} from '../../../generated/UpdateSoleTraderCompanyMutation';

export const UPDATE_SOLE_TRADER_COMPANY_DETAILS = gql`
  mutation UpdateSoleTraderCompanyMutation(
    $input: SoleTraderCompanyInputObject!
  ) {
    createUpdateSoleTraderCompany(input: $input) {
      uuid
      partyUuid
      addresses {
        lineOne
        lineTwo
        lineThree
        city
        county
        postcode
        country
        startedOn
        endedOn
        propertyStatus
        serviceId
        kind
      }
    }
  }
`;

export function useUpdateSoleTraderCompanyMutation() {
  return useMutation<Mutation, MutationVars>(
    UPDATE_SOLE_TRADER_COMPANY_DETAILS,
  );
}
