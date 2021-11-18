/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


import { VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetDerivative
// ====================================================


export interface GetDerivative_vehicleConfigurationByCapId {
  url: string | null;
  onOffer: boolean | null;
  capModelDescription: string;
  vehicleType: VehicleTypeEnum;
  capManufacturerDescription: string;
}

export interface GetDerivative_derivative_bodyType {
  name: string | null;
  slug: string;
}

export interface GetDerivative_derivative_manufacturer {
  name: string;
  slug: string;
}

export interface GetDerivative_derivative_model {
  name: string;
  slug: string;
}

export interface GetDerivative_derivative_fuelType {
  name: string;
}

export interface GetDerivative_derivative_transmission {
  name: string;
}

export interface GetDerivative_derivative_bodyStyle {
  name: string | null;
}

export interface GetDerivative_derivative_range {
  name: string;
  slug: string;
}

export interface GetDerivative_derivative {
  id: string;
  vehicleType: VehicleTypeEnum;
  capCode: string;
  name: string;
  slug: string;
  bodyType: GetDerivative_derivative_bodyType;
  manufacturer: GetDerivative_derivative_manufacturer;
  model: GetDerivative_derivative_model;
  fuelType: GetDerivative_derivative_fuelType;
  transmission: GetDerivative_derivative_transmission;
  bodyStyle: GetDerivative_derivative_bodyStyle | null;
  range: GetDerivative_derivative_range;
}

export interface GetDerivative_vehicleImages {
  vehicleType: VehicleTypeEnum | null;
  capId: number | null;
  mainImageUrl: string | null;
}

export interface GetDerivative_vehicleDetails_roadsideAssistance {
  years: number | null;
}

export interface GetDerivative_vehicleDetails_warrantyDetails {
  years: number | null;
  mileage: number | null;
}

export interface GetDerivative_vehicleDetails {
  roadsideAssistance: GetDerivative_vehicleDetails_roadsideAssistance | null;
  warrantyDetails: GetDerivative_vehicleDetails_warrantyDetails | null;
  freeInsurance: boolean | null;
}

export interface GetDerivative {
  /**
   * Find vehicle configuration by cap id
   */
  vehicleConfigurationByCapId: GetDerivative_vehicleConfigurationByCapId | null;
  derivative: GetDerivative_derivative | null;
  vehicleImages: (GetDerivative_vehicleImages | null)[] | null;
  vehicleDetails: GetDerivative_vehicleDetails | null;
}

export interface GetDerivativeVariables {
  id: string;
  capId: number;
  vehicleType?: VehicleTypeEnum | null;
}
