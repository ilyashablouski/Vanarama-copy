/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: filterTypeAndBudget
// ====================================================

export interface filterTypeAndBudget_filterList_groupedRangesWithSlug_parent {
  label: string | null;
  slug: string | null;
}

export interface filterTypeAndBudget_filterList_groupedRangesWithSlug_children {
  label: string | null;
  slug: string | null;
}

export interface filterTypeAndBudget_filterList_groupedRangesWithSlug {
  parent: filterTypeAndBudget_filterList_groupedRangesWithSlug_parent;
  children: filterTypeAndBudget_filterList_groupedRangesWithSlug_children[];
}

export interface filterTypeAndBudget_filterList {
  vehicleTypes: VehicleTypeEnum[] | null;
  bodyStyles: string[] | null;
  financeProfilesRateMax: number | null;
  financeProfilesRateMin: number | null;
  groupedRangesWithSlug: filterTypeAndBudget_filterList_groupedRangesWithSlug[] | null;
}

export interface filterTypeAndBudget {
  /**
   * Search filters
   */
  filterList: filterTypeAndBudget_filterList | null;
}

export interface filterTypeAndBudgetVariables {
  vehicleTypes?: VehicleTypeEnum[] | null;
  manufacturerSlug?: string | null;
  rangeSlug?: string | null;
  bodyStyles?: string[] | null;
}
