/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SummaryFormSoleTrader
// ====================================================

export interface SummaryFormSoleTrader_addresses {
  serviceId: string | null;
  kind: string | null;
  lineOne: string;
  lineTwo: string | null;
  country: string;
  city: string;
  postcode: string;
}

export interface SummaryFormSoleTrader_emailAddresses {
  kind: string | null;
  value: string;
}

export interface SummaryFormSoleTrader_telephoneNumbers {
  kind: string | null;
  value: string;
}

export interface SummaryFormSoleTrader_turnoverPercentageOutsideUk {
  country: string;
  percentage: string;
}

export interface SummaryFormSoleTrader_associates_emailAddresses {
  __typename: "EmailAddressType";
  primary: boolean;
  value: string;
}

export interface SummaryFormSoleTrader_associates_addresses {
  __typename: "AddressType";
  serviceId: string | null;
  lineOne: string;
  lineTwo: string | null;
  postcode: string;
  city: string;
  propertyStatus: string | null;
  startedOn: any | null;
}

export interface SummaryFormSoleTrader_associates_incomeAndExpense {
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

export interface SummaryFormSoleTrader_associates {
  __typename: "PersonType";
  title: string | null;
  firstName: string;
  lastName: string;
  gender: string | null;
  emailAddresses: SummaryFormSoleTrader_associates_emailAddresses[];
  dateOfBirth: any | null;
  countryOfBirth: string | null;
  nationality: string | null;
  addresses: SummaryFormSoleTrader_associates_addresses[] | null;
  maritalStatus: string | null;
  noOfAdultsInHousehold: string | null;
  noOfDependants: string | null;
  occupation: string | null;
  incomeAndExpense: SummaryFormSoleTrader_associates_incomeAndExpense | null;
  uuid: string;
}

export interface SummaryFormSoleTrader_bankAccounts {
  __typename: "BankAccountType";
  uuid: string;
  accountName: string | null;
  accountNumber: string | null;
  joinedAt: any | null;
  sortCode: string | null;
  updatedAt: any | null;
}

export interface SummaryFormSoleTrader {
  __typename: "CompanyType";
  uuid: string;
  tradingName: string | null;
  monthlyAmountBeingReplaced: number | null;
  annualTurnover: number | null;
  companyNature: string | null;
  annualSalesCost: number | null;
  annualExpenses: number | null;
  vehicleRegistrationNumber: string | null;
  companyType: string | null;
  tradingSince: any | null;
  addresses: SummaryFormSoleTrader_addresses[] | null;
  emailAddresses: SummaryFormSoleTrader_emailAddresses[];
  telephoneNumbers: SummaryFormSoleTrader_telephoneNumbers[] | null;
  isVatRegistered: boolean | null;
  tradesOutsideUk: boolean | null;
  turnoverPercentageOutsideUk: SummaryFormSoleTrader_turnoverPercentageOutsideUk[] | null;
  vatNumber: string | null;
  associates: SummaryFormSoleTrader_associates[] | null;
  bankAccounts: SummaryFormSoleTrader_bankAccounts[] | null;
}
