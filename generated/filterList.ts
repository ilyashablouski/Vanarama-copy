/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: filterList
// ====================================================

export interface filterList_filterList_groupedRanges {
  parent: string;
  children: string[];
}

export interface filterList_filterList {
  vehicleTypes: VehicleTypeEnum[] | null;
  groupedRanges: filterList_filterList_groupedRanges[] | null;
  bodyStyles: string[] | null;
  transmissions: string[] | null;
  fuelTypes: string[] | null;
}

export interface filterList {
  /**
   * Search filters
   */
  filterList: filterList_filterList | null;
}

export interface filterListVariables {
  vehicleTypes?: VehicleTypeEnum[] | null;
}
