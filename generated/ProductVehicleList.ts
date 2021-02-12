/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductVehicleListInputObject, FinanceTypeEnum, VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: ProductVehicleList
// ====================================================

export interface ProductVehicleList_productVehicleList_pageInfo {
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
}

export interface ProductVehicleList_productVehicleList_aggs_financeType {
  key: string | null;
  docCount: number | null;
}

export interface ProductVehicleList_productVehicleList_aggs_vehicleType {
  key: string | null;
  docCount: number | null;
}

export interface ProductVehicleList_productVehicleList_aggs_transmission {
  key: string | null;
  docCount: number | null;
}

export interface ProductVehicleList_productVehicleList_aggs_fuelType {
  key: string | null;
  docCount: number | null;
}

export interface ProductVehicleList_productVehicleList_aggs_capBodyStyle {
  key: string | null;
  docCount: number | null;
}

export interface ProductVehicleList_productVehicleList_aggs_term {
  key: string | null;
  docCount: number | null;
}

export interface ProductVehicleList_productVehicleList_aggs_mileage {
  key: string | null;
  docCount: number | null;
}

export interface ProductVehicleList_productVehicleList_aggs_initialPeriod {
  key: string | null;
  docCount: number | null;
}

export interface ProductVehicleList_productVehicleList_aggs_availability {
  key: string | null;
  docCount: number | null;
}

export interface ProductVehicleList_productVehicleList_aggs_rental {
  key: string | null;
  docCount: number | null;
}

export interface ProductVehicleList_productVehicleList_aggs_initialPayment {
  key: string | null;
  docCount: number | null;
}

export interface ProductVehicleList_productVehicleList_aggs {
  financeType: ProductVehicleList_productVehicleList_aggs_financeType[] | null;
  vehicleType: ProductVehicleList_productVehicleList_aggs_vehicleType[] | null;
  transmission: ProductVehicleList_productVehicleList_aggs_transmission[] | null;
  fuelType: ProductVehicleList_productVehicleList_aggs_fuelType[] | null;
  capBodyStyle: ProductVehicleList_productVehicleList_aggs_capBodyStyle[] | null;
  term: ProductVehicleList_productVehicleList_aggs_term[] | null;
  mileage: ProductVehicleList_productVehicleList_aggs_mileage[] | null;
  initialPeriod: ProductVehicleList_productVehicleList_aggs_initialPeriod[] | null;
  availability: ProductVehicleList_productVehicleList_aggs_availability[] | null;
  rental: ProductVehicleList_productVehicleList_aggs_rental[] | null;
  initialPayment: ProductVehicleList_productVehicleList_aggs_initialPayment[] | null;
}

export interface ProductVehicleList_productVehicleList_edges_node {
  financeType: FinanceTypeEnum | null;
  vehicleType: VehicleTypeEnum | null;
  manufacturerName: string | null;
  modelName: string | null;
  rental: number | null;
  initialPayment: number | null;
  rangeName: string | null;
  transmission: string | null;
  fuelType: string | null;
  capBodyStyle: string | null;
  term: number | null;
  mileage: number | null;
  availability: number | null;
  capId: string | null;
  derivativeId: string | null;
  derivativeName: string | null;
}

export interface ProductVehicleList_productVehicleList_edges {
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: ProductVehicleList_productVehicleList_edges_node | null;
}

export interface ProductVehicleList_productVehicleList {
  totalCount: number;
  nodesCount: number;
  /**
   * Information to aid in pagination.
   */
  pageInfo: ProductVehicleList_productVehicleList_pageInfo;
  aggs: ProductVehicleList_productVehicleList_aggs;
  /**
   * A list of edges.
   */
  edges: (ProductVehicleList_productVehicleList_edges | null)[] | null;
}

export interface ProductVehicleList {
  /**
   * Help me choose vehicle list
   */
  productVehicleList: ProductVehicleList_productVehicleList | null;
}

export interface ProductVehicleListVariables {
  filter?: ProductVehicleListInputObject | null;
  first?: number | null;
}
