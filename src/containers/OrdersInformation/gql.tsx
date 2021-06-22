import { useQuery, gql, useLazyQuery } from '@apollo/client';
import {
  MyOrdersTypeEnum,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';
import {
  GetDerivatives,
  GetDerivativesVariables,
} from '../../../generated/GetDerivatives';
import {
  GetMyOrders,
  GetMyOrdersVariables,
} from '../../../generated/GetMyOrders';

export const GET_MY_ORDERS_DATA = gql`
  query GetMyOrders($partyUuid: [ID!]!, $filter: MyOrdersTypeEnum!) {
    myOrders(partyUuids: $partyUuid, filter: $filter) {
      uuid
      leaseType
      partyUuid
      personUuid
      referenceNumber
      salesChannel
      status
      createdAt
      updatedAt
      lineItems {
        order {
          uuid
        }
        createdAt
        leadManagerQuoteId
        productId
        productType
        quantity
        status
        updatedAt
        uuid
        creditApplications {
          creditApplicationType
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
          partnersDetails
          soleTraderDetails
          vatDetailsV2 {
            markets {
              country
              percentage
            }
            outsideUk
            vatNumber
            vatRegistered
          }

          incomeAndExpensesV2 {
            uuid
          }
          employmentHistoriesV2 {
            uuid
          }
          bankAccountsV2 {
            uuid
          }
          addressesV2 {
            uuid
          }
          status
          uuid
        }
        vehicleProduct {
          finalPayment
          leadTime
          maintenancePrice
          derivativeCapId
          description
          vsku
          financeType
          depositPayment
          monthlyPayment
          term
          annualMileage
          depositMonths
          funderId
          funderData
          colour
          trim
          maintenance
          vehicleType
          partnerSlug
        }
      }
    }
  }
`;

/**
 *  @props partyByUuid - array string with partyByUuid
 *  @props filter - value for filter
 */
export function useMyOrdersData(
  partyByUuid: string[],
  filter: MyOrdersTypeEnum,
) {
  return useLazyQuery<GetMyOrders, GetMyOrdersVariables>(GET_MY_ORDERS_DATA, {
    variables: {
      partyUuid: partyByUuid,
      filter,
    },
    fetchPolicy: 'network-only',
  });
}

export const GET_CAR_DERIVATIVES = gql`
  query GetDerivatives($ids: [ID!]!, $vehicleType: VehicleTypeEnum) {
    derivatives(ids: $ids, vehicleType: $vehicleType) {
      id
      capCode
      name
      slug
      manufacturer {
        name
        slug
      }
      model {
        name
        slug
      }
      fuelType {
        name
      }
      transmission {
        name
      }
      bodyStyle {
        name
      }
      range {
        name
        slug
      }
    }
    vehicleImages(capIds: $ids, vehicleType: $vehicleType) {
      vehicleType
      capId
      mainImageUrl
    }
  }
`;

/**
 *  @props capIdArray - string array with capId from orders
 *  @props vehicleType - VehicleTypeEnum
 */
export function useCarDerivativesData(
  ids: string[],
  vehicleType: VehicleTypeEnum,
) {
  return useQuery<GetDerivatives, GetDerivativesVariables>(
    GET_CAR_DERIVATIVES,
    {
      variables: {
        ids,
        vehicleType,
      },
      skip: !ids[0],
    },
  );
}
