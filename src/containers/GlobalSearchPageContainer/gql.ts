import { gql, useLazyQuery } from '@apollo/client';
import {
  productFilter as IProductFilter,
  productFilterVariables as IProductFilterVariables,
} from '../../../generated/productFilter';
import { ProductDerivativeFilter } from '../../../generated/globalTypes';

export const GET_FILTERS_DATA = gql`
  query productFilter($query: String, $filters: ProductDerivativeFilter) {
    productFilter(query: $query, filters: $filters) {
      make
      range
      transmissions
      fuelTypes
      bodyStyles
      vehicleCategory
    }
  }
`;

export function useProductFilters(
  query: string,
  onCompleted?: (data: IProductFilter) => void,
  filters?: ProductDerivativeFilter,
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useLazyQuery<IProductFilter, IProductFilterVariables>(
    GET_FILTERS_DATA,
    {
      variables: {
        query,
        filters,
      },
      onCompleted,
    },
  );
}
