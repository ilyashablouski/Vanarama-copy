import { useQuery, gql, useMutation, useLazyQuery } from '@apollo/client';
import { MockedResponse } from '@apollo/client/testing';
import {
  CreateUpdateCreditApplication,
  CreateUpdateCreditApplicationVariables,
} from '../../generated/CreateUpdateCreditApplication';
import { CreditApplicationInputObject } from '../../generated/globalTypes';
import {
  GetCreditApplicationByOrderUuid as Query,
  GetCreditApplicationByOrderUuidVariables as QueryVariables,
} from '../../generated/GetCreditApplicationByOrderUuid';

import {
  GetLeaseCompanyData as ILeaseData,
  GetLeaseCompanyDataVariables as ILeaseDataVariables,
} from '../../generated/GetLeaseCompanyData';

export const GET_CREDIT_APPLICATION_BY_ORDER_UUID_DATA = gql`
  query GetCreditApplicationByOrderUuid($id: ID!) {
    creditApplicationByOrderUuid(orderUuid: $id) {
      addresses
      aboutDetailsV2 {
        addresses {
          city
          country
          county
          endedOn
          kind
          lineOne
          lineThree
          lineTwo
          postcode
          propertyStatus
          serviceId
          startedOn
          uuid
        }
        businessShare
        cognitoSub
        companyType
        countryOfBirth
        dateOfBirth
        dayOfBirth
        disabilityRegistered
        email
        emailAddresses {
          kind
          primary
          uuid
          value
        }
        emailConsent
        firstName
        gender
        history {
          address {
            city
            country
            county
            endedOn
            kind
            lineOne
            lineThree
            lineTwo
            postcode
            propertyStatus
            serviceId
            startedOn
            uuid
          }
          month
          status
          year
        }
        isApplicant
        isDirector
        jobTitle
        lastName
        leadManagerId
        maritalStatus
        middleName
        monthOfBirth
        nationality
        noOfAdultsInHousehold
        noOfDependants
        numberOfDependants
        occupation
        originalFirstName
        originalLastName
        partyUuid
        privacyPolicy
        profilingConsent
        shareOfBusiness
        smsConsent
        telephoneNumbers {
          kind
          primary
          uuid
          value
        }
        termsAndConditions
        title
        tradingName
        uuid
        vatRegistrationNumber
        yearOfBirth
      }
      bankAccountsV2 {
        uuid
        accountName
        accountNumber
        bankName
        joinedAt
        joinedAtMonth
        joinedAtYear
        sortCode
      }
      companyDetailsV2 {
        addresses {
          city
          country
          county
          endedOn
          kind
          lineOne
          lineThree
          lineTwo
          postcode
          propertyStatus
          serviceId
          startedOn
          uuid
        }
        previouslyTradingSoletrader
        annualExpenses
        annualSalesCost
        annualTurnover
        businessName
        businessRegistrationNumber
        companySearchResult
        companyType
        emailAddresses {
          kind
          primary
          uuid
          value
        }
        monthlyAmountBeingReplaced
        natureOfBusiness
        otherCountriesOfActivity
        partyUuid
        replaceExistingVehicleFinance
        sicCode
        sicIndustry
        telephoneNumbers {
          kind
          primary
          uuid
          value
        }
        tradesOutsideUk
        tradingSince
        turnoverOutsideUk
        uuid
        withTradingAddress
      }
      vatDetailsV2 {
        markets {
          country
          percentage
        }
        outsideUk
        vatNumber
        vatRegistered
      }
      soleTraderDetails
      directorsDetailsV2 {
        directors {
          addresses {
            city
            country
            county
            endedOn
            kind
            lineOne
            lineThree
            lineTwo
            postcode
            propertyStatus
            serviceId
            startedOn
            uuid
          }
          businessShare
          cognitoSub
          companyType
          countryOfBirth
          dateOfBirth
          dayOfBirth
          disabilityRegistered
          email
          emailAddresses {
            kind
            primary
            uuid
            value
          }
          emailConsent
          firstName
          gender
          history {
            address {
              city
              country
              county
              endedOn
              kind
              lineOne
              lineThree
              lineTwo
              postcode
              propertyStatus
              serviceId
              startedOn
              uuid
            }
            month
            status
            year
          }
          incomeAndExpense {
            annualIncome
            anticipateMonthlyIncomeChange
            averageMonthlyIncome
            carFinance
            creditCardPayments
            foodAndClothes
            fuel
            futureMonthlyIncome
            householdIncome
            insurance
            mortgageOrRent
            netDisposableIncome
            otherCredit
            phoneAndInternet
            studentLoan
            suitabilityConsent
            totalMonthlyExpenses
            utilities
            uuid
            withStudentLoan
          }
          isApplicant
          isDirector
          jobTitle
          lastName
          leadManagerId
          maritalStatus
          middleName
          monthOfBirth
          nationality
          noOfAdultsInHousehold
          noOfDependants
          numberOfDependants
          occupation
          originalFirstName
          originalLastName
          partyUuid
          privacyPolicy
          profilingConsent
          shareOfBusiness
          smsConsent
          telephoneNumbers {
            kind
            primary
            uuid
            value
          }
          termsAndConditions
          title
          tradingName
          uuid
          vatRegistrationNumber
          yearOfBirth
        }
        totalPercentage
      }
      employmentHistories
      incomeAndExpenses
      lineItem {
        uuid
        quantity
        status
        productId
        productType
        creditApplications {
          uuid
        }
        order {
          partyUuid
          uuid
        }
        vehicleProduct {
          derivativeCapId
          description
          vsku
          term
          annualMileage
          monthlyPayment
          depositMonths
          funderId
          funderData
          depositPayment
          vehicleType
        }
      }
      creditApplicationType
      leadManagerProposalId
      createdAt
      status
      updatedAt
      uuid
    }
  }
`;

