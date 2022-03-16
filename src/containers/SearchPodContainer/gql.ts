import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { filterTypeAndBudget as IFilterTypeAndBudget } from '../../../generated/filterTypeAndBudget';
import { filterList as IFilterList } from '../../../generated/filterList';

export const GET_SEARCH_POD_DATA = gql`
  query filterList(
    $vehicleTypes: [VehicleTypeEnum!]
    $onOffer: Boolean
    $manufacturerSlug: String
    $rangeSlug: String
    $bodyStyles: [String!]
    $transmissions: [String!]
    $fuelTypes: [String!]
    $rate: RateInputObject
  ) {
    filterList(
      filter: {
        vehicleTypes: $vehicleTypes
        onOffer: $onOffer
        manufacturerSlug: $manufacturerSlug
        rangeSlug: $rangeSlug
        bodyStyles: $bodyStyles
        transmissions: $transmissions
        fuelTypes: $fuelTypes
        rate: $rate
      }
    ) {
      vehicleTypes
      groupedRangesWithSlug {
        parent {
          label
          slug
        }
        children {
          label
          slug
        }
      }
      bodyStyles
      transmissions
      fuelTypes
    }
  }
`;

export function useFilterList(
  vehicleTypes: string[],
  onOffer: boolean | null = null,
  onCompleted: (data: IFilterList) => void = data => data,
  filters = {},
  skip = false,
  fuelTypes?: string[],
  bodyStyles?: string[],
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery(GET_SEARCH_POD_DATA, {
    variables: {
      vehicleTypes,
      onOffer,
      bodyStyles,
      ...filters,
      fuelTypes,
    },
    onCompleted,
    skip,
  });
}

export const GET_TYPE_AND_BUDGET_DATA = gql`
  query filterTypeAndBudget(
    $vehicleTypes: [VehicleTypeEnum!]
    $manufacturerSlug: String
    $rangeSlug: String
    $bodyStyles: [String!]
    $fuelTypes: [String!]
  ) {
    filterList(
      filter: {
        vehicleTypes: $vehicleTypes
        manufacturerSlug: $manufacturerSlug
        rangeSlug: $rangeSlug
        bodyStyles: $bodyStyles
        fuelTypes: $fuelTypes
      }
    ) {
      vehicleTypes
      bodyStyles
      financeProfilesRateMax
      financeProfilesRateMin
      groupedRangesWithSlug {
        parent {
          label
          slug
        }
        children {
          label
          slug
        }
      }
    }
  }
`;

export function filterTypeAndBudget(
  vehicleTypes: string[],
  manufacturerSlug?: string,
  rangeSlug?: string,
  bodyStyles?: string[],
  fuelTypes?: string[],
  onCompleted?: (data: IFilterTypeAndBudget) => void,
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useLazyQuery(GET_TYPE_AND_BUDGET_DATA, {
    onCompleted,
    variables: {
      vehicleTypes,
      manufacturerSlug: manufacturerSlug || undefined,
      rangeSlug: rangeSlug || undefined,
      bodyStyles: !bodyStyles || bodyStyles[0]?.trim() ? bodyStyles : undefined,
      fuelTypes: fuelTypes || undefined,
    },
  });
}
