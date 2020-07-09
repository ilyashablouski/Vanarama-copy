import { useQuery, gql } from '@apollo/client';
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
        creditApplications {
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
          funder
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
) {
  return useQuery<GetOrdersByPartyUuid, GetOrdersByPartyUuidVariables>(
    GET_ORDERS_BY_PARTY_UUID_DATA,
    {
      variables: {
        partyUuid: partyByUuid,
        statuses: statuses || null,
        excludeStatuses: excludeStatuses || null,
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
      }
      manufacturerName
      model {
        name
      }
      modelName
      fuelType {
        name
      }
      fuelTypeName
      transmission {
        name
      }
      transmissionName
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
