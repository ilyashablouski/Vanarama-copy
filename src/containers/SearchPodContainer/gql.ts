import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { filterTypeAndBudget as IFilterTypeAndBudget } from '../../../generated/filterTypeAndBudget';

export const GET_SEARCH_POD_DATA = gql`
  query filterList(
    $vehicleTypes: [VehicleTypeEnum!]
    $onOffer: Boolean
    $manufacturerName: String
    $rangeName: String
    $bodyStyles: [String!]
    $transmissions: [String!]
    $fuelTypes: [String!]
  ) {
    filterList(filter: { 
      vehicleTypes: $vehicleTypes
      onOffer: $onOffer
      manufacturerName: $manufacturerName
      rangeName: $rangeName
      bodyStyles: $bodyStyles
      transmissions: $transmissions
      fuelTypes: $fuelTypes
     }) {
      vehicleTypes
      groupedRanges {
        parent
        children
      }
      bodyStyles
      transmissions
      fuelTypes
    }
  }
`;

export function filterList(
  vehicleTypes: string[],
  onOffer = false,
  filters = {},
  ) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery(GET_SEARCH_POD_DATA, {
    variables: {
      vehicleTypes,
      onOffer,
      ...filters,
    },
  });
}

export const GET_TYPE_AND_BUDGET_DATA = gql`
  query filterTypeAndBudget(
    $vehicleTypes: [VehicleTypeEnum!]
    $manufacturerName: String
    $rangeName: String
    $bodyStyles: [String!]
  ) {
    filterList(
      filter: {
        vehicleTypes: $vehicleTypes
        manufacturerName: $manufacturerName
        rangeName: $rangeName
        bodyStyles: $bodyStyles
      }
    ) {
      vehicleTypes
      bodyStyles
      financeProfilesRateMax
      financeProfilesRateMin
      groupedRanges {
        parent
        children
      }
    }
  }
`;

export function filterTypeAndBudget(
  vehicleTypes: string[],
  manufacturerName?: string,
  rangeName?: string,
  bodyStyles?: string[],
  onCompleted?: (data: IFilterTypeAndBudget) => void,
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useLazyQuery(GET_TYPE_AND_BUDGET_DATA, {
    onCompleted,
    variables: {
      vehicleTypes,
      manufacturerName,
      rangeName,
      bodyStyles,
    },
  });
}
