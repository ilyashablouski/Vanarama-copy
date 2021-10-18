/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreditApplicationInputObject, VehicleTypeEnum, CreditApplicationTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateUpdateCreditApplication
// ====================================================

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_aboutDetailsV2_addresses {
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

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_aboutDetailsV2_emailAddresses {
  kind: string | null;
  primary: boolean | null;
  uuid: string | null;
  value: string | null;
}

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_aboutDetailsV2_history_address {
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

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_aboutDetailsV2_history {
  address: CreateUpdateCreditApplication_createUpdateCreditApplication_aboutDetailsV2_history_address | null;
  month: string | null;
  status: string;
  year: string | null;
}

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_aboutDetailsV2_telephoneNumbers {
  kind: string | null;
  primary: boolean | null;
  uuid: string | null;
  value: string | null;
}

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_aboutDetailsV2 {
  addresses: CreateUpdateCreditApplication_createUpdateCreditApplication_aboutDetailsV2_addresses[] | null;
  businessShare: number | null;
  cognitoSub: string | null;
  companyType: string | null;
  countryOfBirth: string | null;
  dateOfBirth: CustomDate | null;
  dayOfBirth: string | null;
  disabilityRegistered: boolean | null;
  email: string | null;
  emailAddresses: CreateUpdateCreditApplication_createUpdateCreditApplication_aboutDetailsV2_emailAddresses[] | null;
  emailConsent: boolean | null;
  firstName: string;
  gender: string | null;
  history: CreateUpdateCreditApplication_createUpdateCreditApplication_aboutDetailsV2_history[] | null;
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
  telephoneNumbers: CreateUpdateCreditApplication_createUpdateCreditApplication_aboutDetailsV2_telephoneNumbers[] | null;
  termsAndConditions: boolean | null;
  title: string | null;
  tradingName: string | null;
  uuid: string | null;
  vatRegistrationNumber: string | null;
  yearOfBirth: string | null;
}

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_bankAccountsV2 {
  uuid: string | null;
  accountName: string | null;
  accountNumber: string | null;
  bankName: string | null;
  joinedAt: CustomDate | null;
  joinedAtMonth: string | null;
  joinedAtYear: string | null;
  sortCode: string | null;
}

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_companyDetailsV2_addresses {
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

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_companyDetailsV2_emailAddresses {
  kind: string | null;
  primary: boolean | null;
  uuid: string | null;
  value: string | null;
}

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_companyDetailsV2_telephoneNumbers {
  kind: string | null;
  primary: boolean | null;
  uuid: string | null;
  value: string | null;
}

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_companyDetailsV2 {
  addresses: CreateUpdateCreditApplication_createUpdateCreditApplication_companyDetailsV2_addresses[] | null;
  previouslyTradingSoletrader: boolean | null;
  annualExpenses: number | null;
  annualSalesCost: number | null;
  annualTurnover: number | null;
  businessName: string | null;
  businessRegistrationNumber: string | null;
  companySearchResult: CustomJson | null;
  companyType: string | null;
  emailAddresses: CreateUpdateCreditApplication_createUpdateCreditApplication_companyDetailsV2_emailAddresses[] | null;
  monthlyAmountBeingReplaced: number | null;
  natureOfBusiness: string | null;
  otherCountriesOfActivity: string[] | null;
  partyUuid: string | null;
  replaceExistingVehicleFinance: boolean | null;
  sicCode: string | null;
  sicIndustry: string | null;
  telephoneNumbers: CreateUpdateCreditApplication_createUpdateCreditApplication_companyDetailsV2_telephoneNumbers[] | null;
  tradesOutsideUk: boolean | null;
  tradingSince: CustomDate | null;
  turnoverOutsideUk: number | null;
  uuid: string | null;
  withTradingAddress: boolean | null;
}

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_vatDetailsV2_markets {
  country: string;
  percentage: string;
}

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_vatDetailsV2 {
  markets: CreateUpdateCreditApplication_createUpdateCreditApplication_vatDetailsV2_markets[] | null;
  outsideUk: boolean | null;
  vatNumber: string | null;
  vatRegistered: boolean | null;
}

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_directorsDetailsV2_directors_addresses {
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

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_directorsDetailsV2_directors_emailAddresses {
  kind: string | null;
  primary: boolean | null;
  uuid: string | null;
  value: string | null;
}

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_directorsDetailsV2_directors_history_address {
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

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_directorsDetailsV2_directors_history {
  address: CreateUpdateCreditApplication_createUpdateCreditApplication_directorsDetailsV2_directors_history_address | null;
  month: string | null;
  status: string;
  year: string | null;
}

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_directorsDetailsV2_directors_incomeAndExpense {
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

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_directorsDetailsV2_directors_telephoneNumbers {
  kind: string | null;
  primary: boolean | null;
  uuid: string | null;
  value: string | null;
}

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_directorsDetailsV2_directors {
  addresses: CreateUpdateCreditApplication_createUpdateCreditApplication_directorsDetailsV2_directors_addresses[] | null;
  businessShare: number | null;
  cognitoSub: string | null;
  companyType: string | null;
  countryOfBirth: string | null;
  dateOfBirth: CustomDate | null;
  dayOfBirth: string | null;
  disabilityRegistered: boolean | null;
  email: string | null;
  emailAddresses: CreateUpdateCreditApplication_createUpdateCreditApplication_directorsDetailsV2_directors_emailAddresses[] | null;
  emailConsent: boolean | null;
  firstName: string;
  gender: string | null;
  history: CreateUpdateCreditApplication_createUpdateCreditApplication_directorsDetailsV2_directors_history[] | null;
  incomeAndExpense: CreateUpdateCreditApplication_createUpdateCreditApplication_directorsDetailsV2_directors_incomeAndExpense | null;
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
  telephoneNumbers: CreateUpdateCreditApplication_createUpdateCreditApplication_directorsDetailsV2_directors_telephoneNumbers[] | null;
  termsAndConditions: boolean | null;
  title: string | null;
  tradingName: string | null;
  uuid: string | null;
  vatRegistrationNumber: string | null;
  yearOfBirth: string | null;
}

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_directorsDetailsV2 {
  directors: CreateUpdateCreditApplication_createUpdateCreditApplication_directorsDetailsV2_directors[] | null;
  totalPercentage: number | null;
}

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_lineItem_creditApplications {
  uuid: string;
}

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_lineItem_order {
  partyUuid: string | null;
  uuid: string;
}

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_lineItem_vehicleProduct_freeInsurance {
  optIn: boolean | null;
  eligible: boolean | null;
}

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_lineItem_vehicleProduct {
  derivativeCapId: string;
  description: string | null;
  vsku: string | null;
  financeType: string | null;
  depositPayment: number | null;
  monthlyPayment: number | null;
  term: number | null;
  finalPayment: number | null;
  leadTime: string | null;
  annualMileage: number | null;
  depositMonths: number | null;
  funderId: string | null;
  funderData: CustomJson | null;
  colour: string | null;
  trim: string | null;
  maintenance: boolean | null;
  stockBatchId: number | null;
  maintenancePrice: number | null;
  partnerSlug: string | null;
  vehicleType: VehicleTypeEnum;
  freeInsurance: CreateUpdateCreditApplication_createUpdateCreditApplication_lineItem_vehicleProduct_freeInsurance | null;
}

export interface CreateUpdateCreditApplication_createUpdateCreditApplication_lineItem {
  uuid: string;
  quantity: number;
  status: string | null;
  productId: string;
  productType: string;
  creditApplications: CreateUpdateCreditApplication_createUpdateCreditApplication_lineItem_creditApplications[] | null;
  order: CreateUpdateCreditApplication_createUpdateCreditApplication_lineItem_order | null;
  vehicleProduct: CreateUpdateCreditApplication_createUpdateCreditApplication_lineItem_vehicleProduct | null;
}

export interface CreateUpdateCreditApplication_createUpdateCreditApplication {
  addresses: CustomJson | null;
  submittedAt: CustomDateTime | null;
  aboutDetailsV2: CreateUpdateCreditApplication_createUpdateCreditApplication_aboutDetailsV2 | null;
  bankAccountsV2: CreateUpdateCreditApplication_createUpdateCreditApplication_bankAccountsV2[] | null;
  companyDetailsV2: CreateUpdateCreditApplication_createUpdateCreditApplication_companyDetailsV2 | null;
  vatDetailsV2: CreateUpdateCreditApplication_createUpdateCreditApplication_vatDetailsV2 | null;
  soleTraderDetails: CustomJson | null;
  directorsDetailsV2: CreateUpdateCreditApplication_createUpdateCreditApplication_directorsDetailsV2 | null;
  employmentHistories: CustomJson | null;
  incomeAndExpenses: CustomJson | null;
  lineItem: CreateUpdateCreditApplication_createUpdateCreditApplication_lineItem | null;
  creditApplicationType: CreditApplicationTypeEnum | null;
  leadManagerProposalId: string | null;
  createdAt: CustomDateTime | null;
  status: string;
  updatedAt: CustomDateTime | null;
  uuid: string;
}

export interface CreateUpdateCreditApplication {
  /**
   * Create Update CreditApplication
   */
  createUpdateCreditApplication: CreateUpdateCreditApplication_createUpdateCreditApplication | null;
}

export interface CreateUpdateCreditApplicationVariables {
  input: CreditApplicationInputObject;
}
