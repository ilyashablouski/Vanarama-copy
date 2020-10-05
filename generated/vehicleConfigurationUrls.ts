/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: vehicleConfigurationUrls
// ====================================================

export interface vehicleConfigurationUrls_vehicleConfigurationUrls_pageInfo {
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
}

export interface vehicleConfigurationUrls_vehicleConfigurationUrls_edges_node {
  url: string;
  vehicleType: VehicleTypeEnum;
  legacy: boolean;
  bodyStyle: string;
}

export interface vehicleConfigurationUrls_vehicleConfigurationUrls_edges {
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: vehicleConfigurationUrls_vehicleConfigurationUrls_edges_node | null;
}

export interface vehicleConfigurationUrls_vehicleConfigurationUrls {
  /**
   * Information to aid in pagination.
   */
  pageInfo: vehicleConfigurationUrls_vehicleConfigurationUrls_pageInfo;
  totalCount: number;
  nodesCount: number;
  /**
   * A list of edges.
   */
  edges: (vehicleConfigurationUrls_vehicleConfigurationUrls_edges | null)[] | null;
}

export interface vehicleConfigurationUrls {
  /**
   * Find vehicle configuration urls
   */
  vehicleConfigurationUrls: vehicleConfigurationUrls_vehicleConfigurationUrls;
}

export interface vehicleConfigurationUrlsVariables {
  first?: number | null;
  after?: string | null;
}
