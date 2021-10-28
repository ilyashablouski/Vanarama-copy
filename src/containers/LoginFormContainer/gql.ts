import { gql, useLazyQuery, useMutation } from '@apollo/client';
import {
  LoginUserMutation as Mutation,
  LoginUserMutationVariables as MutationVariables,
} from '../../../generated/LoginUserMutation';
import { useImperativeQuery } from '../../hooks/useImperativeQuery';
import { GetPerson } from '../../../generated/GetPerson';

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

export const PERSON_DATA_FRAGMENT = gql`
  fragment PersonData on PersonType {
    uuid
    firstName
    lastName
    partyUuid
    emailAddresses {
      value
      partyId
    }
  }
`;

export const GET_PERSON_QUERY = gql`
  query GetPerson {
    getPerson {
      ...PersonData
    }
  }
  ${PERSON_DATA_FRAGMENT}
`;

export function usePersonImperativeQuery() {
  return useImperativeQuery<GetPerson>(GET_PERSON_QUERY);
}

export function useAuthReset() {
  return useLazyQuery<GetPerson>(GET_PERSON_QUERY);
}
