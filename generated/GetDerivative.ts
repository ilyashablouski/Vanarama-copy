/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetDerivative
// ====================================================

export interface GetDerivative_derivative_manufacturer {
  name: string;
}

export interface GetDerivative_derivative_model {
  name: string;
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
}

export interface GetDerivative_derivative {
  id: string;
  capCode: string;
  name: string;
  slug: string;
  manufacturer: GetDerivative_derivative_manufacturer;
  manufacturerName: string;
  model: GetDerivative_derivative_model;
  modelName: string;
  fuelType: GetDerivative_derivative_fuelType;
  fuelTypeName: string;
  transmission: GetDerivative_derivative_transmission;
  transmissionName: string;
  bodyStyle: GetDerivative_derivative_bodyStyle | null;
  bodyStyleName: string | null;
  range: GetDerivative_derivative_range;
  rangeName: string;
}

export interface GetDerivative {
  derivative: GetDerivative_derivative | null;
}

export interface GetDerivativeVariables {
  id: string;
  vehicleType?: VehicleTypeEnum | null;
}
