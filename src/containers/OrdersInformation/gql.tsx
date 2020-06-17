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
      aasmState
      createdAt
      updatedAt
      lineItems {
        createdAt
        leadManagerQuoteId
        productId
        productType
        quantity
        state
        updatedAt
        uuid
        creditApplications {
          aasmState
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
        }
      }
    }
  }
`;

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
