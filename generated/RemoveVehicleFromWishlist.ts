/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


// ====================================================
// GraphQL mutation operation: RemoveVehicleFromWishlist
// ====================================================


export interface RemoveVehicleFromWishlist {
  /**
   * Delete a favourite
   */
  deleteFavourite: boolean | null;
}

export interface RemoveVehicleFromWishlistVariables {
  partyUuid: string;
  vehicleConfigurationIds: string[];
}
