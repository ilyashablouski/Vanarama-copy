import { useApolloClient, gql } from '@apollo/client';
import {
  SortDirection,
  SortField,
  SortObject,
} from '../../generated/globalTypes';

const query = gql`
  query SortOrderQuery {
    sortOrder @client
  }
`;

/**
 * --- useSortOrder hook ---
 * @return {Array} return sort order data array
 */
export default function useSortOrder(sortPresetValue?: SortObject[]) {
  const client = useApolloClient();
  const initState = [
    {
      field: SortField.availability,
      direction: SortDirection.ASC,
    },
    { field: SortField.rate, direction: SortDirection.ASC },
  ];
  const onWriteQuery = (sort?: SortObject[]) => {
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
    saveSortOrder(sort: SortObject[]): void {
      onWriteQuery(sort);
    },
    get savedSortOrder(): SortObject[] {
      try {
        const res = client.readQuery({ query });
        return res.sortOrder;
      } catch (e) {
        return sortPresetValue || initState;
      }
    },
  };
}
