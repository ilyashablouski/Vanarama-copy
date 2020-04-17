/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEmploymentContainerDataQuery
// ====================================================

export interface GetEmploymentContainerDataQuery_personById {
  id: string;
  partyId: string;
}

export interface GetEmploymentContainerDataQuery_allDropDowns_employmentStatuses {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface GetEmploymentContainerDataQuery_allDropDowns {
  __typename: "DropDownType";
  employmentStatuses: GetEmploymentContainerDataQuery_allDropDowns_employmentStatuses;
}

export interface GetEmploymentContainerDataQuery {
  /**
   * Find Person by Id
   */
  personById: GetEmploymentContainerDataQuery_personById | null;
  /**
   * get all drop downs
   */
  allDropDowns: GetEmploymentContainerDataQuery_allDropDowns | null;
}

export interface GetEmploymentContainerDataQueryVariables {
  id: string;
}
