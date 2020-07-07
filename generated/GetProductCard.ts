/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetProductCard
// ====================================================

export interface GetProductCard_productCard_keyInformation {
  name: string | null;
  value: string | null;
}

export interface GetProductCard_productCard {
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
  keyInformation: (GetProductCard_productCard_keyInformation | null)[] | null;
  businessRate: number | null;
  personalRate: number | null;
}

export interface GetProductCard {
  productCard: (GetProductCard_productCard | null)[] | null;
}

export interface GetProductCardVariables {
  capIds: string[];
  vehicleType?: VehicleTypeEnum | null;
}
