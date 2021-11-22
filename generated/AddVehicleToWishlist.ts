/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


// ====================================================
// GraphQL mutation operation: AddVehicleToWishlist
// ====================================================


export interface AddVehicleToWishlist_createFavourite {
  vehicleConfigurationId: string;
}

export interface AddVehicleToWishlist {
  /**
   * Create a favourite within wishlist
   */
  createFavourite: AddVehicleToWishlist_createFavourite[] | null;
}

export interface AddVehicleToWishlistVariables {
  partyUuid: string;
  vehicleConfigurationIds: string[];
}
