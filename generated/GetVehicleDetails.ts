/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum, LeaseTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetVehicleDetails
// ====================================================

export interface GetVehicleDetails_vehicleConfigurationByCapId_financeProfile {
  leaseType: LeaseTypeEnum;
  term: number;
  mileage: number;
  upfront: number;
}

export interface GetVehicleDetails_vehicleConfigurationByCapId {
  uuid: string;
  capManufacturerDescription: string;
  capRangeDescription: string;
  capModelDescription: string;
  capDerivativeDescription: string;
  capPaintDescription: string;
  capTrimDescription: string;
  onOffer: boolean | null;
  offerRanking: number | null;
  url: string | null;
  legacyUrl: string | null;
  financeProfile: GetVehicleDetails_vehicleConfigurationByCapId_financeProfile | null;
}

export interface GetVehicleDetails_standardEquipment_standardEquipment {
  name: string | null;
}

export interface GetVehicleDetails_standardEquipment {
  name: string | null;
  standardEquipment: (GetVehicleDetails_standardEquipment_standardEquipment | null)[] | null;
}

export interface GetVehicleDetails_vehicleDetails_keyInformation {
  name: string | null;
  value: string | null;
}

export interface GetVehicleDetails_vehicleDetails_vehicleHighlights {
  id: string | null;
  name: string | null;
  value: string | null;
}

export interface GetVehicleDetails_vehicleDetails_warrantyDetails {
  years: number | null;
  mileage: number | null;
}

export interface GetVehicleDetails_vehicleDetails_relatedVehicles {
  capId: string | null;
  displayOrder: string | null;
}

export interface GetVehicleDetails_vehicleDetails_customerReviews {
  rating: number | null;
  review: string | null;
  name: string | null;
}

export interface GetVehicleDetails_vehicleDetails_rangeFaqs {
  question: string | null;
  answer: string | null;
}

export interface GetVehicleDetails_vehicleDetails_roadsideAssistance {
  years: number | null;
}

export interface GetVehicleDetails_vehicleDetails {
  averageRating: number | null;
  brochureUrl: string | null;
  keyInformation: (GetVehicleDetails_vehicleDetails_keyInformation | null)[] | null;
  vehicleHighlights: (GetVehicleDetails_vehicleDetails_vehicleHighlights | null)[] | null;
  independentReview: string | null;
  warrantyDetails: GetVehicleDetails_vehicleDetails_warrantyDetails | null;
  relatedVehicles: (GetVehicleDetails_vehicleDetails_relatedVehicles | null)[] | null;
  customerReviews: (GetVehicleDetails_vehicleDetails_customerReviews | null)[] | null;
  rangeFaqs: (GetVehicleDetails_vehicleDetails_rangeFaqs | null)[] | null;
  vehicleValue: number | null;
  roadsideAssistance: GetVehicleDetails_vehicleDetails_roadsideAssistance | null;
  freeInsurance: boolean | null;
}

export interface GetVehicleDetails_derivativeInfo_manufacturer {
  name: string;
  slug: string;
}

export interface GetVehicleDetails_derivativeInfo_range {
  name: string;
  slug: string;
}

export interface GetVehicleDetails_derivativeInfo_fuelType {
  name: string;
}

export interface GetVehicleDetails_derivativeInfo_transmission {
  name: string;
}

export interface GetVehicleDetails_derivativeInfo_bodyStyle {
  name: string | null;
}

export interface GetVehicleDetails_derivativeInfo_bodyType {
  name: string | null;
  slug: string;
}

export interface GetVehicleDetails_derivativeInfo_model {
  name: string;
  slug: string;
}

export interface GetVehicleDetails_derivativeInfo_technicals {
  id: string;
  derivativeId: string;
  technicalDescription: string;
  technicalLongDescription: string;
  categoryDescription: string;
  effectiveFrom: CustomDateTime;
  effectiveTo: CustomDateTime | null;
  value: string;
  unit: string | null;
}

export interface GetVehicleDetails_derivativeInfo_colours {
  id: string;
  optionDescription: string;
}

export interface GetVehicleDetails_derivativeInfo_trims {
  id: string;
  optionDescription: string;
}

export interface GetVehicleDetails_derivativeInfo {
  name: string;
  manufacturer: GetVehicleDetails_derivativeInfo_manufacturer;
  range: GetVehicleDetails_derivativeInfo_range;
  fuelType: GetVehicleDetails_derivativeInfo_fuelType;
  transmission: GetVehicleDetails_derivativeInfo_transmission;
  bodyStyle: GetVehicleDetails_derivativeInfo_bodyStyle | null;
  bodyType: GetVehicleDetails_derivativeInfo_bodyType;
  model: GetVehicleDetails_derivativeInfo_model;
  technicals: (GetVehicleDetails_derivativeInfo_technicals | null)[];
  colours: (GetVehicleDetails_derivativeInfo_colours | null)[] | null;
  trims: (GetVehicleDetails_derivativeInfo_trims | null)[] | null;
}

export interface GetVehicleDetails_leaseAdjustParams {
  mileages: number[];
  terms: number[];
  upfronts: number[];
}

export interface GetVehicleDetails_vehicleImages_colourImages {
  colourName: string | null;
  imageUrls: (string | null)[] | null;
}

export interface GetVehicleDetails_vehicleImages {
  vehicleType: VehicleTypeEnum | null;
  capId: number | null;
  mainImageUrl: string | null;
  imageUrls: (string | null)[] | null;
  colourImages: (GetVehicleDetails_vehicleImages_colourImages | null)[] | null;
  videoUrl: string | null;
  threeSixtyVideoUrl: string | null;
}

export interface GetVehicleDetails {
  /**
   * Find vehicle configuration by cap id
   */
  vehicleConfigurationByCapId: GetVehicleDetails_vehicleConfigurationByCapId | null;
  standardEquipment: (GetVehicleDetails_standardEquipment | null)[] | null;
  vehicleDetails: GetVehicleDetails_vehicleDetails | null;
  derivativeInfo: GetVehicleDetails_derivativeInfo | null;
  /**
   * Retrieve all params for lease adjust
   */
  leaseAdjustParams: GetVehicleDetails_leaseAdjustParams | null;
  vehicleImages: (GetVehicleDetails_vehicleImages | null)[] | null;
}

export interface GetVehicleDetailsVariables {
  capId: number;
  capIdDetails: string;
  vehicleType?: VehicleTypeEnum | null;
  leaseType?: LeaseTypeEnum | null;
}
