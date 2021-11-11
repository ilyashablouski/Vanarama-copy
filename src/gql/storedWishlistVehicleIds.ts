import { ApolloError, gql, useMutation, useQuery } from '@apollo/client';
import { GetStoredWishlistVehiclesIds } from '../../generated/GetStoredWishlistVehiclesIds';
import {
  SaveWishlistVehiclesIds,
  SaveWishlistVehiclesIdsVariables,
} from '../../generated/SaveWishlistVehiclesIds';

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
