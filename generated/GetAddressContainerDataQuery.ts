/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAddressContainerDataQuery
// ====================================================

export interface GetAddressContainerDataQuery_personByUuid_addresses {
  __typename: "AddressType";
  uuid: string;
  serviceId: string | null;
  lineOne: string;
  lineTwo: string | null;
  postcode: string;
  city: string;
  propertyStatus: string | null;
  startedOn: any | null;
}

export interface GetAddressContainerDataQuery_personByUuid {
  uuid: string;
  partyId: string;
  addresses: GetAddressContainerDataQuery_personByUuid_addresses[] | null;
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
   * Get all drop downs
   */
  allDropDowns: GetAddressContainerDataQuery_allDropDowns | null;
}

export interface GetAddressContainerDataQueryVariables {
  uuid: string;
}
