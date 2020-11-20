/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum, LeaseTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: bodyStyleList
// ====================================================

export interface bodyStyleList_bodyStyleList {
  bodyStyle: string | null;
  count: number | null;
  minPrice: number | null;
  capId: number | null;
}

export interface bodyStyleList {
  /**
   * Find Body Styles
   */
  bodyStyleList: bodyStyleList_bodyStyleList[] | null;
}

export interface bodyStyleListVariables {
  vehicleTypes?: VehicleTypeEnum | null;
  leaseType?: LeaseTypeEnum | null;
  manufacturerSlug: string;
  rangeSlug: string;
}
