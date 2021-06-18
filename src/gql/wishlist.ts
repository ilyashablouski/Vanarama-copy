import { gql } from '@apollo/client';

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

export const GET_WISHLIST_VEHICLES = gql`
  query GetWishlistVehicles($partyUuid: ID!) {
    favouritesByPartyUuid(partyUuid: $partyUuid)
  }
`;
