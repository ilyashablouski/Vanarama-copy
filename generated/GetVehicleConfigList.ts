/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetVehicleConfigList
// ====================================================

export interface GetVehicleConfigList_vehicleConfigurationByConfigId {
  published: boolean;
  configId: string;
}

export interface GetVehicleConfigList {
  /**
   * Return vehicles by its configuration id
   */
  vehicleConfigurationByConfigId: GetVehicleConfigList_vehicleConfigurationByConfigId[] | null;
}

export interface GetVehicleConfigListVariables {
  configIds: string[];
}
