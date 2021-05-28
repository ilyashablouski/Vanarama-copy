/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * CreditApplication Type
 */
export enum CreditApplicationTypeEnum {
  B2B_LIMITED = "B2B_LIMITED",
  B2B_PARTNERSHIP = "B2B_PARTNERSHIP",
  B2B_REGISTERED_PARTNERSHIP = "B2B_REGISTERED_PARTNERSHIP",
  B2B_SOLE_TRADER = "B2B_SOLE_TRADER",
  B2C_PERSONAL = "B2C_PERSONAL",
}

/**
 * Finance type enum
 */
export enum FinanceTypeEnum {
  BCH = "BCH",
  FL = "FL",
  PCH = "PCH",
}

/**
 * Company types for funder
 */
export enum FunderCompanyTypeEnum {
  limited = "limited",
  partnership = "partnership",
}

/**
 * Lease type
 */
export enum LeaseTypeEnum {
  BUSINESS = "BUSINESS",
  PERSONAL = "PERSONAL",
}

/**
 * Filter orders/quotes by section
 */
export enum MyOrdersTypeEnum {
  ALL_ORDERS = "ALL_ORDERS",
  ALL_QUOTES = "ALL_QUOTES",
  COMPLETED_ORDERS = "COMPLETED_ORDERS",
  IN_PROGRESS_ORDERS = "IN_PROGRESS_ORDERS",
}

/**
 * Opportunity subtype enum
 */
export enum OpportunitySubtypeEnum {
  GAPINSURANCE = "GAPINSURANCE",
  MULTIYEAR = "MULTIYEAR",
  SHORTTERM = "SHORTTERM",
  TOOLSINTRANSIT = "TOOLSINTRANSIT",
}

/**
 * Opportunity type enum
 */
export enum OpportunityTypeEnum {
  CALLBACK = "CALLBACK",
  FLEET = "FLEET",
  INSURANCE = "INSURANCE",
  QUOTE = "QUOTE",
}

/**
 * Partner slug type enum
 */
export enum PartnerSlugTypeEnum {
  OVO = "OVO",
}

/**
 * Sort direction
 */
export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

/**
 * Sort field
 */
export enum SortField {
  availability = "availability",
  initialPayment = "initialPayment",
  manufacturer = "manufacturer",
  mileage = "mileage",
  offerRanking = "offerRanking",
  rate = "rate",
  rental = "rental",
  term = "term",
}

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
 * Input object to create and add an Address
 */
