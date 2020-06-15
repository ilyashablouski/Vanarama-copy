import { useQuery, gql } from '@apollo/client';

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

export function ordersByPartyUuidData(
  partyByUuid?: string,
  statuses?: string[],
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery(GET_ORDERS_BY_PARTY_UUID_DATA, {
    variables: {
      partyUuid: partyByUuid || '',
      statuses: statuses || [],
    },
  });
}
