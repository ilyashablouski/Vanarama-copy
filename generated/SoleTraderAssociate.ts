/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SoleTraderAssociate
// ====================================================

export interface SoleTraderAssociate_associates_emailAddresses {
  __typename: "EmailAddressType";
  primary: boolean;
  value: string;
}

export interface SoleTraderAssociate_associates_addresses {
  __typename: "AddressType";
  serviceId: string | null;
  lineOne: string;
  lineTwo: string | null;
  postcode: string;
  city: string;
  propertyStatus: string | null;
  startedOn: any | null;
}

export interface SoleTraderAssociate_associates_incomeAndExpense {
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

export interface SoleTraderAssociate_associates {
  __typename: "PersonType";
  title: string | null;
  firstName: string;
  lastName: string;
  gender: string | null;
  emailAddresses: SoleTraderAssociate_associates_emailAddresses[];
  dateOfBirth: any | null;
  countryOfBirth: string | null;
  nationality: string | null;
  addresses: SoleTraderAssociate_associates_addresses[] | null;
  maritalStatus: string | null;
  noOfAdultsInHousehold: string | null;
  noOfDependants: string | null;
  occupation: string | null;
  incomeAndExpense: SoleTraderAssociate_associates_incomeAndExpense | null;
  uuid: string;
}

export interface SoleTraderAssociate {
  __typename: "CompanyType";
  uuid: string;
  associates: SoleTraderAssociate_associates[] | null;
}
