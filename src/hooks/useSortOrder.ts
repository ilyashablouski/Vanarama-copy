import { useApolloClient, gql } from '@apollo/client';
import {
  ProductDerivativeSort,
  SortDirection,
  SortField,
  SortObject,
} from '../../generated/globalTypes';
import { Nullable } from '../types/common';

const query = gql`
  query SortOrderQuery {
    sortOrder @client
  }
`;

/**
 * --- useSortOrder hook ---
 * @return {Array} return sort order data array
 */
export default function useSortOrder(
  sortPresetValue?: Nullable<(SortObject | ProductDerivativeSort)[]>,
) {
  const client = useApolloClient();
  const initState = [
    {
      field: SortField.availability,
      direction: SortDirection.ASC,
    },
    { field: SortField.rate, direction: SortDirection.ASC },
  ];
  const onWriteQuery = (sort?: (SortObject | ProductDerivativeSort)[]) => {
    client.writeQuery({
      query,
      data: {
        __typename: 'SortOrder',
        sortOrder: sortPresetValue || sort,
      },
    });
  };
  if (sortPresetValue && client) {
    onWriteQuery(sortPresetValue);
  }
  return {
    saveSortOrder(sort: (SortObject | ProductDerivativeSort)[]): void {
      onWriteQuery(sort);
    },
    get savedSortOrder(): (SortObject | ProductDerivativeSort)[] {
      try {
        const res = client.readQuery({ query });
        return res.sortOrder;
      } catch (error) {
        return sortPresetValue || initState;
      }
    },
  };
}
