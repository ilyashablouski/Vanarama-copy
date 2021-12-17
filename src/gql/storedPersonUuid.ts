import {
  gql,
  useMutation,
  ApolloError,
  ApolloClient,
  NormalizedCacheObject,
} from '@apollo/client';
import { QueryOptions } from '@apollo/client/core/watchQueryOptions';
import { GetStoredPersonUuid } from '../../generated/GetStoredPersonUuid';
import {
  SavePersonUuid,
  SavePersonUuidVariables,
} from '../../generated/SavePersonUuid';

export const GET_STORED_PERSON_UUID_QUERY = gql`
  query GetStoredPersonUuid {
    storedPersonUuid @client
  }
`;

export const SAVE_PERSON_UUID_MUTATION = gql`
  mutation SavePersonUuid($uuid: ID) {
    savePersonUuid(uuid: $uuid) @client
  }
`;

export function useSavePersonUuidMutation(
  onCompleted?: (data: SavePersonUuid) => void,
  onError?: (error: ApolloError) => void,
) {
  return useMutation<SavePersonUuid, SavePersonUuidVariables>(
    SAVE_PERSON_UUID_MUTATION,
    {
      onCompleted,
      onError,
    },
  );
}

export function getStoredPersonUuid(
  client: ApolloClient<NormalizedCacheObject | object>,
  fetchPolicy?: QueryOptions['fetchPolicy'],
) {
  return client
    .query<GetStoredPersonUuid>({
      query: GET_STORED_PERSON_UUID_QUERY,
      fetchPolicy,
    })
    .then(operation => operation.data?.storedPersonUuid)
    .catch(() => null);
}
