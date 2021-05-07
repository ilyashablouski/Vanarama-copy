import { useQuery, gql, useMutation, useLazyQuery } from '@apollo/client';
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
          funderId
          funderData
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
  query GetDerivative($id: ID!, $capId: Int!, $vehicleType: VehicleTypeEnum) {
    vehicleConfigurationByCapId(capId: $capId, vehicleType: $vehicleType) {
      url
    }
    derivative(id: $id, vehicleType: $vehicleType) {
      id
      vehicleType
      capCode
      name
      slug
      bodyType {
        name
        slug
      }
      manufacturer {
        name
        slug
      }
      model {
        name
        slug
      }
      fuelType {
        name
      }
      transmission {
        name
      }
      bodyStyle {
        name
      }
      range {
        name
        slug
      }
    }
    vehicleImages(capIds: [$id], vehicleType: $vehicleType) {
      vehicleType
      capId
      mainImageUrl
    }
  }
`;

export function useCarDerivativeData(
  id: string,
  vehicleType?: VehicleTypeEnum,
) {
  return useLazyQuery<GetDerivative, GetDerivativeVariables>(
    GET_CAR_DERIVATIVE,
    {
      variables: {
        id,
        capId: parseInt(id, 10),
        vehicleType,
      },
    },
  );
}

export const GET_OLAF_DATA = gql`
  query GetOlafData($uuid: ID!) {
    orderByUuid(uuid: $uuid) {
      uuid
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
          leadTime
          maintenancePrice
          annualMileage
          depositMonths
          funderId
          funderData
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
          funderId
          funderData
          maintenancePrice
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
