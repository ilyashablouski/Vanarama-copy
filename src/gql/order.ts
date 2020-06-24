import { useQuery, gql } from '@apollo/client';
import { VehicleTypeEnum } from '../../generated/globalTypes';
import {
  GetDerivative,
  GetDerivativeVariables,
} from '../../generated/GetDerivative';
import { GetOlafDataVariables, GetOlafData } from '../../generated/GetOlafData';
import {
  GetOrderByUuid,
  GetOrderByUuidVariables,
} from '../../generated/GetOrderByUuid';

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
  return useQuery<GetOrderByUuid, GetOrderByUuidVariables>(
    GET_ORDER_BY_UUID_DATA,
    {
      variables: {
        uuid,
      },
    },
  );
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
  vehicleType?: VehicleTypeEnum,
) {
  return useQuery<GetDerivative, GetDerivativeVariables>(GET_CAR_DERIVATIVE, {
    variables: {
      id,
      vehicleType,
    },
  });
}

export const GET_OLAF_DATA = gql`
  query GetOlafData($uuid: ID!, $id: ID!, $vehicleType: VehicleTypeEnum) {
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

export function useOlafData(
  uuid: string,
  id: string,
  vehicleType?: VehicleTypeEnum,
) {
  return useQuery<GetOlafData, GetOlafDataVariables>(GET_OLAF_DATA, {
    variables: {
      uuid,
      id,
      vehicleType,
    },
    skip: [uuid, id, vehicleType].some(item => !item),
  });
}