export const GET_LEASE_COMPANY_BY_ORDER_UUID_DATA = gql`
  query GetLeaseCompanyData($id: ID!) {
    creditApplicationByOrderUuid(orderUuid: $id) {
      aboutDetailsV2 {
        addresses {
          city
          country
          county
          endedOn
          kind
          lineOne
          lineThree
          lineTwo
          postcode
          propertyStatus
          serviceId
          startedOn
          uuid
        }
        businessShare
        cognitoSub
        companyType
        countryOfBirth
        dateOfBirth
        dayOfBirth
        disabilityRegistered
        email
        emailAddresses {
          kind
          primary
          uuid
          value
        }
        emailConsent
        firstName
        gender
        history {
          address {
            city
            country
            county
            endedOn
            kind
            lineOne
            lineThree
            lineTwo
            postcode
            propertyStatus
            serviceId
            startedOn
            uuid
          }
          month
          status
          year
        }
        isApplicant
        isDirector
        jobTitle
        lastName
        leadManagerId
        maritalStatus
        middleName
        monthOfBirth
        nationality
        noOfAdultsInHousehold
        noOfDependants
        numberOfDependants
        occupation
        originalFirstName
        originalLastName
        partyUuid
        privacyPolicy
        profilingConsent
        shareOfBusiness
        smsConsent
        telephoneNumbers {
          kind
          primary
          uuid
          value
        }
        termsAndConditions
        title
        tradingName
        uuid
        vatRegistrationNumber
        yearOfBirth
      }
      lineItem {
        vehicleProduct {
          funderId
          funderData
        }
      }
    }
  }
`;

export function useGetLeaseCompanyDataByOrderUuid(id: string) {
  return useLazyQuery<ILeaseData, ILeaseDataVariables>(
    GET_LEASE_COMPANY_BY_ORDER_UUID_DATA,
    {
      variables: {
        id,
      },
      fetchPolicy: 'no-cache',
    },
  );
}

export function useGetCreditApplicationByOrderUuid(id: string) {
  return useQuery<Query, QueryVariables>(
    GET_CREDIT_APPLICATION_BY_ORDER_UUID_DATA,
    {
      variables: {
        id,
      },
      skip: !id,
      fetchPolicy: 'no-cache',
    },
  );
}

