import {
  gql,
  useQuery,
  useMutation,
  ApolloError,
  ApolloClient,
  NormalizedCacheObject,
} from '@apollo/client';
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

export function useStoredPersonUuidQuery(
  onCompleted?: (data: GetStoredPersonUuid) => void,
  onError?: (error: ApolloError) => void,
) {
  return useQuery<GetStoredPersonUuid>(GET_STORED_PERSON_UUID_QUERY, {
    ssr: false,
    onCompleted,
    onError,
  });
}

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
  client: ApolloClient<NormalizedCacheObject>,
) {
  return client
    .query<GetStoredPersonUuid>({
      query: GET_STORED_PERSON_UUID_QUERY,
    })
    .then(operation => operation.data?.storedPersonUuid)
    .catch(() => null);
}
