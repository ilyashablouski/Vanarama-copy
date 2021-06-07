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
