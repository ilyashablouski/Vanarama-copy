/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


// ====================================================
// GraphQL query operation: GetLeaseCompanyData
// ====================================================


export interface GetLeaseCompanyData_creditApplicationByOrderUuid_aboutDetailsV2_addresses {
  city: string | null;
  country: string | null;
  county: string | null;
  endedOn: CustomDate | null;
  kind: string | null;
  lineOne: string | null;
  lineThree: string | null;
  lineTwo: string | null;
  postcode: string | null;
  propertyStatus: string | null;
  serviceId: string | null;
  startedOn: CustomDate | null;
  uuid: string | null;
}

export interface GetLeaseCompanyData_creditApplicationByOrderUuid_aboutDetailsV2_emailAddresses {
  kind: string | null;
  primary: boolean | null;
  uuid: string | null;
  value: string | null;
}

export interface GetLeaseCompanyData_creditApplicationByOrderUuid_aboutDetailsV2_history_address {
  city: string | null;
  country: string | null;
  county: string | null;
  endedOn: CustomDate | null;
  kind: string | null;
  lineOne: string | null;
  lineThree: string | null;
  lineTwo: string | null;
  postcode: string | null;
  propertyStatus: string | null;
  serviceId: string | null;
  startedOn: CustomDate | null;
  uuid: string | null;
}

export interface GetLeaseCompanyData_creditApplicationByOrderUuid_aboutDetailsV2_history {
  address: GetLeaseCompanyData_creditApplicationByOrderUuid_aboutDetailsV2_history_address | null;
  month: string | null;
  status: string;
  year: string | null;
}

export interface GetLeaseCompanyData_creditApplicationByOrderUuid_aboutDetailsV2_telephoneNumbers {
  kind: string | null;
  primary: boolean | null;
  uuid: string | null;
  value: string | null;
}

export interface GetLeaseCompanyData_creditApplicationByOrderUuid_aboutDetailsV2 {
  addresses: GetLeaseCompanyData_creditApplicationByOrderUuid_aboutDetailsV2_addresses[] | null;
  businessShare: number | null;
  cognitoSub: string | null;
  companyType: string | null;
  countryOfBirth: string | null;
  dateOfBirth: CustomDate | null;
  dayOfBirth: string | null;
  disabilityRegistered: boolean | null;
  email: string | null;
  emailAddresses: GetLeaseCompanyData_creditApplicationByOrderUuid_aboutDetailsV2_emailAddresses[] | null;
  emailConsent: boolean | null;
  firstName: string;
  gender: string | null;
  history: GetLeaseCompanyData_creditApplicationByOrderUuid_aboutDetailsV2_history[] | null;
  isApplicant: boolean | null;
  isDirector: boolean | null;
  jobTitle: string | null;
  lastName: string;
  leadManagerId: string | null;
  maritalStatus: string | null;
  middleName: string | null;
  monthOfBirth: string | null;
  nationality: string | null;
  noOfAdultsInHousehold: string | null;
  noOfDependants: string | null;
  numberOfDependants: string | null;
  occupation: string | null;
  originalFirstName: string | null;
  originalLastName: string | null;
  partyUuid: string | null;
  privacyPolicy: boolean | null;
  profilingConsent: boolean | null;
  shareOfBusiness: number | null;
  smsConsent: boolean | null;
  telephoneNumbers: GetLeaseCompanyData_creditApplicationByOrderUuid_aboutDetailsV2_telephoneNumbers[] | null;
  termsAndConditions: boolean | null;
  title: string | null;
  tradingName: string | null;
  uuid: string | null;
  vatRegistrationNumber: string | null;
  yearOfBirth: string | null;
}

export interface GetLeaseCompanyData_creditApplicationByOrderUuid_lineItem_vehicleProduct {
  funderId: string | null;
  funderData: CustomJson | null;
}

export interface GetLeaseCompanyData_creditApplicationByOrderUuid_lineItem {
  vehicleProduct: GetLeaseCompanyData_creditApplicationByOrderUuid_lineItem_vehicleProduct | null;
}

export interface GetLeaseCompanyData_creditApplicationByOrderUuid {
  submittedAt: CustomDateTime | null;
  aboutDetailsV2: GetLeaseCompanyData_creditApplicationByOrderUuid_aboutDetailsV2 | null;
  lineItem: GetLeaseCompanyData_creditApplicationByOrderUuid_lineItem | null;
}

export interface GetLeaseCompanyData {
  /**
   * Find credit application by order uuid
   */
  creditApplicationByOrderUuid: GetLeaseCompanyData_creditApplicationByOrderUuid | null;
}

export interface GetLeaseCompanyDataVariables {
  id: string;
}
