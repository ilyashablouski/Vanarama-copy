import { useQuery, gql, useLazyQuery } from '@apollo/client';
import {
  MyOrdersTypeEnum,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';
import {
  GetDerivatives,
  GetDerivativesVariables,
} from '../../../generated/GetDerivatives';
import {
  GetMyOrders,
  GetMyOrdersVariables,
} from '../../../generated/GetMyOrders';

export const GET_MY_ORDERS_DATA = gql`
  query GetMyOrders($partyUuid: [ID!]!, $filter: MyOrdersTypeEnum!) {
    myOrders(partyUuids: $partyUuid, filter: $filter) {
      uuid
      id
      leaseType
      partyUuid
      personUuid
      referenceNumber
      salesChannel
      status
      createdAt
      updatedAt
      lineItems {
        order {
          uuid
        }
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
          finalPayment
          leadTime
          maintenancePrice
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
          vehicleType
        }
      }
    }
  }
`;

/**
 *  @props partyByUuid - array string with partyByUuid
 *  @props filter - value for filter
 */
export function useMyOrdersData(
  partyByUuid: string[],
  filter: MyOrdersTypeEnum,
) {
  return useLazyQuery<GetMyOrders, GetMyOrdersVariables>(GET_MY_ORDERS_DATA, {
    variables: {
      partyUuid: partyByUuid,
      filter,
    },
  });
}

export const GET_CAR_DERIVATIVES = gql`
  query GetDerivatives($ids: [ID!]!, $vehicleType: VehicleTypeEnum) {
    derivatives(ids: $ids, vehicleType: $vehicleType) {
      id
      capCode
      name
      slug
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
    vehicleImages(capIds: $ids, vehicleType: $vehicleType) {
      vehicleType
      capId
      mainImageUrl
    }
  }
`;

/**
 *  @props capIdArray - string array with capId from orders
 *  @props vehicleType - VehicleTypeEnum
 */
export function useCarDerivativesData(
  ids: string[],
  vehicleType: VehicleTypeEnum,
) {
  return useQuery<GetDerivatives, GetDerivativesVariables>(
    GET_CAR_DERIVATIVES,
    {
      variables: {
        ids,
        vehicleType,
      },
      skip: !ids[0],
    },
  );
}
