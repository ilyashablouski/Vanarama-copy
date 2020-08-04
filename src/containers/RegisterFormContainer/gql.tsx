import { gql, useMutation } from '@apollo/client';
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
    emailAlreadyExists(email: $email)
  }
`;

export const REGISTER_USER_MUTATION = gql`
  mutation RegisterUserMutation(
    $firstName: String!
    $lastName: String!
    $username: String!
    $password: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      username: $username
      password: $password
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
) {
  return useMutation<RegisterUserMutation, RegisterUserMutationVariables>(
    REGISTER_USER_MUTATION,
    { onCompleted },
  );
}
