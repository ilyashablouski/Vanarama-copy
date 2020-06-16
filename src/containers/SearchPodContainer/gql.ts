import { useQuery, gql } from '@apollo/client';

export const GET_SEARCH_POD_DATA = gql`
  query filterList($vehicleTypes: [VehicleTypeEnum!]) {
    filterList(filter: { vehicleTypes: $vehicleTypes }) {
      vehicleTypes
      groupedRanges {
        parent
        children
      }
      bodyStyles
    }
  }
`;

export function filterListByTypes(vehicleTypes: string[]) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery(GET_SEARCH_POD_DATA, {
    variables: {
      vehicleTypes,
    },
  });
}
