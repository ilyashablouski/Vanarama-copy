/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetB2BAboutPageData
// ====================================================

export interface GetB2BAboutPageData_allDropDowns_titles {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface GetB2BAboutPageData_allDropDowns {
  __typename: "DropDownType";
  titles: GetB2BAboutPageData_allDropDowns_titles;
}

export interface GetB2BAboutPageData {
  /**
   * get all drop downs
   */
  allDropDowns: GetB2BAboutPageData_allDropDowns | null;
}
