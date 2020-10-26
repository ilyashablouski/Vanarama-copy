import { useApolloClient, gql } from '@apollo/client';
import { SortDirection, SortField } from '../../generated/globalTypes';

export interface ISortOrder {
  type: SortField;
  direction: SortDirection;
}

const query = gql`
  query SortOrderQuery {
    sortOrder @client
  }
`;

/**
 * --- useSortOrder hook ---
 * @return {Object} return sort order data
 */
export default function useSortOrder() {
  const client = useApolloClient();
  const initState = {
    type: SortField.availability,
    direction: SortDirection.ASC,
  };
  return {
    saveSortOrder(sort: ISortOrder): void {
      client.writeQuery({
        query,
        data: { __typename: 'SortOrder', sortOrder: { ...sort } },
      });
    },
    get savedSortOrder() {
      try {
        const res = client.readQuery({ query });
        return res.sortOrder;
      } catch (e) {
        return initState;
      }
    },
  };
}
