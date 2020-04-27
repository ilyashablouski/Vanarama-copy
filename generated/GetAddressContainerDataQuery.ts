/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAddressContainerDataQuery
// ====================================================

export interface GetAddressContainerDataQuery_personByUuid {
  uuid: string;
  partyId: string;
}

export interface GetAddressContainerDataQuery_allDropDowns_propertyStatuses {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface GetAddressContainerDataQuery_allDropDowns {
  __typename: "DropDownType";
  propertyStatuses: GetAddressContainerDataQuery_allDropDowns_propertyStatuses;
}

export interface GetAddressContainerDataQuery {
  /**
   * Find Person by Uuid
   */
  personByUuid: GetAddressContainerDataQuery_personByUuid | null;
  /**
   * get all drop downs
   */
  allDropDowns: GetAddressContainerDataQuery_allDropDowns | null;
}

export interface GetAddressContainerDataQueryVariables {
  uuid: string;
}
