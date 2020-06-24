/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetVehicleDetails
// ====================================================

export interface GetVehicleDetails_vehicleConfigurationByCapId {
  uuid: string;
  capManufacturerDescription: string;
  capModelDescription: string;
  capDerivativeDescription: string;
  capPaintDescription: string;
  capTrimDescription: string;
  onOffer: boolean | null;
  offerRanking: number | null;
}

export interface GetVehicleDetails_vehicleDetails_keyInformation {
  name: string | null;
  value: string | null;
}

export interface GetVehicleDetails_vehicleDetails {
  averageRating: number | null;
  brochureUrl: string | null;
  keyInformation: (GetVehicleDetails_vehicleDetails_keyInformation | null)[] | null;
  independentReview: string | null;
}

export interface GetVehicleDetails_derivativeInfo_technicals {
  id: string;
  derivativeId: string;
  technicalDescription: string;
  technicalLongDescription: string;
  categoryDescription: string;
  effectiveFrom: any;
  effectiveTo: any | null;
  value: string;
}

export interface GetVehicleDetails_derivativeInfo_standardEquipments {
  id: string;
  derivativeId: string;
  optionDescription: string;
  optionLongDescription: string;
  categoryDescription: string;
  genericDescription: string | null;
  effectiveFrom: any;
  effectiveTo: any | null;
}

export interface GetVehicleDetails_derivativeInfo_colours {
  id: string;
  optionDescription: string;
}

export interface GetVehicleDetails_derivativeInfo_trims {
  id: string;
  optionDescription: string;
}

export interface GetVehicleDetails_derivativeInfo {
  technicals: (GetVehicleDetails_derivativeInfo_technicals | null)[];
  standardEquipments: (GetVehicleDetails_derivativeInfo_standardEquipments | null)[];
  colours: (GetVehicleDetails_derivativeInfo_colours | null)[] | null;
  trims: (GetVehicleDetails_derivativeInfo_trims | null)[] | null;
}

export interface GetVehicleDetails_leaseAdjustParams {
    mileages: number[];
    terms: number[]
    upfronts: number[];
}

export interface GetVehicleDetails {
  /**
   * Find vehicle configuration by cap id
   */
  vehicleConfigurationByCapId: GetVehicleDetails_vehicleConfigurationByCapId | null;
  vehicleDetails: GetVehicleDetails_vehicleDetails | null;
  derivativeInfo: GetVehicleDetails_derivativeInfo | null;
  leaseAdjustParams: GetVehicleDetails_leaseAdjustParams | null;
}

export interface GetVehicleDetailsVariables {
  capId: number;
  capIdDetails: string;
  vehicleType?: VehicleTypeEnum | null;
}
