import { useQuery, gql, useMutation } from '@apollo/client';
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
import {
  CreateUpdateOrder,
  CreateUpdateOrderVariables,
} from '../../generated/CreateUpdateOrder';

export const GET_ORDER_BY_UUID_DATA = gql`
  query GetOrderByUuid($uuid: ID!) {
    orderByUuid(uuid: $uuid) {
      uuid
      id
      leaseType
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
  query GetOlafData($uuid: ID!) {
    orderByUuid(uuid: $uuid) {
      uuid
      id
      leaseType
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

export function useOlafData(uuid: string) {
  return useQuery<GetOlafData, GetOlafDataVariables>(GET_OLAF_DATA, {
    variables: {
      uuid,
    },
    skip: [uuid].some(item => !item),
  });
}

export const CREATE_UPDATE_ORDER_MUTATION = gql`
  mutation CreateUpdateOrder($input: OrderInputObject!) {
    createUpdateOrder(input: $input) {
      uuid
      createdAt
      salesChannel
      status
      lineItems {
        uuid
        quantity
        status
        productId
        productType
        vehicleProduct {
          derivativeCapId
          description
          vsku
          term
          annualMileage
          monthlyPayment
          depositMonths
          funder
        }
      }
    }
  }
`;

export function useCreateUpdateOrder(
  onCompleted: (data: CreateUpdateOrder) => void,
) {
  return useMutation<CreateUpdateOrder, CreateUpdateOrderVariables>(
    CREATE_UPDATE_ORDER_MUTATION,
    {
      onCompleted,
    },
  );
}
