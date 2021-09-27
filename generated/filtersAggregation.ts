/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: filtersAggregation
// ====================================================

export interface filtersAggregation_enginePowerBhp {
  min: number | null;
  max: number | null;
}

export interface filtersAggregation {
  manufacturerName: (string | null)[] | null;
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
  enginePowerBhp: filtersAggregation_enginePowerBhp | null;
}
