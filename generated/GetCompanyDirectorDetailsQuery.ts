/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCompanyDirectorDetailsQuery
// ====================================================

export interface GetCompanyDirectorDetailsQuery_companyByUuid_associates_roles {
  position: string | null;
}

export interface GetCompanyDirectorDetailsQuery_companyByUuid_associates_addresses {
  serviceId: string | null;
  propertyStatus: string | null;
  startedOn: any | null;
  city: string;
  lineOne: string;
  lineTwo: string | null;
  postcode: string;
}

export interface GetCompanyDirectorDetailsQuery_companyByUuid_associates {
  uuid: string;
  title: string | null;
  firstName: string;
  lastName: string;
  gender: string | null;
  dateOfBirth: any | null;
  noOfDependants: string | null;
  businessShare: number | null;
  roles: GetCompanyDirectorDetailsQuery_companyByUuid_associates_roles[] | null;
  addresses: GetCompanyDirectorDetailsQuery_companyByUuid_associates_addresses[] | null;
}

export interface GetCompanyDirectorDetailsQuery_companyByUuid {
  uuid: string;
  companyNumber: string | null;
  associates: GetCompanyDirectorDetailsQuery_companyByUuid_associates[] | null;
}

export interface GetCompanyDirectorDetailsQuery {
  /**
   * Find Company by Uuid
   */
  companyByUuid: GetCompanyDirectorDetailsQuery_companyByUuid | null;
}

export interface GetCompanyDirectorDetailsQueryVariables {
  uuid: string;
}
