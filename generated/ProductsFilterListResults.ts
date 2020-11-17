/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductFilterListInputObject } from "./globalTypes";

// ====================================================
// GraphQL query operation: ProductsFilterListResults
// ====================================================

export interface ProductsFilterListResults_productsFilterList_manufacturers_buckets {
  docCount: number;
  key: string;
}

export interface ProductsFilterListResults_productsFilterList_manufacturers {
  docCount: number;
  buckets: ProductsFilterListResults_productsFilterList_manufacturers_buckets[];
}

export interface ProductsFilterListResults_productsFilterList_ranges_buckets {
  docCount: number;
  key: string;
}

export interface ProductsFilterListResults_productsFilterList_ranges {
  docCount: number;
  buckets: ProductsFilterListResults_productsFilterList_ranges_buckets[];
}

export interface ProductsFilterListResults_productsFilterList_models_buckets {
  docCount: number;
  key: string;
}

export interface ProductsFilterListResults_productsFilterList_models {
  docCount: number;
  buckets: ProductsFilterListResults_productsFilterList_models_buckets[];
}

export interface ProductsFilterListResults_productsFilterList_initialPayment_stats {
  min: number;
  max: number;
}

export interface ProductsFilterListResults_productsFilterList_initialPayment {
  stats: ProductsFilterListResults_productsFilterList_initialPayment_stats;
}

export interface ProductsFilterListResults_productsFilterList_rental_stats {
  min: number;
  max: number;
}

export interface ProductsFilterListResults_productsFilterList_rental {
  stats: ProductsFilterListResults_productsFilterList_rental_stats;
}

export interface ProductsFilterListResults_productsFilterList {
  manufacturers: ProductsFilterListResults_productsFilterList_manufacturers | null;
  ranges: ProductsFilterListResults_productsFilterList_ranges | null;
  models: ProductsFilterListResults_productsFilterList_models | null;
  initialPayment: ProductsFilterListResults_productsFilterList_initialPayment | null;
  rental: ProductsFilterListResults_productsFilterList_rental | null;
}

export interface ProductsFilterListResults {
  /**
   * Search filters
   */
  productsFilterList: ProductsFilterListResults_productsFilterList | null;
}

export interface ProductsFilterListResultsVariables {
  filter?: ProductFilterListInputObject | null;
}