export const CREATE_UPDATE_CREDIT_APPLICATION = gql`
  mutation CreateUpdateCreditApplication(
    $input: CreditApplicationInputObject!
  ) {
    createUpdateCreditApplication(input: $input) {
      addresses
      aboutDetailsV2 {
        addresses {
          city
          country
          county
          endedOn
          kind
          lineOne
          lineThree
          lineTwo
          postcode
          propertyStatus
          serviceId
          startedOn
          uuid
        }
        businessShare
        cognitoSub
        companyType
        countryOfBirth
        dateOfBirth
        dayOfBirth
        disabilityRegistered
        email
        emailAddresses {
          kind
          primary
          uuid
          value
        }
        emailConsent
        firstName
        gender
        history {
          address {
            city
            country
            county
            endedOn
            kind
            lineOne
            lineThree
            lineTwo
            postcode
            propertyStatus
            serviceId
            startedOn
            uuid
          }
          month
          status
          year
        }
        isApplicant
        isDirector
        jobTitle
        lastName
        leadManagerId
        maritalStatus
        middleName
        monthOfBirth
        nationality
        noOfAdultsInHousehold
        noOfDependants
        numberOfDependants
        occupation
        originalFirstName
        originalLastName
        partyUuid
        privacyPolicy
        profilingConsent
        shareOfBusiness
        smsConsent
        telephoneNumbers {
          kind
          primary
          uuid
          value
        }
        termsAndConditions
        title
        tradingName
        uuid
        vatRegistrationNumber
        yearOfBirth
      }
      bankAccountsV2 {
        uuid
        accountName
        accountNumber
        bankName
        joinedAt
        joinedAtMonth
        joinedAtYear
        sortCode
      }
      companyDetailsV2 {
        addresses {
          city
          country
          county
          endedOn
          kind
          lineOne
          lineThree
          lineTwo
          postcode
          propertyStatus
          serviceId
          startedOn
          uuid
        }
        previouslyTradingSoletrader
        annualExpenses
        annualSalesCost
        annualTurnover
        businessName
        businessRegistrationNumber
        companySearchResult
        companyType
        emailAddresses {
          kind
          primary
          uuid
          value
        }
        monthlyAmountBeingReplaced
        natureOfBusiness
        otherCountriesOfActivity
        partyUuid
        replaceExistingVehicleFinance
        sicCode
        sicIndustry
        telephoneNumbers {
          kind
          primary
          uuid
          value
        }
        tradesOutsideUk
        tradingSince
        turnoverOutsideUk
        uuid
        withTradingAddress
      }
      vatDetailsV2 {
        markets {
          country
          percentage
        }
        outsideUk
        vatNumber
        vatRegistered
      }
      soleTraderDetails
      directorsDetailsV2 {
        directors {
          addresses {
            city
            country
            county
            endedOn
            kind
            lineOne
            lineThree
            lineTwo
            postcode
            propertyStatus
            serviceId
            startedOn
            uuid
          }
          businessShare
          cognitoSub
          companyType
          countryOfBirth
          dateOfBirth
          dayOfBirth
          disabilityRegistered
          email
          emailAddresses {
            kind
            primary
            uuid
            value
          }
          emailConsent
          firstName
          gender
          history {
            address {
              city
              country
              county
              endedOn
              kind
              lineOne
              lineThree
              lineTwo
              postcode
              propertyStatus
              serviceId
              startedOn
              uuid
            }
            month
            status
            year
          }
          incomeAndExpense {
            annualIncome
            anticipateMonthlyIncomeChange
            averageMonthlyIncome
            carFinance
            creditCardPayments
            foodAndClothes
            fuel
            futureMonthlyIncome
            householdIncome
            insurance
            mortgageOrRent
            netDisposableIncome
            otherCredit
            phoneAndInternet
            studentLoan
            suitabilityConsent
            totalMonthlyExpenses
            utilities
            uuid
            withStudentLoan
          }
          isApplicant
          isDirector
          jobTitle
          lastName
          leadManagerId
          maritalStatus
          middleName
          monthOfBirth
          nationality
          noOfAdultsInHousehold
          noOfDependants
          numberOfDependants
          occupation
          originalFirstName
          originalLastName
          partyUuid
          privacyPolicy
          profilingConsent
          shareOfBusiness
          smsConsent
          telephoneNumbers {
            kind
            primary
            uuid
            value
          }
          termsAndConditions
          title
          tradingName
          uuid
          vatRegistrationNumber
          yearOfBirth
        }
        totalPercentage
      }
      employmentHistories
      incomeAndExpenses
      lineItem {
        uuid
        quantity
        status
        productId
        productType
        creditApplications {
          uuid
        }
        order {
          partyUuid
          uuid
        }
        vehicleProduct {
          derivativeCapId
          description
          vsku
          term
          annualMileage
          monthlyPayment
          depositMonths
          funderId
          funderData
          depositPayment
          vehicleType
        }
      }
      creditApplicationType
      leadManagerProposalId
      createdAt
      status
      updatedAt
      uuid
    }
  }
`;

