import { ApolloQueryResult, gql, useMutation } from '@apollo/client';

import {
  AddVehicleToWishlist,
  AddVehicleToWishlistVariables,
} from '../../generated/AddVehicleToWishlist';
import {
  RemoveVehicleFromWishlist,
  RemoveVehicleFromWishlistVariables,
} from '../../generated/RemoveVehicleFromWishlist';
import { GetWishlistVehicleIds } from '../../generated/GetWishlistVehicleIds';
import { Nullish } from '../types/common';

export const ADD_VEHICLE_TO_WISHLIST = gql`
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

export const REMOVE_VEHICLE_FROM_WISHLIST = gql`
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

export const GET_WISHLIST_VEHICLE_IDS = gql`
  query GetWishlistVehicleIds($partyUuid: ID!) {
    favouritesByPartyUuid(partyUuid: $partyUuid)
  }
`;

export const getWishlistVehicleIdsFromQuery = (
  query: ApolloQueryResult<Nullish<GetWishlistVehicleIds>>,
) => query.data?.favouritesByPartyUuid ?? [];

export function useAddVehicleToWishlistMutation() {
  return useMutation<AddVehicleToWishlist, AddVehicleToWishlistVariables>(
    ADD_VEHICLE_TO_WISHLIST,
  );
}

export function useRemoveVehicleFromWishlistMutation() {
  return useMutation<
    RemoveVehicleFromWishlist,
    RemoveVehicleFromWishlistVariables
  >(REMOVE_VEHICLE_FROM_WISHLIST);
}
