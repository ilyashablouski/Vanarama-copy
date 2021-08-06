/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: rangeDetails
// ====================================================

export interface rangeDetails_rangeDetails_customerReviews {
  rating: number | null;
  name: string | null;
  review: string | null;
}

export interface rangeDetails_rangeDetails {
  customerReviews: (rangeDetails_rangeDetails_customerReviews | null)[] | null;
}

export interface rangeDetails {
  rangeDetails: rangeDetails_rangeDetails | null;
}

export interface rangeDetailsVariables {
  rangeId: string;
  vehicleType?: VehicleTypeEnum | null;
}
