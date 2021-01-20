import {
  DocumentNode,
  OperationVariables,
  useApolloClient,
} from '@apollo/client';
import React from 'react';

/* export const useImperativeQuery = (query: DocumentNode) => {
  const { refetch } = useQuery(query, { skip: true });

  const imperativelyCallQuery = (variables: any) => {
    return refetch(variables);
  };

  return imperativelyCallQuery;
}; */

export function useImperativeQuery<
  TData = any,
  TVariables = OperationVariables
>(query: DocumentNode) {
  const client = useApolloClient();
  return React.useCallback(
    (variables: TVariables) =>
      client.query<TData, TVariables>({
        query,
        variables,
      }),
    [client, query],
  );
}

export default useImperativeQuery;
