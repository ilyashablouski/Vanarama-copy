import { useQuery, gql } from '@apollo/client';
import {
  getOrdersByPartyUuid,
  getOrdersByPartyUuidVariables,
} from '../../../generated/getOrdersByPartyUuid';

export const GET_ORDERS_BY_PARTY_UUID_DATA = gql`
  query getOrdersByPartyUuid($partyUuid: ID!, $statuses: [String!]) {
    ordersByPartyUuid(partyUuid: $partyUuid, statuses: $statuses) {
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
  partyByUuid?: string,
  statuses?: string[],
) {
  return useQuery<getOrdersByPartyUuid, getOrdersByPartyUuidVariables>(
    GET_ORDERS_BY_PARTY_UUID_DATA,
    {
      variables: {
        partyUuid: partyByUuid || '',
        statuses: statuses || [],
      },
    },
  );
}
