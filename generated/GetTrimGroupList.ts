/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetTrimGroupList
// ====================================================

export interface GetTrimGroupList_trimGroupList_trims {
  label: string | null;
  optionId: number | null;
  hotOffer: boolean | null;
}

export interface GetTrimGroupList_trimGroupList {
  leadTime: string | null;
  trims: (GetTrimGroupList_trimGroupList_trims | null)[] | null;
}

export interface GetTrimGroupList {
  trimGroupList: (GetTrimGroupList_trimGroupList | null)[] | null;
}

export interface GetTrimGroupListVariables {
  capId: string;
  vehicleType: VehicleTypeEnum;
  colourId: number;
}
