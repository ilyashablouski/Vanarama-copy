import {
  ApolloClient,
  ApolloError,
  gql,
  NormalizedCacheObject,
  useMutation,
  useQuery,
} from '@apollo/client';
import { GetStoredWishlistVehiclesIds } from '../../generated/GetStoredWishlistVehiclesIds';
import {
  SaveWishlistVehiclesIds,
  SaveWishlistVehiclesIdsVariables,
} from '../../generated/SaveWishlistVehiclesIds';
import { Nullable } from '../types/common';

const STORED_WISHLIST_VEHICLES_IDS_QUERY = gql`
  query GetStoredWishlistVehiclesIds {
    storedWishlistVehicleIds @client
  }
`;

export function useGetStoredWishlistVehicleIdsQuery(
  onCompleted?: (data: GetStoredWishlistVehiclesIds) => void,
  onError?: (error: ApolloError) => void,
) {
  return useQuery<GetStoredWishlistVehiclesIds>(
    STORED_WISHLIST_VEHICLES_IDS_QUERY,
    {
      fetchPolicy: 'no-cache',
      ssr: false,
      onCompleted,
      onError,
    },
  );
}

const SAVE_WISHLIST_VEHICLES_IDS_MUTATION = gql`
  mutation SaveWishlistVehiclesIds($ids: [String]) {
    saveWishlistVehicleIds(ids: $ids) @client
  }
`;

export function useSaveStoredWishlistVehicleIdsMutation(
  onCompleted?: (data: SaveWishlistVehiclesIds) => void,
  onError?: (error: ApolloError) => void,
) {
  return useMutation<SaveWishlistVehiclesIds, SaveWishlistVehiclesIdsVariables>(
    SAVE_WISHLIST_VEHICLES_IDS_MUTATION,
    {
      onCompleted,
      onError,
    },
  );
}

export function getStoredWishlistVehiclesIds(
  client: ApolloClient<NormalizedCacheObject | object>,
) {
  return client
    .query<GetStoredWishlistVehiclesIds>({
      query: STORED_WISHLIST_VEHICLES_IDS_QUERY,
    })
    .then(operation => operation.data?.storedWishlistVehicleIds)
    .catch(() => null);
}

export function setStoredWishlistVehiclesIds(
  client: ApolloClient<NormalizedCacheObject | object>,
  ids: Nullable<string>[],
) {
  return client
    .mutate<SaveWishlistVehiclesIds, SaveWishlistVehiclesIdsVariables>({
      mutation: SAVE_WISHLIST_VEHICLES_IDS_MUTATION,
      variables: {
        ids,
      },
    })
    .then(operation => operation.data?.saveWishlistVehicleIds)
    .catch(() => null);
}
