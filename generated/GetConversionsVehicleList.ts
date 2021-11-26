/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum, ConversionTypeEnum, LeaseTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetConversionsVehicleList
// ====================================================

export interface GetConversionsVehicleList_conversions_keyInformation {
  name: string | null;
  value: string | null;
}

export interface GetConversionsVehicleList_conversions_lowestPrices {
  leaseType: LeaseTypeEnum | null;
  value: number | null;
}

export interface GetConversionsVehicleList_conversions {
  type: string | null;
  conversionId: number | null;
  vehicleType: VehicleTypeEnum | null;
  capId: string | null;
  manufacturerName: string | null;
  rangeName: string | null;
  modelName: string | null;
  derivativeName: string | null;
  averageRating: number | null;
  isOnOffer: boolean | null;
  offerPosition: number | null;
  imageUrl: string | null;
  conversionImages: (string | null)[] | null;
  availability: number | null;
  leadTime: string | null;
  keyInformation: (GetConversionsVehicleList_conversions_keyInformation | null)[] | null;
  lowestPrices: (GetConversionsVehicleList_conversions_lowestPrices | null)[] | null;
}

export interface GetConversionsVehicleList {
  conversions: (GetConversionsVehicleList_conversions | null)[] | null;
}

export interface GetConversionsVehicleListVariables {
  conversionsCapIds?: (string | null)[] | null;
  conversionsVehicleType?: VehicleTypeEnum | null;
  conversionsOnOffer?: boolean | null;
  conversionsConversionTypes?: (ConversionTypeEnum | null)[] | null;
}
