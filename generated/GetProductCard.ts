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
  modelName: string | null;
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

export interface GetProductCard_derivatives_manufacturer {
  name: string;
  slug: string;
}

export interface GetProductCard_derivatives_model {
  name: string;
  slug: string;
}

export interface GetProductCard_derivatives_fuelType {
  name: string;
}

export interface GetProductCard_derivatives_transmission {
  name: string;
}

export interface GetProductCard_derivatives_bodyStyle {
  name: string | null;
}

export interface GetProductCard_derivatives_range {
  name: string;
  slug: string;
}

export interface GetProductCard_derivatives {
  id: string;
  capCode: string;
  name: string;
  slug: string;
  manufacturer: GetProductCard_derivatives_manufacturer;
  model: GetProductCard_derivatives_model;
  fuelType: GetProductCard_derivatives_fuelType;
  transmission: GetProductCard_derivatives_transmission;
  bodyStyle: GetProductCard_derivatives_bodyStyle | null;
  range: GetProductCard_derivatives_range;
}

export interface GetProductCard_vehicleList_edges_node {
  derivativeId: string | null;
  url: string | null;
  legacyUrl: string | null;
  vehicleType: VehicleTypeEnum | null;
}

export interface GetProductCard_vehicleList_edges {
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: GetProductCard_vehicleList_edges_node | null;
}

export interface GetProductCard_vehicleList {
  /**
   * A list of edges.
   */
  edges: (GetProductCard_vehicleList_edges | null)[] | null;
}

export interface GetProductCard {
  productCard: (GetProductCard_productCard | null)[] | null;
  derivatives: GetProductCard_derivatives[] | null;
  /**
   * Find Vehicle by filter
   */
  vehicleList: GetProductCard_vehicleList;
}

export interface GetProductCardVariables {
  capIds: string[];
  vehicleType?: VehicleTypeEnum | null;
}
