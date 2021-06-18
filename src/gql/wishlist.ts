import { gql, ApolloClient, useMutation } from '@apollo/client';

import {
  AddVehicleToWishlist,
  AddVehicleToWishlistVariables,
} from '../../generated/AddVehicleToWishlist';
import {
  RemoveVehicleFromWishlist,
  RemoveVehicleFromWishlistVariables,
} from '../../generated/RemoveVehicleFromWishlist';
import {
  GetWishlistVehicleIds,
  GetWishlistVehicleIdsVariables,
} from '../../generated/GetWishlistVehicleIds';

const ADD_VEHICLE_TO_WISHLIST = gql`
  mutation AddVehicleToWishlist(
    $partyUuid: ID!
    $vehicleConfigurationIds: [String!]!
  ) {
    createFavourite(
      input: {
        partyUuid: $partyUuid
        vehicleConfigurationIds: $vehicleConfigurationIds
      }
    ) {
      vehicleConfigurationId
    }
  }
`;

const REMOVE_VEHICLE_FROM_WISHLIST = gql`
  mutation RemoveVehicleFromWishlist(
    $partyUuid: ID!
    $vehicleConfigurationIds: [String!]!
  ) {
    deleteFavourite(
      input: {
        partyUuid: $partyUuid
        vehicleConfigurationIds: $vehicleConfigurationIds
      }
    )
  }
`;

const GET_WISHLIST_VEHICLE_IDS = gql`
  query GetWishlistVehicleIds($partyUuid: ID!) {
    favouritesByPartyUuid(partyUuid: $partyUuid)
  }
`;

export const getWishlistVehicleIds = async (
  client: ApolloClient<object>,
  partyUuid: string,
) =>
  client.query<GetWishlistVehicleIds, GetWishlistVehicleIdsVariables>({
    query: GET_WISHLIST_VEHICLE_IDS,
    variables: {
      partyUuid,
    },
  });

export function useAddVehicleToWishlist() {
  return useMutation<AddVehicleToWishlist, AddVehicleToWishlistVariables>(
    ADD_VEHICLE_TO_WISHLIST,
  );
}

export function useRemoveVehicleFromWishlist() {
  return useMutation<
    RemoveVehicleFromWishlist,
    RemoveVehicleFromWishlistVariables
  >(REMOVE_VEHICLE_FROM_WISHLIST);
}
