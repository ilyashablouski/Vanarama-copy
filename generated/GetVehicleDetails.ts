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

export interface GetVehicleDetails_vehicleDetails {
  averageRating: number | null;
  brochureUrl: string | null;
}

export interface GetVehicleDetails {
  /**
   * Find vehicle configuration by cap id
   */
  vehicleConfigurationByCapId: GetVehicleDetails_vehicleConfigurationByCapId | null;
  vehicleDetails: GetVehicleDetails_vehicleDetails | null;
}

export interface GetVehicleDetailsVariables {
  capId: number;
  capIdDetails: string;
  vehicleType?: VehicleTypeEnum | null;
}
