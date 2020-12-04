/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductFilterListInputObject } from "./globalTypes";

// ====================================================
// GraphQL query operation: ProductsFilterList
// ====================================================

export interface ProductsFilterList_productsFilterList_transmissions_buckets {
  docCount: number;
  key: string;
}

export interface ProductsFilterList_productsFilterList_transmissions {
  docCount: number;
  buckets: ProductsFilterList_productsFilterList_transmissions_buckets[];
}

export interface ProductsFilterList_productsFilterList_fuelTypes_buckets {
  docCount: number;
  key: string;
}

export interface ProductsFilterList_productsFilterList_fuelTypes {
  docCount: number;
  buckets: ProductsFilterList_productsFilterList_fuelTypes_buckets[];
}

export interface ProductsFilterList_productsFilterList_bodyStyles_buckets {
  docCount: number;
  key: string;
}

export interface ProductsFilterList_productsFilterList_bodyStyles {
  docCount: number;
  buckets: ProductsFilterList_productsFilterList_bodyStyles_buckets[];
}

export interface ProductsFilterList_productsFilterList_terms_buckets {
  docCount: number;
  key: string;
}

export interface ProductsFilterList_productsFilterList_terms {
  docCount: number;
  buckets: ProductsFilterList_productsFilterList_terms_buckets[];
}

export interface ProductsFilterList_productsFilterList_mileages_buckets {
  docCount: number;
  key: string;
}

export interface ProductsFilterList_productsFilterList_mileages {
  docCount: number;
  buckets: ProductsFilterList_productsFilterList_mileages_buckets[];
}

export interface ProductsFilterList_productsFilterList_initialPeriods_buckets {
  docCount: number;
  key: string;
}

export interface ProductsFilterList_productsFilterList_initialPeriods {
  docCount: number;
  buckets: ProductsFilterList_productsFilterList_initialPeriods_buckets[];
}

export interface ProductsFilterList_productsFilterList_initialPayment_stats {
  min: number;
  max: number;
}

export interface ProductsFilterList_productsFilterList_initialPayment {
  stats: ProductsFilterList_productsFilterList_initialPayment_stats;
}

export interface ProductsFilterList_productsFilterList_rental_stats {
  min: number;
  max: number;
}

export interface ProductsFilterList_productsFilterList_rental {
  stats: ProductsFilterList_productsFilterList_rental_stats;
}

export interface ProductsFilterList_productsFilterList_manufacturers_buckets {
  docCount: number;
  key: string;
}

export interface ProductsFilterList_productsFilterList_manufacturers {
  docCount: number;
  buckets: ProductsFilterList_productsFilterList_manufacturers_buckets[];
}

export interface ProductsFilterList_productsFilterList_ranges_buckets {
  docCount: number;
  key: string;
}

export interface ProductsFilterList_productsFilterList_ranges {
  docCount: number;
  buckets: ProductsFilterList_productsFilterList_ranges_buckets[];
}

export interface ProductsFilterList_productsFilterList_models_buckets {
  docCount: number;
  key: string;
}

export interface ProductsFilterList_productsFilterList_models {
  docCount: number;
  buckets: ProductsFilterList_productsFilterList_models_buckets[];
}

export interface ProductsFilterList_productsFilterList {
  transmissions: ProductsFilterList_productsFilterList_transmissions | null;
  fuelTypes: ProductsFilterList_productsFilterList_fuelTypes | null;
  bodyStyles: ProductsFilterList_productsFilterList_bodyStyles | null;
  terms: ProductsFilterList_productsFilterList_terms | null;
  mileages: ProductsFilterList_productsFilterList_mileages | null;
  initialPeriods: ProductsFilterList_productsFilterList_initialPeriods | null;
  initialPayment: ProductsFilterList_productsFilterList_initialPayment | null;
  rental: ProductsFilterList_productsFilterList_rental | null;
  manufacturers: ProductsFilterList_productsFilterList_manufacturers | null;
  ranges: ProductsFilterList_productsFilterList_ranges | null;
  models: ProductsFilterList_productsFilterList_models | null;
}

export interface ProductsFilterList {
  /**
   * Search filters
   */
  productsFilterList: ProductsFilterList_productsFilterList | null;
}

export interface ProductsFilterListVariables {
  filter?: ProductFilterListInputObject | null;
}
