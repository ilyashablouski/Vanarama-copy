import { useQuery, gql } from '@apollo/client';
import {
  GetProductCard,
  GetProductCardVariables,
} from '../../../generated/GetProductCard';

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

export function useVehicleData(vehicles, skip) {
  return useQuery<GetProductCard, GetProductCardVariables>(GET_VEHICLES_DATA, {
    variables: {
      vehicles,
    },
    skip
  });
}
