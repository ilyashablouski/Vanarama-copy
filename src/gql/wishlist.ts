import { gql, useMutation } from '@apollo/client';

import {
  AddVehicleToWishlist,
  AddVehicleToWishlistVariables,
} from '../../generated/AddVehicleToWishlist';
import {
  RemoveVehicleFromWishlist,
  RemoveVehicleFromWishlistVariables,
} from '../../generated/RemoveVehicleFromWishlist';

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

export function makeAddVehicleToWishlistMutationMock(
  partyUuid = '',
  vehicleConfigurationIds: Array<string> = [],
) {
  return {
    request: {
      query: ADD_VEHICLE_TO_WISHLIST,
      variables: {
        vehicleConfigurationIds,
        partyUuid,
      },
    },
    result: {},
  };
}
