/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AddressFormAddresses
// ====================================================

export interface AddressFormAddresses {
  __typename: "AddressType";
  uuid: string;
  serviceId: string | null;
  lineOne: string;
  lineTwo: string | null;
  lineThree: string | null;
  postcode: string;
  country: string | null;
  kind: string | null;
  endedOn: CustomDate | null;
  city: string;
  propertyStatus: string | null;
  startedOn: CustomDate | null;
}
