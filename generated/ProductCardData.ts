/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: ProductCardData
// ====================================================

export interface ProductCardData_productCarousel_keyInformation {
  name: string | null;
  value: string | null;
}

export interface ProductCardData_productCarousel {
  capId: string | null;
  isOnOffer: boolean | null;
  manufacturerName: string | null;
  derivativeName: string | null;
  rangeName: string | null;
  modelName: string | null;
  imageUrl: string | null;
  leadTime: string | null;
  averageRating: number | null;
  businessRate: number | null;
  personalRate: number | null;
  offerPosition: number | null;
  keyInformation: (ProductCardData_productCarousel_keyInformation | null)[] | null;
  vehicleType: VehicleTypeEnum | null;
}

export interface ProductCardData {
  productCarousel: (ProductCardData_productCarousel | null)[] | null;
}

export interface ProductCardDataVariables {
  type: VehicleTypeEnum;
  bodyType?: string | null;
  excludeBodyType?: string | null;
  fuelTypes?: (string | null)[] | null;
  size?: number | null;
  offer?: boolean | null;
}
