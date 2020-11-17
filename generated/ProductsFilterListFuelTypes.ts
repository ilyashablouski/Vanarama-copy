/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductFilterListInputObject } from "./globalTypes";

// ====================================================
// GraphQL query operation: ProductsFilterListFuelTypes
// ====================================================

export interface ProductsFilterListFuelTypes_productsFilterList_fuelTypes_buckets {
  docCount: number;
  key: string;
}

export interface ProductsFilterListFuelTypes_productsFilterList_fuelTypes {
  docCount: number;
  buckets: ProductsFilterListFuelTypes_productsFilterList_fuelTypes_buckets[];
}

export interface ProductsFilterListFuelTypes_productsFilterList {
  fuelTypes: ProductsFilterListFuelTypes_productsFilterList_fuelTypes | null;
}

export interface ProductsFilterListFuelTypes {
  /**
   * Search filters
   */
  productsFilterList: ProductsFilterListFuelTypes_productsFilterList | null;
}

export interface ProductsFilterListFuelTypesVariables {
  filter?: ProductFilterListInputObject | null;
}
