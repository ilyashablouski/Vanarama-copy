/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetVehiclePublishState
// ====================================================

export interface GetVehiclePublishState_vehicleConfigurationByCapId {
  capDerivativeId: number;
  published: boolean;
}

export interface GetVehiclePublishState {
  /**
   * Find vehicle configuration by cap id
   */
  vehicleConfigurationByCapId: GetVehiclePublishState_vehicleConfigurationByCapId | null;
}

export interface GetVehiclePublishStateVariables {
  capId: number;
  vehicleType?: VehicleTypeEnum | null;
}
