/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetVatDetailsCountries
// ====================================================

export interface GetVatDetailsCountries_allDropDowns_countries {
  data: string[];
  favourites: string[];
}

export interface GetVatDetailsCountries_allDropDowns {
  countries: GetVatDetailsCountries_allDropDowns_countries;
}

export interface GetVatDetailsCountries {
  /**
   * Get all drop downs
   */
  allDropDowns: GetVatDetailsCountries_allDropDowns | null;
}
