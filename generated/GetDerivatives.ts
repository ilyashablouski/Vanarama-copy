/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetDerivatives
// ====================================================

export interface GetDerivatives_derivatives_manufacturer {
  name: string;
}

export interface GetDerivatives_derivatives_model {
  name: string;
}

export interface GetDerivatives_derivatives_fuelType {
  name: string;
}

export interface GetDerivatives_derivatives_transmission {
  name: string;
}

export interface GetDerivatives_derivatives {
  id: string;
  capCode: string;
  name: string;
  slug: string;
  manufacturer: GetDerivatives_derivatives_manufacturer;
  manufacturerName: string;
  model: GetDerivatives_derivatives_model;
  modelName: string;
  fuelType: GetDerivatives_derivatives_fuelType;
  fuelTypeName: string;
  transmission: GetDerivatives_derivatives_transmission;
  transmissionName: string;
}

export interface GetDerivatives {
  derivatives: GetDerivatives_derivatives[] | null;
}

export interface GetDerivativesVariables {
  ids?: string[] | null;
  vehicleType?: VehicleTypeEnum | null;
}
