/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CompanyAssociates
// ====================================================

export interface CompanyAssociates_roles {
  position: string | null;
}

export interface CompanyAssociates_addresses {
  serviceId: string | null;
  propertyStatus: string | null;
  startedOn: any | null;
}

export interface CompanyAssociates {
  uuid: string;
  title: string | null;
  firstName: string;
  lastName: string;
  gender: string | null;
  dateOfBirth: any | null;
  noOfDependants: string | null;
  businessShare: number | null;
  roles: CompanyAssociates_roles[] | null;
  addresses: CompanyAssociates_addresses[] | null;
}
