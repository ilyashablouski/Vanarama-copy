/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductDerivativeFilter } from "./globalTypes";

// ====================================================
// GraphQL query operation: productFilter
// ====================================================

export interface productFilter_productFilter_enginePowerBhp {
  min: number | null;
  max: number | null;
}

export interface productFilter_productFilter {
  make: (string | null)[] | null;
  range: (string | null)[] | null;
  transmissions: (string | null)[] | null;
  fuelTypes: (string | null)[] | null;
  bodyStyles: (string | null)[] | null;
  vehicleCategory: (string | null)[] | null;
  doors: (number | null)[] | null;
  noOfSeats: (number | null)[] | null;
  engineSizeGroup: (string | null)[] | null;
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
