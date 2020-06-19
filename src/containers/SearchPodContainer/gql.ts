import { useQuery, gql, useLazyQuery } from '@apollo/client';

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

export const GET_TYPE_AND_BUDGET_DATA = gql`
  query filterTypeAndBudget(
    $vehicleTypes: [VehicleTypeEnum!]
    $manufacturerName: String
    $rangeName: String
  ) {
    filterList(
      filter: {
        vehicleTypes: $vehicleTypes
        manufacturerName: $manufacturerName
        rangeName: $rangeName
      }
    ) {
      vehicleTypes
      bodyStyles
      financeProfilesRateMax
      financeProfilesRateMin
    }
  }
`;

export function filterTypeAndBudget(
  vehicleTypes: string[],
  manufacturerName: string,
  rangeName?: string,
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useLazyQuery(GET_TYPE_AND_BUDGET_DATA, {
    variables: {
      vehicleTypes,
      manufacturerName,
      rangeName,
    },
  });
}
