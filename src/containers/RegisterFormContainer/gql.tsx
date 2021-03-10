import { gql, useMutation, ApolloError } from '@apollo/client';
import {
  EmailAlreadyExistsMutation,
  EmailAlreadyExistsMutationVariables,
} from '../../../generated/EmailAlreadyExistsMutation';
import {
  RegisterUserMutation,
  RegisterUserMutationVariables,
} from '../../../generated/RegisterUserMutation';

export const EMAIL_ALREADY_EXISTS = gql`
  mutation EmailAlreadyExistsMutation($email: String!) {
    emailAlreadyExists(email: $email) {
      isSuccessfull
      isExists
      isTemporary
    }
  }
`;

export const REGISTER_USER_MUTATION = gql`
  mutation RegisterUserMutation(
    $firstName: String!
    $lastName: String!
    $username: String!
    $password: String!
    $redirectUrl: String
    $termsAndConditions: Boolean!
    $communicationsConsent: Boolean
    $privacyPolicy: Boolean!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      username: $username
      password: $password
      redirectUrl: $redirectUrl
      // termsAndConditions: $termsAndConditions
      // privacyPolicy: $privacyPolicy
      // communicationsConsent: $marketingPreference
    ) {
      uuid
    }
  }
`;

export function useEmailCheck(
  onCompleted?: (data: EmailAlreadyExistsMutation) => void,
) {
  return useMutation<
    EmailAlreadyExistsMutation,
    EmailAlreadyExistsMutationVariables
  >(EMAIL_ALREADY_EXISTS, { onCompleted });
}

export function useRegistration(
  onCompleted?: (data: RegisterUserMutation) => void,
  onError?: (error: ApolloError) => void,
) {
  return useMutation<RegisterUserMutation, RegisterUserMutationVariables>(
    REGISTER_USER_MUTATION,
    { onCompleted, onError },
  );
}
