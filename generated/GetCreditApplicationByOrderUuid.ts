/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum, CreditApplicationTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCreditApplicationByOrderUuid
// ====================================================

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_aboutDetailsV2_addresses {
  city: string | null;
  country: string | null;
  county: string | null;
  endedOn: any | null;
  kind: string | null;
  lineOne: string | null;
  lineThree: string | null;
  lineTwo: string | null;
  postcode: string | null;
  propertyStatus: string | null;
  serviceId: string | null;
  startedOn: any | null;
  uuid: string | null;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_aboutDetailsV2_emailAddresses {
  kind: string | null;
  primary: boolean | null;
  uuid: string | null;
  value: string | null;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_aboutDetailsV2_history_address {
  city: string | null;
  country: string | null;
  county: string | null;
  endedOn: any | null;
  kind: string | null;
  lineOne: string | null;
  lineThree: string | null;
  lineTwo: string | null;
  postcode: string | null;
  propertyStatus: string | null;
  serviceId: string | null;
  startedOn: any | null;
  uuid: string | null;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_aboutDetailsV2_history {
  address: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_aboutDetailsV2_history_address | null;
  month: string | null;
  status: string;
  year: string | null;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_aboutDetailsV2_telephoneNumbers {
  kind: string | null;
  primary: boolean | null;
  uuid: string | null;
  value: string | null;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_aboutDetailsV2 {
  addresses: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_aboutDetailsV2_addresses[] | null;
  businessShare: number | null;
  cognitoSub: string | null;
  companyType: string | null;
  countryOfBirth: string | null;
  dateOfBirth: any | null;
  dayOfBirth: string | null;
  disabilityRegistered: boolean | null;
  email: string | null;
  emailAddresses: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_aboutDetailsV2_emailAddresses[] | null;
  emailConsent: boolean | null;
  firstName: string;
  gender: string | null;
  history: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_aboutDetailsV2_history[] | null;
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
  telephoneNumbers: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_aboutDetailsV2_telephoneNumbers[] | null;
  termsAndConditions: boolean | null;
  title: string | null;
  tradingName: string | null;
  uuid: string | null;
  vatRegistrationNumber: string | null;
  yearOfBirth: string | null;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_bankAccountsV2 {
  uuid: string | null;
  accountName: string | null;
  accountNumber: string | null;
  bankName: string | null;
  joinedAt: any | null;
  joinedAtMonth: string | null;
  joinedAtYear: string | null;
  sortCode: string | null;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_companyDetailsV2_addresses {
  city: string | null;
  country: string | null;
  county: string | null;
  endedOn: any | null;
  kind: string | null;
  lineOne: string | null;
  lineThree: string | null;
  lineTwo: string | null;
  postcode: string | null;
  propertyStatus: string | null;
  serviceId: string | null;
  startedOn: any | null;
  uuid: string | null;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_companyDetailsV2_emailAddresses {
  kind: string | null;
  primary: boolean | null;
  uuid: string | null;
  value: string | null;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_companyDetailsV2_telephoneNumbers {
  kind: string | null;
  primary: boolean | null;
  uuid: string | null;
  value: string | null;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_companyDetailsV2 {
  addresses: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_companyDetailsV2_addresses[] | null;
  annualExpenses: number | null;
  annualSalesCost: number | null;
  annualTurnover: number | null;
  businessName: string | null;
  businessRegistrationNumber: string | null;
  companySearchResult: any | null;
  companyType: string | null;
  emailAddresses: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_companyDetailsV2_emailAddresses[] | null;
  monthlyAmountBeingReplaced: number | null;
  natureOfBusiness: string | null;
  otherCountriesOfActivity: string[] | null;
  partyUuid: string | null;
  replaceExistingVehicleFinance: boolean | null;
  sicCode: string | null;
  sicIndustry: string | null;
  telephoneNumbers: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_companyDetailsV2_telephoneNumbers[] | null;
  tradesOutsideUk: boolean | null;
  tradingSince: any | null;
  turnoverOutsideUk: number | null;
  uuid: string | null;
  withTradingAddress: boolean | null;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_directorsDetailsV2_directors_addresses {
  city: string | null;
  country: string | null;
  county: string | null;
  endedOn: any | null;
  kind: string | null;
  lineOne: string | null;
  lineThree: string | null;
  lineTwo: string | null;
  postcode: string | null;
  propertyStatus: string | null;
  serviceId: string | null;
  startedOn: any | null;
  uuid: string | null;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_directorsDetailsV2_directors_emailAddresses {
  kind: string | null;
  primary: boolean | null;
  uuid: string | null;
  value: string | null;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_directorsDetailsV2_directors_history_address {
  city: string | null;
  country: string | null;
  county: string | null;
  endedOn: any | null;
  kind: string | null;
  lineOne: string | null;
  lineThree: string | null;
  lineTwo: string | null;
  postcode: string | null;
  propertyStatus: string | null;
  serviceId: string | null;
  startedOn: any | null;
  uuid: string | null;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_directorsDetailsV2_directors_history {
  address: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_directorsDetailsV2_directors_history_address | null;
  month: string | null;
  status: string;
  year: string | null;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_directorsDetailsV2_directors_incomeAndExpense {
  annualIncome: number | null;
  anticipateMonthlyIncomeChange: boolean | null;
  averageMonthlyIncome: number | null;
  carFinance: number | null;
  creditCardPayments: number | null;
  foodAndClothes: number | null;
  fuel: number | null;
  futureMonthlyIncome: number | null;
  householdIncome: number | null;
  insurance: number | null;
  mortgageOrRent: number | null;
  netDisposableIncome: number | null;
  otherCredit: number | null;
  phoneAndInternet: number | null;
  studentLoan: number | null;
  suitabilityConsent: boolean | null;
  totalMonthlyExpenses: number | null;
  utilities: number | null;
  uuid: string | null;
  withStudentLoan: boolean | null;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_directorsDetailsV2_directors_telephoneNumbers {
  kind: string | null;
  primary: boolean | null;
  uuid: string | null;
  value: string | null;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_directorsDetailsV2_directors {
  addresses: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_directorsDetailsV2_directors_addresses[] | null;
  businessShare: number | null;
  cognitoSub: string | null;
  companyType: string | null;
  countryOfBirth: string | null;
  dateOfBirth: any | null;
  dayOfBirth: string | null;
  disabilityRegistered: boolean | null;
  email: string | null;
  emailAddresses: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_directorsDetailsV2_directors_emailAddresses[] | null;
  emailConsent: boolean | null;
  firstName: string;
  gender: string | null;
  history: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_directorsDetailsV2_directors_history[] | null;
  incomeAndExpense: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_directorsDetailsV2_directors_incomeAndExpense | null;
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
  telephoneNumbers: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_directorsDetailsV2_directors_telephoneNumbers[] | null;
  termsAndConditions: boolean | null;
  title: string | null;
  tradingName: string | null;
  uuid: string | null;
  vatRegistrationNumber: string | null;
  yearOfBirth: string | null;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_directorsDetailsV2 {
  directors: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_directorsDetailsV2_directors[] | null;
  totalPercentage: number | null;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_lineItem_creditApplications {
  uuid: string;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_lineItem_order {
  partyUuid: string | null;
  uuid: string;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_lineItem_vehicleProduct {
  derivativeCapId: string;
  description: string | null;
  vsku: string | null;
  term: number | null;
  annualMileage: number | null;
  monthlyPayment: number | null;
  depositMonths: number | null;
  funderId: string | null;
  funderData: any | null;
  depositPayment: number | null;
  vehicleType: VehicleTypeEnum;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_lineItem {
  uuid: string;
  quantity: number;
  status: string | null;
  productId: string;
  productType: string;
  creditApplications: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_lineItem_creditApplications[] | null;
  order: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_lineItem_order | null;
  vehicleProduct: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_lineItem_vehicleProduct | null;
}

export interface GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid {
  addresses: any | null;
  aboutDetailsV2: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_aboutDetailsV2 | null;
  bankAccountsV2: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_bankAccountsV2[] | null;
  companyDetailsV2: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_companyDetailsV2 | null;
  vatDetails: any | null;
  soleTraderDetails: any | null;
  directorsDetailsV2: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_directorsDetailsV2 | null;
  employmentHistories: any | null;
  incomeAndExpenses: any | null;
  lineItem: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid_lineItem | null;
  creditApplicationType: CreditApplicationTypeEnum | null;
  leadManagerProposalId: string | null;
  createdAt: any | null;
  status: string;
  updatedAt: any | null;
  uuid: string;
}

export interface GetCreditApplicationByOrderUuid {
  /**
   * Find credit application by order uuid
   */
  creditApplicationByOrderUuid: GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid | null;
}

export interface GetCreditApplicationByOrderUuidVariables {
  id: string;
}
