/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SoleTraderDetailsFormDataQuery
// ====================================================

export interface SoleTraderDetailsFormDataQuery_allDropDowns_titles {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface SoleTraderDetailsFormDataQuery_allDropDowns_countries {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface SoleTraderDetailsFormDataQuery_allDropDowns_nationalities {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface SoleTraderDetailsFormDataQuery_allDropDowns_maritalStatuses {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface SoleTraderDetailsFormDataQuery_allDropDowns_noOfDependants {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface SoleTraderDetailsFormDataQuery_allDropDowns_noOfAdultsInHousehold {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface SoleTraderDetailsFormDataQuery_allDropDowns_propertyStatuses {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface SoleTraderDetailsFormDataQuery_allDropDowns {
  __typename: "DropDownType";
  titles: SoleTraderDetailsFormDataQuery_allDropDowns_titles;
  countries: SoleTraderDetailsFormDataQuery_allDropDowns_countries;
  nationalities: SoleTraderDetailsFormDataQuery_allDropDowns_nationalities;
  maritalStatuses: SoleTraderDetailsFormDataQuery_allDropDowns_maritalStatuses;
  noOfDependants: SoleTraderDetailsFormDataQuery_allDropDowns_noOfDependants;
  noOfAdultsInHousehold: SoleTraderDetailsFormDataQuery_allDropDowns_noOfAdultsInHousehold;
  propertyStatuses: SoleTraderDetailsFormDataQuery_allDropDowns_propertyStatuses;
}

export interface SoleTraderDetailsFormDataQuery_companyByUuid_associates_emailAddresses {
  __typename: "EmailAddressType";
  primary: boolean;
  value: string;
}

export interface SoleTraderDetailsFormDataQuery_companyByUuid_associates_addresses {
  __typename: "AddressType";
  serviceId: string | null;
  lineOne: string;
  lineTwo: string | null;
  postcode: string;
  city: string;
  propertyStatus: string | null;
  startedOn: any | null;
}

export interface SoleTraderDetailsFormDataQuery_companyByUuid_associates_incomeAndExpense {
  __typename: "IncomeAndExpenseType";
  averageMonthlyIncome: number;
  annualIncome: number | null;
  totalMonthlyExpenses: number | null;
  mortgageOrRent: number | null;
  studentLoan: number | null;
  anticipateMonthlyIncomeChange: boolean;
  futureMonthlyIncome: number | null;
  suitabilityConsent: boolean | null;
}

export interface SoleTraderDetailsFormDataQuery_companyByUuid_associates {
  __typename: "PersonType";
  title: string | null;
  firstName: string;
  lastName: string;
  gender: string | null;
  emailAddresses: SoleTraderDetailsFormDataQuery_companyByUuid_associates_emailAddresses[];
  dateOfBirth: any | null;
  countryOfBirth: string | null;
  nationality: string | null;
  addresses: SoleTraderDetailsFormDataQuery_companyByUuid_associates_addresses[] | null;
  maritalStatus: string | null;
  noOfAdultsInHousehold: string | null;
  noOfDependants: string | null;
  occupation: string | null;
  incomeAndExpense: SoleTraderDetailsFormDataQuery_companyByUuid_associates_incomeAndExpense | null;
  uuid: string;
}

export interface SoleTraderDetailsFormDataQuery_companyByUuid {
  __typename: "CompanyType";
  uuid: string;
  associates: SoleTraderDetailsFormDataQuery_companyByUuid_associates[] | null;
}

export interface SoleTraderDetailsFormDataQuery_personByUuid_emailAddresses {
  __typename: "EmailAddressType";
  primary: boolean;
  value: string;
}

export interface SoleTraderDetailsFormDataQuery_personByUuid_addresses {
  __typename: "AddressType";
  serviceId: string | null;
  lineOne: string;
  lineTwo: string | null;
  postcode: string;
  city: string;
  propertyStatus: string | null;
  startedOn: any | null;
}

export interface SoleTraderDetailsFormDataQuery_personByUuid {
  __typename: "PersonType";
  uuid: string;
  title: string | null;
  firstName: string;
  lastName: string;
  gender: string | null;
  emailAddresses: SoleTraderDetailsFormDataQuery_personByUuid_emailAddresses[];
  dateOfBirth: any | null;
  countryOfBirth: string | null;
  nationality: string | null;
  addresses: SoleTraderDetailsFormDataQuery_personByUuid_addresses[] | null;
  maritalStatus: string | null;
  noOfAdultsInHousehold: string | null;
  noOfDependants: string | null;
}

export interface SoleTraderDetailsFormDataQuery {
  /**
   * Get all drop downs
   */
  allDropDowns: SoleTraderDetailsFormDataQuery_allDropDowns | null;
  /**
   * Find Company by Uuid
   */
  companyByUuid: SoleTraderDetailsFormDataQuery_companyByUuid | null;
  /**
   * Find Person by Uuid
   */
  personByUuid: SoleTraderDetailsFormDataQuery_personByUuid | null;
}

export interface SoleTraderDetailsFormDataQueryVariables {
  personUuid: string;
  companyUuid: string;
}
