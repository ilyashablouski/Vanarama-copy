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

export interface GetDerivatives_derivatives_bodyStyle {
  name: string | null;
}

export interface GetDerivatives_derivatives_range {
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
  bodyStyle: GetDerivatives_derivatives_bodyStyle | null;
  bodyStyleName: string | null;
  range: GetDerivatives_derivatives_range;
  rangeName: string;
}

export interface GetDerivatives_vehicleImages {
  vehicleType: VehicleTypeEnum | null;
  capId: number | null;
  mainImageUrl: string | null;
}

export interface GetDerivatives {
  derivatives: GetDerivatives_derivatives[] | null;
  vehicleImages: (GetDerivatives_vehicleImages | null)[] | null;
}

export interface GetDerivativesVariables {
  ids: string[];
  vehicleType?: VehicleTypeEnum | null;
}
