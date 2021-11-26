/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: VehicleConfigurationByUrl
// ====================================================

export interface VehicleConfigurationByUrl_vehicleConfigurationByUrl {
  uuid: string;
  capDerivativeId: number;
}

export interface VehicleConfigurationByUrl {
  /**
   * Find vehicle configuration by url
   */
  vehicleConfigurationByUrl: VehicleConfigurationByUrl_vehicleConfigurationByUrl | null;
}

export interface VehicleConfigurationByUrlVariables {
  url: string;
}
