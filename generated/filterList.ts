/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: filterList
// ====================================================

export interface filterList_filterList_groupedRangesWithSlug_parent {
  label: string | null;
  slug: string | null;
}

export interface filterList_filterList_groupedRangesWithSlug_children {
  label: string | null;
  slug: string | null;
}

export interface filterList_filterList_groupedRangesWithSlug {
  parent: filterList_filterList_groupedRangesWithSlug_parent;
  children: filterList_filterList_groupedRangesWithSlug_children[];
}

export interface filterList_filterList {
  vehicleTypes: VehicleTypeEnum[] | null;
  groupedRangesWithSlug: filterList_filterList_groupedRangesWithSlug[] | null;
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
  onOffer?: boolean | null;
  manufacturerSlug?: string | null;
  rangeSlug?: string | null;
  bodyStyles?: string[] | null;
  transmissions?: string[] | null;
  fuelTypes?: string[] | null;
}
