/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Lease type
 */
export enum LeaseTypeEnum {
  BUSINESS = "BUSINESS",
  PERSONAL = "PERSONAL",
}

/**
 * Vehicle type enum
 */
export enum VehicleTypeEnum {
  CAR = "CAR",
  LCV = "LCV",
}

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
  uuid?: string | null;
}

/**
 * Input object to create and add a Bank Account
 */
export interface BankAccountInputObject {
  accountName?: string | null;
  accountNumber?: string | null;
  bankName?: string | null;
  joinedAt?: any | null;
  partyId?: string | null;
  sortCode?: string | null;
  uuid?: string | null;
}

/**
 * Input object to create a Company Associate (Director, Partner etc.)
 */
export interface CompanyAssociateInputObject {
  addresses?: AddressInputObject[] | null;
  businessShare?: number | null;
  countryOfBirth?: string | null;
  dateOfBirth?: any | null;
  emailAddress?: EmailAddressInputObject | null;
  emailConsent?: boolean | null;
  firstName: string;
  gender?: string | null;
  incomeAndExpense?: IncomeAndExpenseInputObject | null;
  lastName: string;
  maritalStatus?: string | null;
  middleName?: string | null;
  nationality?: string | null;
  noOfAdultsInHousehold?: string | null;
  noOfDependants?: string | null;
  profilingConsent?: boolean | null;
  role?: RoleInputObject | null;
  smsConsent?: boolean | null;
  termsAndConditions?: boolean | null;
  title?: string | null;
  uuid?: string | null;
}

/**
 * Input object to create a Company
 */
export interface CompanyInputObject {
  about?: string | null;
  addresses?: AddressInputObject[] | null;
  annualExpenses?: string | null;
  annualSales?: string | null;
  annualTurnover?: string | null;
  companyNature?: string | null;
  companyNumber?: string | null;
  companyType?: string | null;
  deletedAt?: any | null;
  emailAddresses?: EmailAddressInputObject[] | null;
  leadManagerId?: string | null;
  legalName?: string | null;
  monthlyAmountBeingReplaced?: string | null;
  otherCountriesOfActivity?: string | null;
  pictureUrl?: string | null;
  replaceExistingVehicleFinance?: boolean | null;
  sicCode?: string | null;
  sicIndustry?: string | null;
  telephoneNumber?: TelephoneNumberInputObject | null;
  tradesOutsideUk?: boolean | null;
  tradingName?: string | null;
  tradingSince?: any | null;
  turnoverOutsideUk?: number | null;
  uuid?: string | null;
  vatNumber?: string | null;
  withTradingAddress?: boolean | null;
}

/**
 * Input object to create and add an Email Address
 */
export interface EmailAddressInputObject {
  kind?: string | null;
  partyId?: string | null;
  primary?: boolean | null;
  uuid?: string | null;
  value: string;
}

/**
 * Input object to create and add Employment Histories
 */
export interface EmploymentHistoryInputObject {
  employmentHistories: EmploymentInputObject[];
  partyId: string;
  uuid?: string | null;
}

/**
 * Input object to create and add an Employment History
 */
export interface EmploymentInputObject {
  companyAddressCity?: string | null;
  companyAddressCountry?: string | null;
  companyAddressLineOne?: string | null;
  companyAddressLineThree?: string | null;
  companyAddressLineTwo?: string | null;
  companyAddressPostcode?: string | null;
  companyAddressServiceId?: string | null;
  companyName?: string | null;
  contract?: string | null;
  employedSinceDate?: any | null;
  employedUntilDate?: any | null;
  employmentStatus?: string | null;
  grossAnnualIncome?: number | null;
  jobTitle?: string | null;
  workPhoneNumber?: string | null;
}

/**
 * Input object to create and add an Income And Expense
 */
export interface IncomeAndExpenseInputObject {
  annualIncome?: number | null;
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
  withStudentLoan?: boolean | null;
}

/**
 * Input object to create a Limited Company
 */
export interface LimitedCompanyInputObject {
  addresses?: AddressInputObject[] | null;
  associates?: CompanyAssociateInputObject[] | null;
  bankAccount?: BankAccountInputObject | null;
  companyNature?: string | null;
  companyNumber?: string | null;
  companyType?: string | null;
  emailAddress?: EmailAddressInputObject | null;
  isVatRegistered?: boolean | null;
  legalName?: string | null;
  otherCountriesOfActivity?: string[] | null;
  person?: PersonInputObject | null;
  telephoneNumbers?: TelephoneNumberInputObject[] | null;
  tradesOutsideUk?: boolean | null;
  tradingName?: string | null;
  tradingSince?: any | null;
  turnoverOutsideUk?: number | null;
  turnoverPercentageOutsideUk?: TurnoverPercentageOutsideUkInputObject[] | null;
  uuid?: string | null;
  vatNumber?: string | null;
  withTradingAddress?: boolean | null;
}

/**
 * Input object to update my account section
 */
export interface MyAccountInputObject {
  firstName?: string | null;
  lastName?: string | null;
  personUuid: string;
  serviceId?: string | null;
  telephoneNumber?: string | null;
}

/**
 * Input object to create a Person
 */
export interface PersonInputObject {
  about?: string | null;
  cognitoSub?: string | null;
  company?: CompanyInputObject | null;
  countryOfBirth?: string | null;
  dateOfBirth?: any | null;
  deletedAt?: any | null;
  disabilityRegistered?: boolean | null;
  emailAddress?: EmailAddressInputObject | null;
  emailConsent?: boolean | null;
  firstName?: string | null;
  gender?: string | null;
  isApplicant?: boolean | null;
  isDirector?: boolean | null;
  jobTitle?: string | null;
  lastName?: string | null;
  leadManagerId?: string | null;
  maritalStatus?: string | null;
  middleName?: string | null;
  nationality?: string | null;
  noOfAdultsInHousehold?: string | null;
  noOfDependants?: string | null;
  pictureUrl?: string | null;
  profilingConsent?: boolean | null;
  role?: RoleInputObject | null;
  smsConsent?: boolean | null;
  telephoneNumbers?: TelephoneNumberInputObject[] | null;
  termsAndConditions?: boolean | null;
  title?: string | null;
  tradingName?: string | null;
  uuid?: string | null;
  vatRegistrationNumber?: string | null;
}

/**
 * Input object to make quick credit check
 */
export interface QuickCreditCheckerInputObject {
  addressServiceId: string;
  emailAddress: EmailAddressInputObject;
  person: PersonInputObject;
}

/**
 * Rate filter
 */
export interface RateInputObject {
  max?: number | null;
  min?: number | null;
}

/**
 * Input object to create and add a Role
 */
export interface RoleInputObject {
  companyId?: number | null;
  personId?: number | null;
  position?: string | null;
  primaryContact?: boolean | null;
  uuid?: string | null;
}

/**
 * Input object to create and add a Telephone Number
 */
export interface TelephoneNumberInputObject {
  kind?: string | null;
  partyId?: string | null;
  primary?: boolean | null;
  uuid?: string | null;
  value: string;
}

/**
 * Input object for turnover percentage outside UK
 */
export interface TurnoverPercentageOutsideUkInputObject {
  country: string;
  percentage: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