export interface AddressV2InputObject {
  city: string;
  country?: string | null;
  county?: string | null;
  endedOn?: any | null;
  kind?: string | null;
  lineOne: string;
  lineThree?: string | null;
  lineTwo?: string | null;
  postcode: string;
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
 * Input object to create and add a Bank Account
 */
export interface BankAccountV2InputObject {
  accountName?: string | null;
  accountNumber?: string | null;
  bankName?: string | null;
  joinedAt?: any | null;
  joinedAtMonth?: string | null;
  joinedAtYear?: string | null;
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
  occupation?: string | null;
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
 * Input object to create companies
 */
export interface CompanyV2InputObject {
  addresses?: AddressV2InputObject[] | null;
  annualExpenses?: number | null;
  annualSalesCost?: number | null;
  annualTurnover?: number | null;
  businessName: string;
  businessRegistrationNumber?: string | null;
  companySearchResult?: any | null;
  companyType: string;
  emailAddresses?: EmailAddressV2InputObject[] | null;
  monthlyAmountBeingReplaced?: number | null;
  natureOfBusiness?: string | null;
  otherCountriesOfActivity?: string[] | null;
  partyUuid?: string | null;
  replaceExistingVehicleFinance?: boolean | null;
  telephoneNumbers?: TelephoneNumberV2InputObject[] | null;
  tradesOutsideUk?: boolean | null;
  tradingSince?: any | null;
  turnoverOutsideUk?: number | null;
  uuid: string;
  withTradingAddress?: boolean | null;
}

/**
 * Input object to create and add a Credit Application
 */
export interface CreditApplicationInputObject {
  aboutDetails?: any | null;
  aboutDetailsV2?: PersonV2InputObject | null;
  addresses?: any | null;
  addressesV2?: AddressV2InputObject[] | null;
  bankAccounts?: any | null;
  bankAccountsV2?: BankAccountV2InputObject[] | null;
  companyDetails?: any | null;
  companyDetailsV2?: CompanyV2InputObject | null;
  creditApplicationType?: CreditApplicationTypeEnum | null;
  directorsDetails?: any | null;
  employmentHistories?: any | null;
  employmentHistoriesV2?: EmploymentHistoryV2InputObject[] | null;
  financeType?: string | null;
  incomeAndExpenses?: any | null;
  incomeAndExpensesV2?: IncomeAndExpenseV2InputObject | null;
  leadManagerProposalId?: string | null;
  orderUuid: string;
  partnersDetails?: any | null;
  soleTraderDetails?: any | null;
  status?: string | null;
  submittedAt?: any | null;
  vatDetails?: any | null;
  vatDetailsV2?: VatDetailV2InputObject | null;
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
 * Input object to create and add an Email Address
 */
export interface EmailAddressV2InputObject {
  kind?: string | null;
  primary: boolean;
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
export interface EmploymentHistoryV2InputObject {
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
  uuid?: string | null;
  workPhoneNumber?: string | null;
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
 * Search filters
 */
export interface FilterListObject {
  availability?: number | null;
  bodyStyles?: string[] | null;
  co2?: number[] | null;
  doors?: number[] | null;
  enginePowerBhp?: number[] | null;
  engineSizes?: number[] | null;
  financeTypes?: FinanceTypeEnum[] | null;
  fuelTypes?: string[] | null;
  height?: number[] | null;
  initialPayment?: RateInputObject | null;
  initialPeriods?: number[] | null;
  length?: number[] | null;
  lqBodyStyles?: string[] | null;
  manufacturerName?: string | null;
  manufacturerSlug?: string | null;
  mileages?: number[] | null;
  modelName?: string | null;
  modelSlug?: string | null;
  mpgCombined?: number[] | null;
  noOfGears?: number[] | null;
  noOfSeats?: number[] | null;
  offerRanking?: number | null;
  onOffer?: boolean | null;
  rangeName?: string | null;
  rangeSlug?: string | null;
  rate?: RateInputObject | null;
  rental?: RateInputObject | null;
  terms?: number[] | null;
  transmissions?: string[] | null;
  vehicleCategories?: string[] | null;
  vehicleTypes?: VehicleTypeEnum[] | null;
}

/**
 * Input object to create and add a FreeInsurance
 */
export interface FreeInsuranceInputObject {
  eligible: boolean;
  optIn: boolean;
}

/**
 * Input object to make full credit check
 */
export interface FullCreditCheckerInputObject {
  annualMileage?: number | null;
  capId?: string | null;
  creditApplicationUuid: string;
  depositPayment: number;
  lcvCapId?: string | null;
  monthlyPayment: number;
  orderUuid?: string | null;
  partyId: string;
  term?: number | null;
  vehicleType: VehicleTypeEnum;
}

/**
 * Input object to get funder details
 */
export interface FunderInputObject {
  companiesHouseDirectors: number;
  companyType: FunderCompanyTypeEnum;
  id: string;
  percentageShares?: number | null;
  userDirectors?: number | null;
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
  suitabilityConsent?: boolean | null;
  utilities?: number | null;
  withStudentLoan?: boolean | null;
}

/**
 * Input object to create and add an Income And Expense
 */
export interface IncomeAndExpenseV2InputObject {
  annualIncome?: number | null;
  anticipateMonthlyIncomeChange?: boolean | null;
  averageMonthlyIncome?: number | null;
  carFinance?: number | null;
  creditCardPayments?: number | null;
  foodAndClothes?: number | null;
  fuel?: number | null;
  futureMonthlyIncome?: number | null;
  householdIncome?: number | null;
  insurance?: number | null;
  mortgageOrRent?: number | null;
  otherCredit?: number | null;
  phoneAndInternet?: number | null;
  studentLoan?: number | null;
  suitabilityConsent?: boolean | null;
  utilities?: number | null;
  uuid?: string | null;
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
  leadManagerId?: string | null;
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
 * Input object to create line item
 */
export interface LineItemInputObject {
  leadManagerQuoteId?: string | null;
  orderId?: string | null;
  quantity: number;
  vehicleProduct?: VehicleProductInputObject | null;
}

/**
 * Input object to update my account section
 */
export interface MyAccountInputObject {
  emailConsent?: boolean | null;
  firstName?: string | null;
  lastName?: string | null;
  personUuid: string;
  serviceId?: string | null;
  smsConsent?: boolean | null;
  telephoneNumber?: string | null;
}

/**
 * Input object to create an order
 */
export interface OrderInputObject {
  leaseType: LeaseTypeEnum;
  lineItems: LineItemInputObject[];
  partyUuid?: string | null;
  personUuid?: string | null;
  referenceNumber?: string | null;
  salesChannel?: string | null;
  uuid?: string | null;
}

/**
 * Query pagination
 */
export interface PaginationInputObject {
  from?: number | null;
  size?: number | null;
}

/**
 * Input object to create a Person
 */
export interface PersonInputObject {
  about?: string | null;
  b2c?: boolean | null;
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
  privacyPolicy?: boolean | null;
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
 * Input object to create a Person
 */
export interface PersonV2InputObject {
  about?: string | null;
  b2c?: boolean | null;
  cognitoSub?: string | null;
  companyType?: string | null;
  countryOfBirth?: string | null;
  dateOfBirth?: any | null;
  disabilityRegistered?: boolean | null;
  emailAddresses?: EmailAddressV2InputObject[] | null;
  emailConsent?: boolean | null;
  firstName: string;
  gender?: string | null;
  isApplicant?: boolean | null;
  isDirector?: boolean | null;
  jobTitle?: string | null;
  lastName: string;
  leadManagerId?: string | null;
  maritalStatus?: string | null;
  middleName?: string | null;
  nationality?: string | null;
  noOfAdultsInHousehold?: string | null;
  noOfDependants?: string | null;
  partyUuid?: string | null;
  pictureUrl?: string | null;
  privacyPolicy?: boolean | null;
  profilingConsent?: boolean | null;
  smsConsent?: boolean | null;
  telephoneNumbers?: TelephoneNumberV2InputObject[] | null;
  termsAndConditions?: boolean | null;
  title?: string | null;
  tradingName?: string | null;
  uuid: string;
  vatRegistrationNumber?: string | null;
}

/**
 * Input object to make quick credit check
 */
export interface QuickCreditCheckerInputObject {
  address?: AddressInputObject | null;
  addressServiceId?: string | null;
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
 * Input object to create a Sole Trader Company
 */
export interface SoleTraderCompanyInputObject {
  addresses?: AddressInputObject[] | null;
  annualExpenses?: number | null;
  annualSalesCost?: number | null;
  annualTurnover?: number | null;
  associate?: CompanyAssociateInputObject | null;
  bankAccount?: BankAccountInputObject | null;
  companyNature?: string | null;
  companyNumber?: string | null;
  companyType?: string | null;
  emailAddress?: EmailAddressInputObject | null;
  isVatRegistered?: boolean | null;
  leadManagerId?: string | null;
  legalName?: string | null;
  monthlyAmountBeingReplaced?: number | null;
  otherCountriesOfActivity?: string[] | null;
  person?: PersonInputObject | null;
  replaceExistingVehicleFinance?: boolean | null;
  telephoneNumbers?: TelephoneNumberInputObject[] | null;
  tradesOutsideUk?: boolean | null;
  tradingName?: string | null;
  tradingSince?: any | null;
  turnoverOutsideUk?: number | null;
  turnoverPercentageOutsideUk?: TurnoverPercentageOutsideUkInputObject[] | null;
  uuid?: string | null;
  vatNumber?: string | null;
  vehicleRegistrationNumber?: string | null;
}

/**
 * Sort object to order Es
 */
export interface SortObject {
  direction: SortDirection;
  field: SortField;
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
 * Input object to create and add a Telephone Number
 */
export interface TelephoneNumberV2InputObject {
  kind?: string | null;
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

/**
 * Input object to create vat details
 */
export interface VatDetailV2InputObject {
  outsideUk?: boolean | null;
  vatNumber?: string | null;
  vatRegistered?: boolean | null;
}

/**
 * Input object for vehicle product, eg: quote
 */
export interface VehicleProductInputObject {
  annualMileage?: number | null;
  colour?: string | null;
  depositMonths?: number | null;
  depositPayment?: number | null;
  derivativeCapId: string;
  description?: string | null;
  finalPayment?: number | null;
  financeType?: string | null;
  freeInsurance?: FreeInsuranceInputObject | null;
  funderId?: string | null;
  leadTime?: string | null;
  maintenance?: boolean | null;
  maintenancePrice?: number | null;
  monthlyPayment?: number | null;
  partnerSlug?: PartnerSlugTypeEnum | null;
  term?: number | null;
  trim?: string | null;
  vehicleType: VehicleTypeEnum;
  vsku?: string | null;
}

export interface VehicleToCompare {
  capId?: number | null;
  vehicleType?: VehicleTypeEnum | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
