import { gql, useLazyQuery } from '@apollo/client';

import {
  VehicleListTotalCount,
  VehicleListTotalCountVariables,
} from '../../generated/VehicleListTotalCount';
import { VehicleTypeEnum } from '../../generated/globalTypes';

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
