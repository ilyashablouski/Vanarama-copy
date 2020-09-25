/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: VehicleListUrl
// ====================================================

export interface VehicleListUrl_vehicleList_pageInfo {
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

export interface VehicleListUrl_vehicleList_edges_node {
  derivativeId: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface VehicleListUrl_vehicleList_edges {
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: VehicleListUrl_vehicleList_edges_node | null;
}

export interface VehicleListUrl_vehicleList {
  totalCount: number;
  /**
   * Information to aid in pagination.
   */
  pageInfo: VehicleListUrl_vehicleList_pageInfo;
  /**
   * A list of edges.
   */
  edges: (VehicleListUrl_vehicleList_edges | null)[] | null;
}

export interface VehicleListUrl {
  /**
   * Find Vehicle by filter
   */
  vehicleList: VehicleListUrl_vehicleList;
}

export interface VehicleListUrlVariables {
  derivativeIds?: string[] | null;
}
