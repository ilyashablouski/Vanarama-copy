import { gql, useMutation, ApolloError } from '@apollo/client';
import {
  CreateOpportunity as Mutation,
  CreateOpportunityVariables as MutationVariables,
} from '../../../generated/CreateOpportunity';

export const CREATE_OPPORTUNITY_MUTATION = gql`
  mutation CreateOpportunity(
    $capId: Int
    $email: String!
    $fullName: String!
    $marketingPreference: Boolean
    $opportunityType: OpportunityTypeEnum!
    $phoneNumber: String!
    $postcode: String!
    $termsAndConditions: Boolean
    $vehicleType: String
  ) {
    createOpportunity(
      input: {
        capId: $capId
        communicationsConsent: $marketingPreference
        email: $email
        fullName: $fullName
        opportunityType: $opportunityType
        phoneNumber: $phoneNumber
        postcode: $postcode
        termsAndConditions: $termsAndConditions
        vehicleType: $vehicleType
      }
    ) {
      uuid
    }
  }
`;

export function useOpportunityCreation(
  onCompleted?: (data: Mutation) => void,
  onError?: (error: ApolloError) => void,
) {
  return useMutation<Mutation, MutationVariables>(CREATE_OPPORTUNITY_MUTATION, {
    onCompleted,
    onError,
  });
}
