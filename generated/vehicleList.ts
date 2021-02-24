/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum, RateInputObject, LeaseTypeEnum, SortObject } from "./globalTypes";

// ====================================================
// GraphQL query operation: vehicleList
// ====================================================

export interface vehicleList_vehicleList_pageInfo {
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
}

export interface vehicleList_vehicleList_edges_node_financeProfiles {
  leaseType: LeaseTypeEnum;
  rate: number | null;
  term: number;
  upfront: number;
  upfrontPayment: number;
  mileage: number;
  maintained: boolean | null;
}

export interface vehicleList_vehicleList_edges_node {
  url: string | null;
  legacyUrl: string | null;
  vehicleType: VehicleTypeEnum | null;
  offerRanking: number | null;
  onOffer: boolean | null;
  derivativeId: string | null;
  capCode: string | null;
  manufacturerName: string | null;
  modelName: string | null;
  derivativeName: string | null;
  bodyStyle: string | null;
  transmission: string | null;
  fuelType: string | null;
  financeProfiles: vehicleList_vehicleList_edges_node_financeProfiles[] | null;
}

export interface vehicleList_vehicleList_edges {
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: vehicleList_vehicleList_edges_node | null;
}

export interface vehicleList_vehicleList {
  totalCount: number;
  /**
   * Information to aid in pagination.
   */
  pageInfo: vehicleList_vehicleList_pageInfo;
  /**
   * A list of edges.
   */
  edges: (vehicleList_vehicleList_edges | null)[] | null;
}

export interface vehicleList {
  /**
   * Find Vehicle by filter
   */
  vehicleList: vehicleList_vehicleList;
}

export interface vehicleListVariables {
  vehicleTypes?: VehicleTypeEnum[] | null;
  onOffer?: boolean | null;
  after?: string | null;
  manufacturerSlug?: string | null;
  rangeSlug?: string | null;
  rate?: RateInputObject | null;
  bodyStyles?: string[] | null;
  transmissions?: string[] | null;
  fuelTypes?: string[] | null;
  first?: number | null;
  leaseType?: LeaseTypeEnum | null;
  sort?: SortObject[] | null;
}
