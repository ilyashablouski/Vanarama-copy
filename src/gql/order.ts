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

export const VEHICLE_PRODUCT_DATA_FRAGMENT = gql`
  fragment vehicleProduct on VehicleProductType {
    derivativeCapId
    description
    vsku
    financeType
    depositPayment
    monthlyPayment
    term
    finalPayment
    leadTime
    annualMileage
    depositMonths
    funderId
    funderData
    colour
    trim
    maintenance
    stockBatchId
    maintenancePrice
    partnerSlug
    vehicleType
    freeInsurance {
      optIn
      eligible
    }
  }
`;

export const GET_ORDER_BY_UUID_DATA = gql`
  ${VEHICLE_PRODUCT_DATA_FRAGMENT}
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
          ...vehicleProduct
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
      onOffer
      capModelDescription
      vehicleType
      capManufacturerDescription
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
    vehicleDetails(capId: $id, vehicleType: $vehicleType) {
      roadsideAssistance {
        years
      }
      warrantyDetails {
        years
        mileage
      }
      freeInsurance
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

export function useCarDerivativeQuery(
  id?: string | null,
  vehicleType?: VehicleTypeEnum,
) {
  return useQuery<GetDerivative, GetDerivativeVariables>(GET_CAR_DERIVATIVE, {
    variables: {
      id: id || '',
      capId: parseInt(id || '', 10),
      vehicleType,
    },
    skip: !id,
  });
}

export const GET_OLAF_DATA = gql`
  ${VEHICLE_PRODUCT_DATA_FRAGMENT}
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
          ...vehicleProduct
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
  ${VEHICLE_PRODUCT_DATA_FRAGMENT}
  mutation CreateUpdateOrder($input: OrderInputObject!) {
    createUpdateOrder(input: $input) {
      uuid
      createdAt
      salesChannel
      referenceNumber
      personUuid
      partyUuid
      leaseType
      additionalData
      status
      lineItems {
        uuid
        quantity
        status
        productId
        productType
        vehicleProduct {
          ...vehicleProduct
        }
      }
    }
  }
`;

export function useCreateUpdateOrder(
  onCompleted?: (data: CreateUpdateOrder) => void,
) {
  return useMutation<CreateUpdateOrder, CreateUpdateOrderVariables>(
    CREATE_UPDATE_ORDER_MUTATION,
    {
      onCompleted,
    },
  );
}
