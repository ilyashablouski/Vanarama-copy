/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ModelImages
// ====================================================

export interface ModelImages_vehicleImages {
  capId: number | null;
  mainImageUrl: string | null;
}

export interface ModelImages {
  vehicleImages: (ModelImages_vehicleImages | null)[] | null;
}

export interface ModelImagesVariables {
  capIds?: (string | null)[] | null;
}
