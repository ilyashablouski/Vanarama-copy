import { gql, useQuery } from '@apollo/client';
import {
  GetPartyByUuid,
  GetPartyByUuidVariables,
} from '../../../generated/GetPartyByUuid';

export const GET_CREDIT_APPLICATION_BY_ORDER_UUID = gql`
  query GetCreditApplicationByOrderUuidDataForCreditCheck($orderUuid: ID!) {
    creditApplicationByOrderUuid(orderUuid: $orderUuid) {
      lineItem {
        vehicleProduct {
          vehicleType
          depositPayment
          monthlyPayment
        }
        order {
          id
          partyUuid
        }
        creditApplications {
          uuid
        }
      }
    }
  }
`;

export const GET_PARTY_BY_UUID = gql`
  query GetPartyByUuid($uuid: ID!) {
    partyByUuid(uuid: $uuid) {
      uuid
      person {
        firstName
        lastName
        partyId
        uuid
      }
      company {
        partyId
        legalName
        companyType
      }
      person {
        companies {
          uuid
          partyId
        }
      }
    }
  }
`;

export const FULL_CREDIT_CHECKER_MUTATION = gql`
  mutation fullCreditChecker(
    $partyId: ID!
    $creditApplicationUuid: ID!
    $orderUuid: ID!
    $vehicleType: VehicleTypeEnum!
    $monthlyPayment: Float!
    $depositPayment: Float!
  ) {
    fullCreditChecker(
      input: {
        partyId: $partyId
        creditApplicationUuid: $creditApplicationUuid
        orderUuid: $orderUuid
        vehicleType: $vehicleType
        monthlyPayment: $monthlyPayment
        depositPayment: $depositPayment
      }
    ) {
      creditCheck {
        uuid
        creditCheckType
        creditCheckLines {
          uuid
          funder
          likelihood
        }
      }
      party {
        uuid
        person {
          uuid
          partyId
          partyUuid
          firstName
          lastName
        }
      }
    }
  }
`;

export function useGetPartyByUuidQuery(partyUuid: string) {
  return useQuery<GetPartyByUuid, GetPartyByUuidVariables>(GET_PARTY_BY_UUID, {
    variables: {
      uuid: partyUuid,
    },
    fetchPolicy: 'no-cache',
    skip: !partyUuid,
  });
}
