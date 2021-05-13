/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GlobalSearchCardsData
// ====================================================

export interface GlobalSearchCardsData_productCard_keyInformation {
  name: string | null;
  value: string | null;
}

export interface GlobalSearchCardsData_productCard {
  averageRating: number | null;
  capId: string | null;
  imageUrl: string | null;
  vehicleType: VehicleTypeEnum | null;
  keyInformation: (GlobalSearchCardsData_productCard_keyInformation | null)[] | null;
}

export interface GlobalSearchCardsData {
  productCard: (GlobalSearchCardsData_productCard | null)[] | null;
}

export interface GlobalSearchCardsDataVariables {
  capIds: string[];
  vehicleType?: VehicleTypeEnum | null;
}
