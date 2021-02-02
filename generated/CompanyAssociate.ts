/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CompanyAssociate
// ====================================================

export interface CompanyAssociate_roles {
  position: string | null;
}

export interface CompanyAssociate_addresses {
  serviceId: string | null;
  propertyStatus: string | null;
  startedOn: any | null;
  city: string;
  lineOne: string;
  lineTwo: string | null;
  postcode: string;
}

export interface CompanyAssociate {
  uuid: string;
  title: string | null;
  firstName: string;
  lastName: string;
  gender: string | null;
  dateOfBirth: any | null;
  noOfDependants: string | null;
  nationality: string | null;
  businessShare: number | null;
  roles: CompanyAssociate_roles[] | null;
  addresses: CompanyAssociate_addresses[] | null;
}
