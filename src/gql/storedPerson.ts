import {
  gql,
  useQuery,
  useMutation,
  ApolloError,
  ApolloClient,
  NormalizedCacheObject,
} from '@apollo/client';
import { QueryOptions } from '@apollo/client/core/watchQueryOptions';
import { GetStoredPerson } from '../../generated/GetStoredPerson';
import { SavePerson, SavePersonVariables } from '../../generated/SavePerson';
import { PERSON_DATA_FRAGMENT } from '../containers/LoginFormContainer/gql';
import { DeleteStoredPerson } from '../../generated/DeleteStoredPerson';

export const GET_STORED_PERSON_QUERY = gql`
  query GetStoredPerson {
    storedPerson @client {
      ...PersonData
    }
  }
  ${PERSON_DATA_FRAGMENT}
`;

export const SAVE_PERSON_MUTATION = gql`
  mutation SavePerson($person: PersonInputObject) {
    savePerson(person: $person) @client {
      ...PersonData
    }
  }
  ${PERSON_DATA_FRAGMENT}
`;

export function useStoredPersonQuery(
  onCompleted?: (data: GetStoredPerson) => void,
  onError?: (error: ApolloError) => void,
) {
  return useQuery<GetStoredPerson>(GET_STORED_PERSON_QUERY, {
    onCompleted,
    onError,
    ssr: false,
    fetchPolicy: 'no-cache',
  });
}

export function useSavePersonMutation() {
  return useMutation<SavePerson, SavePersonVariables>(SAVE_PERSON_MUTATION);
}

export function getStoredPerson(
  client: ApolloClient<NormalizedCacheObject | object>,
  fetchPolicy?: QueryOptions['fetchPolicy'],
) {
  return client
    .query<GetStoredPerson>({
      query: GET_STORED_PERSON_QUERY,
      fetchPolicy,
    })
    .then(operation => operation.data?.storedPerson)
    .catch(() => null);
}

export function setStoredPerson(
  client: ApolloClient<NormalizedCacheObject | object>,
  person: SavePersonVariables['person'],
) {
  return client
    .mutate<SavePerson, SavePersonVariables>({
      mutation: SAVE_PERSON_MUTATION,
      variables: {
        person,
      },
    })
    .then(operation => operation.data?.savePerson)
    .catch(() => null);
}

export const DELETE_PERSON_MUTATION = gql`
  mutation DeleteStoredPerson {
    deleteStoredPerson @client
  }
`;

export function useDeleteStoredPersonMutation(
  onCompleted?: (mutationResult: DeleteStoredPerson) => void,
  onError?: (error: ApolloError) => void,
) {
  return useMutation<DeleteStoredPerson>(DELETE_PERSON_MUTATION, {
    onCompleted,
    onError,
  });
}
