import { useQuery, gql } from '@apollo/client';

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
  return useQuery(GET_VEHICLES_DATA, {
    variables: {
      vehicles,
    },
    skip
  });
}
