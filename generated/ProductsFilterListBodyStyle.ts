/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductFilterListInputObject } from "./globalTypes";

// ====================================================
// GraphQL query operation: ProductsFilterListBodyStyle
// ====================================================

export interface ProductsFilterListBodyStyle_productsFilterList_bodyStyles_buckets {
  docCount: number;
  key: string;
}

export interface ProductsFilterListBodyStyle_productsFilterList_bodyStyles {
  docCount: number;
  buckets: ProductsFilterListBodyStyle_productsFilterList_bodyStyles_buckets[];
}

export interface ProductsFilterListBodyStyle_productsFilterList {
  bodyStyles: ProductsFilterListBodyStyle_productsFilterList_bodyStyles | null;
}

export interface ProductsFilterListBodyStyle {
  /**
   * Search filters
   */
  productsFilterList: ProductsFilterListBodyStyle_productsFilterList | null;
}

export interface ProductsFilterListBodyStyleVariables {
  filter?: ProductFilterListInputObject | null;
}
