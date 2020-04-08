/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Input array of addresses create and add an Address
 */
export interface AddressHistoryInputObject {
  addresses: AddressInputObject[];
  partyId: string;
}

/**
 * Input object to create and add an Address
 */
export interface AddressInputObject {
  city?: string | null;
  country?: string | null;
  county?: string | null;
  endedOn?: any | null;
  kind?: string | null;
  lineOne?: string | null;
  lineThree?: string | null;
  lineTwo?: string | null;
  postcode?: string | null;
  propertyStatus?: string | null;
  serviceId?: string | null;
  startedOn?: any | null;
}

/**
 * Input object to create and add an Email Address
 */
export interface EmailAddressInputObject {
  kind?: string | null;
  partyId?: string | null;
  primary?: boolean | null;
  value: string;
}

/**
 * Input object to create and add an Income And Expense
 */
export interface IncomeAndExpenseInputObject {
  anticipateMonthlyIncomeChange?: boolean | null;
  averageMonthlyIncome?: number | null;
  carFinance?: number | null;
  creditCardPayments?: number | null;
  foodAndClothes?: number | null;
  fuel?: number | null;
  futureMonthlyIncome?: number | null;
  householdIncome?: number | null;
  id?: string | null;
  insurance?: number | null;
  mortgageOrRent?: number | null;
  otherCredit?: number | null;
  partyId?: string | null;
  phoneAndInternet?: number | null;
  studentLoan?: number | null;
  utilities?: number | null;
}

/**
 * Input object to create a Person
 */
export interface PersonInputObject {
  about?: string | null;
  address?: AddressInputObject | null;
  countryOfBirth?: string | null;
  dateOfBirth?: any | null;
  deletedAt?: any | null;
  disabilityRegistered?: boolean | null;
  emailAddress?: EmailAddressInputObject | null;
  emailConsent?: boolean | null;
  firstName: string;
  gender?: string | null;
  id?: string | null;
  jobTitle?: string | null;
  lastName: string;
  leadManagerId?: string | null;
  maritalStatus?: string | null;
  middleName?: string | null;
  nationality?: string | null;
  noOfAdultsInHousehold?: number | null;
  noOfDependants?: number | null;
  pictureUrl?: string | null;
  profilingConsent?: boolean | null;
  smsConsent?: boolean | null;
  telephoneNumber?: TelephoneNumberInputObject | null;
  termsAndConditions?: boolean | null;
  title?: string | null;
  tradingName?: string | null;
  vatRegistrationNumber?: string | null;
}

/**
 * Input object to create and add a Telephone Number
 */
export interface TelephoneNumberInputObject {
  kind?: string | null;
  partyId?: string | null;
  primary?: boolean | null;
  value: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
