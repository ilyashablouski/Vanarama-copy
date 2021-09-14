import { gql, useLazyQuery } from '@apollo/client';
import {
  productFilter as IProductFilter,
  productFilterVariables as IProductFilterVariables,
} from '../../../generated/productFilter';
import { ProductDerivativeFilter } from '../../../generated/globalTypes';

export const FILTERS_AGGREGATIONS = gql`
  fragment filtersAggregation on ProductFilterAggregations {
    manufacturerName
    manufacturerNames
    rangeNames {
      manufacturer
      ranges
    }
    rangeName
    transmissions
    fuelTypes
    bodyStyles
    vehicleCategory
    doors
    noOfSeats
    engineSizeGroup
    standardEuroEmissions
    loadHeightGroup
    loadLengthGroup
    payloadGroup
    mpgGroup
    co2Group
    enginePowerBhp {
      min
      max
    }
  }
`;

export const GET_FILTERS_DATA = gql`
  ${FILTERS_AGGREGATIONS}
  query productFilter($query: String, $filters: ProductDerivativeFilter) {
    productFilter(query: $query, filters: $filters) {
      ...filtersAggregation
    }
  }
`;

export function useProductFilters(
  query: string | undefined,
  onCompleted?: (data: IProductFilter) => void,
  filters?: ProductDerivativeFilter,
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useLazyQuery<IProductFilter, IProductFilterVariables>(
    GET_FILTERS_DATA,
    {
      variables: {
        query: query || undefined,
        filters,
      },
      onCompleted,
      fetchPolicy: 'network-only',
    },
  );
}
