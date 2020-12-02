/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum, LeaseTypeEnum, RateInputObject } from "./globalTypes";

// ====================================================
// GraphQL query operation: rangeList
// ====================================================

export interface rangeList_rangeList {
  rangeName: string | null;
  rangeId: string | null;
  count: number | null;
  minPrice: number | null;
}

export interface rangeList {
  /**
   * Find Ranges
   */
  rangeList: rangeList_rangeList[] | null;
}

export interface rangeListVariables {
  vehicleTypes?: VehicleTypeEnum | null;
  leaseType?: LeaseTypeEnum | null;
  manufacturerSlug: string;
  bodyStyles?: string[] | null;
  transmissions?: string[] | null;
  fuelTypes?: string[] | null;
  rate?: RateInputObject | null;
}