export function useCreateUpdateCreditApplication(
  orderId: string,
  onCompleted: (data: CreateUpdateCreditApplication) => void,
) {
  return useMutation<
    CreateUpdateCreditApplication,
    CreateUpdateCreditApplicationVariables
  >(CREATE_UPDATE_CREDIT_APPLICATION, {
    onCompleted,
  });
}

const responseMock = {
  addresses: [],
  aboutDetailsV2: {
    addresses: null,
    businessShare: null,
    cognitoSub: null,
    companyType: 'Limited',
    countryOfBirth: null,
    dateOfBirth: null,
    dayOfBirth: null,
    disabilityRegistered: null,
    email: null,
    emailAddresses: [
      {
        kind: 'Home',
        primary: true,
        uuid: '3ff771b5-1c5a-4039-acff-ccfee8ffdc9d',
        value: 'wikile8884@o3live.com',
      },
    ],
    emailConsent: null,
    firstName: 'Test',
    gender: null,
    history: null,
    isApplicant: null,
    isDirector: null,
    jobTitle: null,
    lastName: 'Test',
    leadManagerId: null,
    maritalStatus: null,
    middleName: null,
    monthOfBirth: null,
    nationality: null,
    noOfAdultsInHousehold: null,
    noOfDependants: null,
    numberOfDependants: null,
    occupation: null,
    originalFirstName: null,
    originalLastName: null,
    partyUuid: null,
    privacyPolicy: true,
    profilingConsent: null,
    shareOfBusiness: null,
    smsConsent: null,
    telephoneNumbers: [
      {
        kind: 'Mobile',
        primary: true,
        uuid: 'c6fb0e6e-eb8c-4086-b3d9-beec79d1a8d0',
        value: '012312312341',
      },
    ],
    termsAndConditions: true,
    title: 'Mr',
    tradingName: null,
    uuid: null,
    vatRegistrationNumber: null,
    yearOfBirth: null,
  },
  bankAccountsV2: [
    {
      accountName: 'Eternal account',
      accountNumber: '67272820',
      joinedAtMonth: '1',
      joinedAtYear: '2020',
      sortCode: '019387',
      uuid: '3fe2b254-efa8-4d36-86f4-ff327f429a18',
      bankName: 'asfasfasf',
      joinedAt: null,
    },
  ],
  companyDetailsV2: {
    addresses: [
      {
        city: 'Pinner',
        country: 'GB',
        county: null,
        endedOn: null,
        kind: 'registered',
        lineOne: '23 Jubilee Close',
        lineThree: '',
        lineTwo: '',
        postcode: 'HA5 3TB',
        propertyStatus: null,
        serviceId: 'GB|RM|A|10513880',
        startedOn: null,
        uuid: null,
      },
    ],
    annualExpenses: null,
    annualSalesCost: null,
    annualTurnover: null,
    businessName: '1234 LIMITED',
    businessRegistrationNumber: '12551799',
    companySearchResult: {
      title: '1234 LIMITED',
      company_number: '12551799',
      address_snippet:
        '23 Jubilee Close, Pinner, London, United Kingdom, HA5 3TB',
      date_of_creation: '2020-04-08',
      company_status: 'active',
    },
    companyType: 'Limited',
    emailAddresses: [
      {
        kind: 'Home',
        primary: true,
        uuid: null,
        value: 'wikile8884@o3live.com',
      },
    ],
    monthlyAmountBeingReplaced: null,
    natureOfBusiness: 'Retail sale via mail order houses or via Internet',
    otherCountriesOfActivity: null,
    partyUuid: null,
    replaceExistingVehicleFinance: null,
    sicCode: null,
    sicIndustry: null,
    telephoneNumbers: [
      {
        kind: 'business',
        primary: null,
        uuid: null,
        value: '0777777777777',
      },
    ],
    tradesOutsideUk: null,
    tradingSince: '2020-04-08',
    turnoverOutsideUk: null,
    uuid: '39c19729-b980-46bd-8a8e-ed82705b3e01',
    withTradingAddress: null,
  },
  vatDetailsV2: {
    outsideUk: false,
    vatNumber: null,
    vatRegistered: false,
    markets: [
      {
        country: 'Bangladesh',
        percentage: '11',
      },
      {
        country: 'Barbados',
        percentage: '22',
      },
      {
        country: 'Argentina',
        percentage: '33',
      },
    ],
  },
  soleTraderDetails: null,
  directorsDetailsV2: {
    directors: [
      {
        addresses: [],
        businessShare: null,
        cognitoSub: null,
        companyType: null,
        countryOfBirth: null,
        dateOfBirth: null,
        dayOfBirth: '16',
        disabilityRegistered: null,
        email: 'jlksdjfklsjdfkl@gmail.com',
        emailAddresses: null,
        emailConsent: null,
        firstName: 'Irshad',
        gender: 'Male',
        history: [],
        incomeAndExpense: null,
        isApplicant: null,
        isDirector: null,
        jobTitle: null,
        lastName: 'MOHAMED',
        leadManagerId: null,
        maritalStatus: null,
        middleName: null,
        monthOfBirth: '10',
        nationality: 'British',
        noOfAdultsInHousehold: null,
        noOfDependants: null,
        numberOfDependants: 'None',
        occupation: null,
        originalFirstName: 'Irshad',
        originalLastName: 'MOHAMED',
        partyUuid: null,
        privacyPolicy: null,
        profilingConsent: null,
        shareOfBusiness: 100,
        smsConsent: null,
        telephoneNumbers: null,
        termsAndConditions: null,
        title: 'Mr',
        tradingName: null,
        uuid: 'afc42a3c-f1c6-4dab-b0a8-d0b3c4f8bccb',
        vatRegistrationNumber: null,
        yearOfBirth: '1960',
      },
    ],
    totalPercentage: 0,
  },
  employmentHistories: null,
  incomeAndExpenses: null,
  lineItem: {
    uuid: '956b6b05-4978-46e9-aecd-1a770b9b5a0f',
    quantity: 1,
    status: 'credit',
    productId: '11363',
    productType: 'VehicleProduct',
    creditApplications: [
      {
        uuid: '1318d77a-002e-44b7-bec1-bf47e0b93f85',
      },
    ],
    order: {
      partyUuid: 'a81c87b2-e7e2-4fac-ace7-b2cd743bfb6f',
      uuid: '',
    },
    vehicleProduct: {
      derivativeCapId: '86532',
      description: null,
      vsku: null,
      term: 48,
      annualMileage: 8000,
      monthlyPayment: 184.94,
      depositMonths: 9,
      funderId: '3',
      funderData: {
        funder_name: 'Hitachi',
        b2c: {
          address_history: '36',
          employment_history: '36',
        },
        b2b: {
          limited: {
            director_rules: {
              default: {
                num_of_directors: '1',
                percentage_shares: '25',
              },
            },
            address_history: '0',
          },
          sole_trader: {
            address_history: '36',
          },
          partnership: {
            director_rules: {
              default: {
                num_of_directors: '1',
                percentage_shares: '25',
              },
            },
            address_history: '36',
          },
        },
      },
      depositPayment: 1664.46,
      vehicleType: 'CAR',
    },
  },
  creditApplicationType: 'B2B_LIMITED',
  leadManagerProposalId: null,
  createdAt: '2021-06-29T22:14:29.002+00:00',
  status: 'draft',
  updatedAt: '2021-06-29T22:59:12.448+00:00',
  uuid: '1318d77a-002e-44b7-bec1-bf47e0b93f85',
};

export const makeGetCreditApplicationMock = (id: string): MockedResponse => ({
  request: {
    query: GET_CREDIT_APPLICATION_BY_ORDER_UUID_DATA,
    variables: { id },
  },
  result: jest.fn().mockImplementation(() => ({
    data: {
      creditApplicationByOrderUuid: {
        ...responseMock,
      },
    },
  })),
});

export const makeUpdateCreditApplicationMock = (
  input: CreditApplicationInputObject,
): MockedResponse => ({
  request: {
    query: CREATE_UPDATE_CREDIT_APPLICATION,
    variables: { input },
  },
  result: jest.fn().mockImplementation(() => ({
    data: {
      createUpdateCreditApplication: {
        ...responseMock,
      },
    },
  })),
});
