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
            vehicleProduct: {
              vehicleType: 'CAR',
              depositPayment: 3779.64,
              monthlyPayment: 419.96,
            },
            order: {
              partyUuid: '2f852fc1-2555-4688-b618-d17e32e32b6f',
            },
            creditApplications: [
              {
                uuid: 'b3d4b0d2-cbb4-4c01-bbee-998f016f5092',
              },
            ],
          },
        },
      },
    },
  };
}

export function makeGetPartyByUuidMock(orderUuid: string, userUuid: string) {
  return {
    request: {
      query: GET_PARTY_BY_UUID,
      variables: {
        uuid: orderUuid,
      },
    },
    result: {
      data: {
        partyByUuid: {
          uuid: orderUuid,
          person: {
            firstName: 'Test',
            lastName: 'Test',
            partyId: '13670',
            uuid: userUuid,
            companies: [
              {
                uuid: '812a0557-cd1b-424d-846d-f5def73ec674',
                partyUuid: '69f79466-f4ef-40b8-84da-af31b6e1c16c',
                partyId: '18477',
              },
            ],
          },
          company: null,
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
        fullCreditChecker: {
          creditCheck: {
            uuid: '36f17fb0-b72d-430e-bd5f-ca2a9b38c239',
            creditCheckType: 'B2C_FULL_CREDIT_CHECKER',
            creditCheckLines: [],
          },
          party: {
            uuid: '2f852fc1-2555-4688-b618-d17e32e32b6f',
            person: {
              uuid: '7c350898-0eb9-4d06-99c3-9e395396fca1',
              partyId: '13670',
              partyUuid: '2f852fc1-2555-4688-b618-d17e32e32b6f',
              firstName: 'Test',
              lastName: 'Test',
            },
          },
        },
      },
    },
  };
}
