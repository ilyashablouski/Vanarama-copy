import { gql, useQuery } from '@apollo/client';
import {
  GetPartyByUuid,
  GetPartyByUuidVariables,
} from '../../../generated/GetPartyByUuid';
import { useImperativeQuery } from '../../hooks/useImperativeQuery';
import { FullCreditCheckerInputObject } from '../../../generated/globalTypes';

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
        uuid
        partyId
        legalName
        companyType
      }
      person {
        companies {
          partyUuid
          partyId
          uuid
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

export function useGetPartyByUuidLazyQuery() {
  return useImperativeQuery<GetPartyByUuid, GetPartyByUuidVariables>(
    GET_PARTY_BY_UUID,
  );
}

export function makeGetCreditApplicationByOrderUuidMock(orderUuid: string) {
  return {
    request: {
      query: GET_CREDIT_APPLICATION_BY_ORDER_UUID,
      variables: {
        orderUuid,
      },
    },
    result: {
      data: {
        creditApplicationByOrderUuid: {
          lineItem: {
            order: {
              partyUuid: orderUuid,
            },
          },
        },
      },
    },
  };
}

export function makeGetPartyByUuidMock(uuid: string) {
  return {
    request: {
      query: GET_PARTY_BY_UUID,
      variables: {
        uuid,
      },
    },
    result: {
      data: {
        partyByUuid: {
          uuid,
        },
      },
    },
  };
}

export function makeFullCreditCheckerMutationMock(
  uuid: string,
  input: FullCreditCheckerInputObject,
) {
  return {
    request: {
      query: FULL_CREDIT_CHECKER_MUTATION,
      variables: input,
    },
    result: {
      data: {
        personByUuid: {
          uuid,
        },
      },
    },
  };
}
