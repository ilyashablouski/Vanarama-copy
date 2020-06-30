/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetProductCards
// ====================================================

export interface GetProductCards_productCards_keyInformation {
  name: string | null;
  value: string | null;
}

export interface GetProductCards_productCards {
  vehicleType: VehicleTypeEnum | null;
  capId: string | null;
  manufacturerName: string | null;
  rangeName: string | null;
  derivativeName: string | null;
  averageRating: number | null;
  isOnOffer: boolean | null;
  offerPosition: number | null;
  leadTime: string | null;
  imageUrl: string | null;
  keyInformation: (GetProductCards_productCards_keyInformation | null)[] | null;
  businessRate: number | null;
  personalRate: number | null;
}

export interface GetProductCards {
  productCards: (GetProductCards_productCards | null)[] | null;
}

export interface GetProductCardsVariables {
  capIds?: string[] | null;
  vehicleType?: VehicleTypeEnum | null;
}
