import { gql, useMutation } from '@apollo/client';
import {
  LoginUserMutation as Mutation,
  LoginUserMutationVariables as MutationVariables,
} from '../../../generated/LoginUserMutation';

export const LOGIN_USER_MUTATION = gql`
  mutation LoginUserMutation($username: String!, $password: String!) {
    loginV2(username: $username, password: $password) {
      idToken
      accessToken
    }
  }
`;

export function useLoginUserMutation(onCompleted?: (data: Mutation) => void) {
  return useMutation<Mutation, MutationVariables>(LOGIN_USER_MUTATION, {
    onCompleted,
  });
}

export function makeLoginUserMutationMock(email: string, password: string) {
  return {
    request: {
      query: LOGIN_USER_MUTATION,
      variables: {
        password,
        username: email,
      },
    },
    result: {
      data: {
        loginV2: 'some-fake-token',
      },
    },
  };
}
