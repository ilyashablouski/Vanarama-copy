import {
  gql,
  useQuery,
  useMutation,
  ApolloError,
  ApolloClient,
  NormalizedCacheObject,
} from '@apollo/client';
import { GetStoredPerson } from '../../generated/GetStoredPerson';
import { SavePerson, SavePersonVariables } from '../../generated/SavePerson';
import { PERSON_DATA_FRAGMENT } from '../containers/LoginFormContainer/gql';

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

export function getStoredPerson(client: ApolloClient<NormalizedCacheObject>) {
  return client
    .query<GetStoredPerson>({
      query: GET_STORED_PERSON_QUERY,
    })
    .then(operation => operation.data?.storedPerson)
    .catch(() => null);
}

export function setStoredPerson(
  client: ApolloClient<NormalizedCacheObject>,
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
