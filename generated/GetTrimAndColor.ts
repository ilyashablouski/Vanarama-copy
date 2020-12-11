/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetTrimAndColor
// ====================================================

export interface GetTrimAndColor_colourList {
  optionId: number | null;
  label: string | null;
}

export interface GetTrimAndColor_trimList {
  optionId: number | null;
  label: string | null;
}

export interface GetTrimAndColor {
  colourList: (GetTrimAndColor_colourList | null)[] | null;
  trimList: (GetTrimAndColor_trimList | null)[] | null;
}

export interface GetTrimAndColorVariables {
  capId: string;
  colourId?: number | null;
  trimId?: number | null;
  vehicleType: VehicleTypeEnum;
}
