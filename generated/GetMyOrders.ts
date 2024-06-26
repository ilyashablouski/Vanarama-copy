/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyOrdersTypeEnum, LeaseTypeEnum, CreditApplicationTypeEnum, VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetMyOrders
// ====================================================

export interface GetMyOrders_myOrders_lineItems_order {
  uuid: string;
}

export interface GetMyOrders_myOrders_lineItems_creditApplications_aboutDetailsV2_addresses {
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

export interface GetMyOrders_myOrders_lineItems_creditApplications_aboutDetailsV2_emailAddresses {
  kind: string | null;
  primary: boolean | null;
  uuid: string | null;
  value: string | null;
}

export interface GetMyOrders_myOrders_lineItems_creditApplications_aboutDetailsV2_history_address {
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

export interface GetMyOrders_myOrders_lineItems_creditApplications_aboutDetailsV2_history {
  address: GetMyOrders_myOrders_lineItems_creditApplications_aboutDetailsV2_history_address | null;
  month: string | null;
  status: string;
  year: string | null;
}

export interface GetMyOrders_myOrders_lineItems_creditApplications_aboutDetailsV2_telephoneNumbers {
  kind: string | null;
  primary: boolean | null;
  uuid: string | null;
  value: string | null;
}

export interface GetMyOrders_myOrders_lineItems_creditApplications_aboutDetailsV2 {
  addresses: GetMyOrders_myOrders_lineItems_creditApplications_aboutDetailsV2_addresses[] | null;
  businessShare: number | null;
  cognitoSub: string | null;
  companyType: string | null;
  countryOfBirth: string | null;
  dateOfBirth: CustomDate | null;
  dayOfBirth: string | null;
  disabilityRegistered: boolean | null;
  email: string | null;
  emailAddresses: GetMyOrders_myOrders_lineItems_creditApplications_aboutDetailsV2_emailAddresses[] | null;
  emailConsent: boolean | null;
  firstName: string;
  gender: string | null;
  history: GetMyOrders_myOrders_lineItems_creditApplications_aboutDetailsV2_history[] | null;
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
  telephoneNumbers: GetMyOrders_myOrders_lineItems_creditApplications_aboutDetailsV2_telephoneNumbers[] | null;
  termsAndConditions: boolean | null;
  title: string | null;
  tradingName: string | null;
  uuid: string | null;
  vatRegistrationNumber: string | null;
  yearOfBirth: string | null;
}

export interface GetMyOrders_myOrders_lineItems_creditApplications_companyDetailsV2_addresses {
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

export interface GetMyOrders_myOrders_lineItems_creditApplications_companyDetailsV2_emailAddresses {
  kind: string | null;
  primary: boolean | null;
  uuid: string | null;
  value: string | null;
}

export interface GetMyOrders_myOrders_lineItems_creditApplications_companyDetailsV2_telephoneNumbers {
  kind: string | null;
  primary: boolean | null;
  uuid: string | null;
  value: string | null;
}

export interface GetMyOrders_myOrders_lineItems_creditApplications_companyDetailsV2 {
  addresses: GetMyOrders_myOrders_lineItems_creditApplications_companyDetailsV2_addresses[] | null;
  annualExpenses: number | null;
  annualSalesCost: number | null;
  annualTurnover: number | null;
  businessName: string | null;
  businessRegistrationNumber: string | null;
  companySearchResult: CustomJson | null;
  companyType: string | null;
  emailAddresses: GetMyOrders_myOrders_lineItems_creditApplications_companyDetailsV2_emailAddresses[] | null;
  monthlyAmountBeingReplaced: number | null;
  natureOfBusiness: string | null;
  otherCountriesOfActivity: string[] | null;
  partyUuid: string | null;
  replaceExistingVehicleFinance: boolean | null;
  sicCode: string | null;
  sicIndustry: string | null;
  telephoneNumbers: GetMyOrders_myOrders_lineItems_creditApplications_companyDetailsV2_telephoneNumbers[] | null;
  tradesOutsideUk: boolean | null;
  tradingSince: CustomDate | null;
  turnoverOutsideUk: number | null;
  uuid: string | null;
  withTradingAddress: boolean | null;
}

export interface GetMyOrders_myOrders_lineItems_creditApplications_directorsDetailsV2_directors_addresses {
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

export interface GetMyOrders_myOrders_lineItems_creditApplications_directorsDetailsV2_directors_emailAddresses {
  kind: string | null;
  primary: boolean | null;
  uuid: string | null;
  value: string | null;
}

export interface GetMyOrders_myOrders_lineItems_creditApplications_directorsDetailsV2_directors_history_address {
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

export interface GetMyOrders_myOrders_lineItems_creditApplications_directorsDetailsV2_directors_history {
  address: GetMyOrders_myOrders_lineItems_creditApplications_directorsDetailsV2_directors_history_address | null;
  month: string | null;
  status: string;
  year: string | null;
}

export interface GetMyOrders_myOrders_lineItems_creditApplications_directorsDetailsV2_directors_incomeAndExpense {
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

export interface GetMyOrders_myOrders_lineItems_creditApplications_directorsDetailsV2_directors_telephoneNumbers {
  kind: string | null;
  primary: boolean | null;
  uuid: string | null;
  value: string | null;
}

export interface GetMyOrders_myOrders_lineItems_creditApplications_directorsDetailsV2_directors {
  addresses: GetMyOrders_myOrders_lineItems_creditApplications_directorsDetailsV2_directors_addresses[] | null;
  businessShare: number | null;
  cognitoSub: string | null;
  companyType: string | null;
  countryOfBirth: string | null;
  dateOfBirth: CustomDate | null;
  dayOfBirth: string | null;
  disabilityRegistered: boolean | null;
  email: string | null;
  emailAddresses: GetMyOrders_myOrders_lineItems_creditApplications_directorsDetailsV2_directors_emailAddresses[] | null;
  emailConsent: boolean | null;
  firstName: string;
  gender: string | null;
  history: GetMyOrders_myOrders_lineItems_creditApplications_directorsDetailsV2_directors_history[] | null;
  incomeAndExpense: GetMyOrders_myOrders_lineItems_creditApplications_directorsDetailsV2_directors_incomeAndExpense | null;
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
  telephoneNumbers: GetMyOrders_myOrders_lineItems_creditApplications_directorsDetailsV2_directors_telephoneNumbers[] | null;
  termsAndConditions: boolean | null;
  title: string | null;
  tradingName: string | null;
  uuid: string | null;
  vatRegistrationNumber: string | null;
  yearOfBirth: string | null;
}

export interface GetMyOrders_myOrders_lineItems_creditApplications_directorsDetailsV2 {
  directors: GetMyOrders_myOrders_lineItems_creditApplications_directorsDetailsV2_directors[] | null;
  totalPercentage: number | null;
}

export interface GetMyOrders_myOrders_lineItems_creditApplications_vatDetailsV2_markets {
  country: string;
  percentage: string;
}

export interface GetMyOrders_myOrders_lineItems_creditApplications_vatDetailsV2 {
  markets: GetMyOrders_myOrders_lineItems_creditApplications_vatDetailsV2_markets[] | null;
  outsideUk: boolean | null;
  vatNumber: string | null;
  vatRegistered: boolean | null;
}

export interface GetMyOrders_myOrders_lineItems_creditApplications_incomeAndExpensesV2 {
  uuid: string | null;
}

export interface GetMyOrders_myOrders_lineItems_creditApplications_employmentHistoriesV2 {
  uuid: string | null;
}

export interface GetMyOrders_myOrders_lineItems_creditApplications_bankAccountsV2 {
  uuid: string | null;
}

export interface GetMyOrders_myOrders_lineItems_creditApplications_addressesV2 {
  uuid: string | null;
}

export interface GetMyOrders_myOrders_lineItems_creditApplications {
  creditApplicationType: CreditApplicationTypeEnum | null;
  aboutDetailsV2: GetMyOrders_myOrders_lineItems_creditApplications_aboutDetailsV2 | null;
  companyDetailsV2: GetMyOrders_myOrders_lineItems_creditApplications_companyDetailsV2 | null;
  directorsDetailsV2: GetMyOrders_myOrders_lineItems_creditApplications_directorsDetailsV2 | null;
  partnersDetails: CustomJson | null;
  soleTraderDetails: CustomJson | null;
  vatDetailsV2: GetMyOrders_myOrders_lineItems_creditApplications_vatDetailsV2 | null;
  incomeAndExpensesV2: GetMyOrders_myOrders_lineItems_creditApplications_incomeAndExpensesV2 | null;
  employmentHistoriesV2: GetMyOrders_myOrders_lineItems_creditApplications_employmentHistoriesV2[] | null;
  bankAccountsV2: GetMyOrders_myOrders_lineItems_creditApplications_bankAccountsV2[] | null;
  addressesV2: GetMyOrders_myOrders_lineItems_creditApplications_addressesV2[] | null;
  status: string;
  uuid: string;
}

export interface GetMyOrders_myOrders_lineItems_vehicleProduct_freeInsurance {
  optIn: boolean | null;
  eligible: boolean | null;
}

export interface GetMyOrders_myOrders_lineItems_vehicleProduct {
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
  freeInsurance: GetMyOrders_myOrders_lineItems_vehicleProduct_freeInsurance | null;
}

export interface GetMyOrders_myOrders_lineItems {
  order: GetMyOrders_myOrders_lineItems_order | null;
  createdAt: CustomDateTime | null;
  leadManagerQuoteId: string | null;
  productId: string;
  productType: string;
  quantity: number;
  status: string | null;
  updatedAt: CustomDateTime | null;
  uuid: string;
  creditApplications: GetMyOrders_myOrders_lineItems_creditApplications[] | null;
  vehicleProduct: GetMyOrders_myOrders_lineItems_vehicleProduct | null;
}

export interface GetMyOrders_myOrders {
  uuid: string;
  leaseType: LeaseTypeEnum;
  partyUuid: string | null;
  personUuid: string | null;
  referenceNumber: string | null;
  salesChannel: string;
  status: string;
  createdAt: CustomDateTime | null;
  updatedAt: CustomDateTime | null;
  lineItems: GetMyOrders_myOrders_lineItems[];
}

export interface GetMyOrders {
  /**
   * Get orders by party_uuids and filter
   */
  myOrders: GetMyOrders_myOrders[];
}

export interface GetMyOrdersVariables {
  partyUuid: string[];
  filter: MyOrdersTypeEnum;
}
