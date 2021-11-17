/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetColourAndTrimGroupList
// ====================================================

export interface GetColourAndTrimGroupList_colourGroupList_colours {
  label: string | null;
  optionId: number | null;
  hotOffer: boolean | null;
}

export interface GetColourAndTrimGroupList_colourGroupList {
  leadTime: string | null;
  colours: (GetColourAndTrimGroupList_colourGroupList_colours | null)[] | null;
}

export interface GetColourAndTrimGroupList_trimGroupList_trims {
  label: string | null;
  optionId: number | null;
  hotOffer: boolean | null;
}

export interface GetColourAndTrimGroupList_trimGroupList {
  leadTime: string | null;
  trims: (GetColourAndTrimGroupList_trimGroupList_trims | null)[] | null;
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
