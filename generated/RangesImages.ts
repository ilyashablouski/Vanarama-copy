/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: RangesImages
// ====================================================

export interface RangesImages_vehicleImages {
  mainImageUrl: string | null;
}

export interface RangesImages {
  vehicleImages: (RangesImages_vehicleImages | null)[] | null;
}

export interface RangesImagesVariables {
  rangeId?: string | null;
  vehicleType?: VehicleTypeEnum | null;
  capIds?: (string | null)[] | null;
}
