/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum, LeaseTypeEnum, RateInputObject } from "./globalTypes";

// ====================================================
// GraphQL query operation: manufacturerList
// ====================================================

export interface manufacturerList_manufacturerList {
  count: number | null;
  manufacturerId: string | null;
  manufacturerName: string | null;
  minPrice: number | null;
  capId: number | null;
}

export interface manufacturerList {
  /**
   * Find Manufacturers
   */
  manufacturerList: manufacturerList_manufacturerList[] | null;
}

export interface manufacturerListVariables {
  vehicleType?: VehicleTypeEnum | null;
  leaseType?: LeaseTypeEnum | null;
  rate?: RateInputObject | null;
  bodyStyles?: string[] | null;
  transmissions?: string[] | null;
  fuelTypes?: string[] | null;
}
