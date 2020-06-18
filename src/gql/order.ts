import { useQuery, gql } from '@apollo/client';
import { VehicleTypeEnum } from '../../generated/globalTypes';

export const GET_ORDER_BY_UUID_DATA = gql`
  query GetOrderByUuid($uuid: ID!) {
    orderByUuid(uuid: $uuid) {
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

export function useGetOrder(uuid: string) {
  return useQuery(GET_ORDER_BY_UUID_DATA, {
    variables: {
      uuid,
    },
  });
}

export const GET_CAR_DERIVATIVE = gql`
  query GetDerivative($id: ID!, $vehicleType: VehicleTypeEnum) {
    derivative(id: $id, vehicleType: $vehicleType) {
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
  id: string,
  vehicleType: VehicleTypeEnum,
) {
  return useQuery(GET_CAR_DERIVATIVE, {
    variables: {
      id,
      vehicleType,
    },
  });
}
