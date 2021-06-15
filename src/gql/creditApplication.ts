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
      vatDetails
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
      vatDetails
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
    companyType: 'Limited',
  },
  bankAccountsV2: [
    {
      accountName: 'Eternal account',
      accountNumber: '67272820',
      joinedAtMonth: '1',
      joinedAtYear: '2020',
      sortCode: '019387',
    },
  ],
  companyDetailsV2: null,
  vatDetails: 'vatDetails',
  soleTraderDetails: 'soleTraderDetails',
  directorsDetailsV2: null,
  employmentHistories: 'employmentHistories',
  incomeAndExpenses: 'incomeAndExpenses',
  lineItem: {
    uuid: 'uuid',
    quantity: 'quantity',
    status: 'status',
    productId: 'productId',
    productType: 'productType',
    creditApplications: [
      {
        uuid: 'uuid',
      },
    ],
    order: {
      partyUuid: 'partyUuid',
      uuid: 'uuid',
    },
    vehicleProduct: {
      derivativeCapId: 'derivativeCapId',
      description: 'description',
      vsku: 'vsku',
      term: 'term',
      annualMileage: 'annualMileage',
      monthlyPayment: 'monthlyPayment',
      depositMonths: 'depositMonths',
      funderId: 'funderId',
      funderData: 'funderData',
      depositPayment: 'depositPayment',
      vehicleType: 'vehicleType',
    },
  },
  leadManagerProposalId: 'leadManagerProposalId',
  createdAt: 'createdAt',
  status: 'status',
  updatedAt: 'updatedAt',
  uuid: 'uuid',
  creditApplicationType: 'B2B_LIMITED',
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
