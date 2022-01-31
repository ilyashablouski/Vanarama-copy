/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { vType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GenericPageCarouselData
// ====================================================

export interface GenericPageCarouselData_genericPage_productFilter {
  title: string | null;
  manufacturer: (string | null)[] | null;
  vehicleType: (vType | null)[] | null;
  range: (string | null)[] | null;
  bodyType: (string | null)[] | null;
  fuelType: (string | null)[] | null;
  transmission: (string | null)[] | null;
}

export interface GenericPageCarouselData_genericPage {
  carouselPosition: (string | null)[] | null;
  productFilter: GenericPageCarouselData_genericPage_productFilter | null;
}

export interface GenericPageCarouselData {
  genericPage: GenericPageCarouselData_genericPage;
}

export interface GenericPageCarouselDataVariables {
  slug: string;
}
