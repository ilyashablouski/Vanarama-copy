/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductDerivativeFilter } from "./globalTypes";

// ====================================================
// GraphQL query operation: productFilter
// ====================================================

export interface productFilter_productFilter_rangeNames {
  manufacturer: string | null;
  ranges: (string | null)[] | null;
}

export interface productFilter_productFilter_enginePowerBhp {
  min: number | null;
  max: number | null;
}

export interface productFilter_productFilter {
  manufacturerName: (string | null)[] | null;
  manufacturerNames: (string | null)[] | null;
  rangeNames: (productFilter_productFilter_rangeNames | null)[] | null;
  rangeName: (string | null)[] | null;
  transmissions: (string | null)[] | null;
  fuelTypes: (string | null)[] | null;
  bodyStyles: (string | null)[] | null;
  vehicleCategory: (string | null)[] | null;
  doors: (number | null)[] | null;
  noOfSeats: (number | null)[] | null;
  engineSizeGroup: (string | null)[] | null;
  electricRangeGroup: (string | null)[] | null;
  standardEuroEmissions: (string | null)[] | null;
  loadHeightGroup: (string | null)[] | null;
  loadLengthGroup: (string | null)[] | null;
  payloadGroup: (string | null)[] | null;
  mpgGroup: (string | null)[] | null;
  co2Group: (string | null)[] | null;
  enginePowerBhp: productFilter_productFilter_enginePowerBhp | null;
}

export interface productFilter {
  productFilter: productFilter_productFilter | null;
}

export interface productFilterVariables {
  query?: string | null;
  filters?: ProductDerivativeFilter | null;
}
