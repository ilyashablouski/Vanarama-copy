/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: VehicleListTotalCount
// ====================================================

export interface VehicleListTotalCount_vehicleList {
  totalCount: number;
}

export interface VehicleListTotalCount {
  /**
   * Find Vehicle by filter
   */
  vehicleList: VehicleListTotalCount_vehicleList;
}

export interface VehicleListTotalCountVariables {
  vehicleTypes?: VehicleTypeEnum[] | null;
  onOffer?: boolean | null;
  bodyStyles?: string[] | null;
}
