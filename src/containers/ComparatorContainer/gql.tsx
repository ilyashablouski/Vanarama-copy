import { useQuery, gql, useLazyQuery } from '@apollo/client';
import {
  vehicleComparator,
  vehicleComparatorVariables,
} from '../../../generated/vehicleComparator';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import {
  VehicleListTotalCount,
  VehicleListTotalCountVariables,
} from '../../../generated/VehicleListTotalCount';

export const GET_VEHICLES_DATA = gql`
  query vehicleComparator($vehicles: [VehicleToCompare!]!) {
    vehicleComparator(vehicles: $vehicles) {
      capId
      vehicleType
      data {
        name
        value
      }
    }
  }
`;

export function useVehicleData(
  vehicles: { capId: number; vehicleType: VehicleTypeEnum | null }[],
  skip: boolean,
) {
  return useQuery<vehicleComparator | vehicleComparatorVariables>(
    GET_VEHICLES_DATA,
    {
      variables: {
        vehicles,
      },
      skip,
    },
  );
}

export const GET_VEHICLE_LIST_TOTAL_COUNT = gql`
  query VehicleListTotalCount(
    $vehicleTypes: [VehicleTypeEnum!]
    $onOffer: Boolean
    $bodyStyles: [String!]
  ) {
    vehicleList(
      filter: {
        vehicleTypes: $vehicleTypes
        onOffer: $onOffer
        bodyStyles: $bodyStyles
      }
    ) {
      totalCount
    }
  }
`;

export function useVehiclesTotalCount(
  type: VehicleTypeEnum,
  bodyStyles?: string[],
) {
  return useLazyQuery<VehicleListTotalCount, VehicleListTotalCountVariables>(
    GET_VEHICLE_LIST_TOTAL_COUNT,
    {
      variables: {
        vehicleTypes: [type],
        bodyStyles: bodyStyles || [],
        onOffer: true,
      },
    },
  );
}
