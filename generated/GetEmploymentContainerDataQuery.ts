/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEmploymentContainerDataQuery
// ====================================================

export interface GetEmploymentContainerDataQuery_personByUuid_employmentHistories {
  __typename: "EmploymentHistoryType";
  uuid: string;
  companyAddressServiceId: string | null;
  companyAddressCity: string | null;
  companyAddressLineOne: string | null;
  companyAddressLineTwo: string | null;
  companyAddressPostcode: string | null;
  companyName: string | null;
  contract: string | null;
  employedSinceDate: any | null;
  employmentStatus: string | null;
  grossAnnualIncome: number | null;
  jobTitle: string | null;
  workPhoneNumber: string | null;
}

export interface GetEmploymentContainerDataQuery_personByUuid {
  uuid: string;
  partyId: string;
  employmentHistories: GetEmploymentContainerDataQuery_personByUuid_employmentHistories[] | null;
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
   * Find Person by Uuid
   */
  personByUuid: GetEmploymentContainerDataQuery_personByUuid | null;
  /**
   * get all drop downs
   */
  allDropDowns: GetEmploymentContainerDataQuery_allDropDowns | null;
}

export interface GetEmploymentContainerDataQueryVariables {
  uuid: string;
}
