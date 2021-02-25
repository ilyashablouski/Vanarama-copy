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

export interface GetDerivative {
  /**
   * Find vehicle configuration by cap id
   */
  vehicleConfigurationByCapId: GetDerivative_vehicleConfigurationByCapId | null;
  derivative: GetDerivative_derivative | null;
  vehicleImages: (GetDerivative_vehicleImages | null)[] | null;
}

export interface GetDerivativeVariables {
  id: string;
  capId: number;
  vehicleType?: VehicleTypeEnum | null;
}
