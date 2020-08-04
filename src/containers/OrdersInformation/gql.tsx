import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import {
  GetDerivatives,
  GetDerivativesVariables,
} from '../../../generated/GetDerivatives';
import {
  GetOrdersByPartyUuid,
  GetOrdersByPartyUuidVariables,
} from '../../../generated/GetOrdersByPartyUuid';

export const GET_ORDERS_BY_PARTY_UUID_DATA = gql`
  query GetOrdersByPartyUuid(
    $partyUuid: ID!
    $statuses: [String!]
    $excludeStatuses: [String!]
    $statusesCA: [String!]
    $exStatusesCA: [String!]
  ) {
    ordersByPartyUuid(
      partyUuid: $partyUuid
      statuses: $statuses
      excludeStatuses: $excludeStatuses
    ) {
      uuid
      id
      leaseType
      partyUuid
      status
      createdAt
      updatedAt
      lineItems {
        createdAt
        leadManagerQuoteId
        productId
        productType
        quantity
        status
        updatedAt
        uuid
        creditApplications(
          statuses: $statusesCA
          excludeStatuses: $exStatusesCA
        ) {
          status
          uuid
        }
        vehicleProduct {
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
        }
      }
    }
  }
`;

/**
 *  @props partyByUuid - string with partyByUuid
 *  @props statuses - optional param, array of strings with statuses we want to get
 *  @props excludeStatuses - optional param, array of strings with statuses that we don’t want to receive
 */
export function useOrdersByPartyUuidData(
  partyByUuid: string,
  statuses?: string[],
  excludeStatuses?: string[],
  statusesCA?: string[],
  exStatusesCA?: string[],
) {
  return useLazyQuery<GetOrdersByPartyUuid, GetOrdersByPartyUuidVariables>(
    GET_ORDERS_BY_PARTY_UUID_DATA,
    {
      variables: {
        partyUuid: partyByUuid,
        statuses: statuses || null,
        excludeStatuses: excludeStatuses || null,
        statusesCA: statusesCA || null,
        exStatusesCA: exStatusesCA || null,
      },
    },
  );
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
    },
  );
}
