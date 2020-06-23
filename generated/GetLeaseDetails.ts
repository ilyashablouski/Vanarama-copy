/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetLeaseDetails
// ====================================================

export interface GetLeaseDetails_leaseAdjustParams {
  mileages: number[];
  terms: number[];
  upfronts: number[];
}

export interface GetLeaseDetails_derivativeInfo_colours {
  id: string;
  optionDescription: string;
}

export interface GetLeaseDetails_derivativeInfo_trims {
  id: string;
  optionDescription: string;
}

export interface GetLeaseDetails_derivativeInfo {
  id: string;
  name: string;
  colours: (GetLeaseDetails_derivativeInfo_colours | null)[] | null;
  trims: (GetLeaseDetails_derivativeInfo_trims | null)[] | null;
}

export interface GetLeaseDetails {
  /**
   * Retrieve all params for lease adjust
   */
  leaseAdjustParams: GetLeaseDetails_leaseAdjustParams | null;
  derivativeInfo: GetLeaseDetails_derivativeInfo | null;
}

export interface GetLeaseDetailsVariables {
  capIdDetails: string;
  vehicleType?: VehicleTypeEnum | null;
}
