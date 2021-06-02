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
      isSuccessful
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
    $termsAndConditions: Boolean!
    $privacyPolicy: Boolean!
    $communicationsConsent: Boolean
    $redirectUrl: String
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      username: $username
      password: $password
      privacyPolicy: $privacyPolicy
      termsAndConditions: $termsAndConditions
      communicationsConsent: $communicationsConsent
      redirectUrl: $redirectUrl
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

export function makeRegisterUserMutationMock(email: string, password: string) {
  return {
    request: {
      query: REGISTER_USER_MUTATION,
      variables: {
        password,
        username: email,
        firstName: 'Barry',
        lastName: 'Barrys',
        termsAndConditions: true,
        privacyPolicy: true,
        communicationsConsent: false,
        redirectUrl: undefined,
      },
    },
    result: {
      data: {
        register: {
          uuid: '1',
        },
      },
    },
  };
}

export function makeEmailAlreadyExistsMutationMock(email: string) {
  return {
    request: {
      query: EMAIL_ALREADY_EXISTS,
      variables: {
        email,
      },
    },
    result: {
      data: {
        emailAlreadyExists: {
          isSuccessful: true,
          isTemporary: false,
          isExists: false,
        },
      },
    },
  };
}
