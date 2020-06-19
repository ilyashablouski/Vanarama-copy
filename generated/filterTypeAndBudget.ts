/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: filterTypeAndBudget
// ====================================================

export interface filterTypeAndBudget_filterList {
  vehicleTypes: VehicleTypeEnum[] | null;
  bodyStyles: string[] | null;
  financeProfilesRateMax: number | null;
  financeProfilesRateMin: number | null;
}

export interface filterTypeAndBudget {
  /**
   * Search filters
   */
  filterList: filterTypeAndBudget_filterList | null;
}

export interface filterTypeAndBudgetVariables {
  vehicleTypes?: VehicleTypeEnum[] | null;
  manufacturerName?: string | null;
  rangeName?: string | null;
}
