/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetColourAndTrimGroupList
// ====================================================

export interface GetColourAndTrimGroupList_colourGroupList_options {
  label: string | null;
  optionId: number | null;
  hotOffer: boolean | null;
}

export interface GetColourAndTrimGroupList_colourGroupList {
  leadTime: string | null;
  options: (GetColourAndTrimGroupList_colourGroupList_options | null)[] | null;
}

export interface GetColourAndTrimGroupList_trimGroupList_options {
  label: string | null;
  optionId: number | null;
  hotOffer: boolean | null;
}

export interface GetColourAndTrimGroupList_trimGroupList {
  leadTime: string | null;
  options: (GetColourAndTrimGroupList_trimGroupList_options | null)[] | null;
}

export interface GetColourAndTrimGroupList {
  colourGroupList: (GetColourAndTrimGroupList_colourGroupList | null)[] | null;
  trimGroupList: (GetColourAndTrimGroupList_trimGroupList | null)[] | null;
}

export interface GetColourAndTrimGroupListVariables {
  capId: string;
  vehicleType: VehicleTypeEnum;
  colourId: number;
}
