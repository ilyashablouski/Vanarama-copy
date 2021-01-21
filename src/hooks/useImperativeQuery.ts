import {
  DocumentNode,
  OperationVariables, QueryOptions,
  useApolloClient,
} from '@apollo/client';
import React from 'react';

export function useImperativeQuery<
  TData = any,
  TVariables = OperationVariables
>(
  query: DocumentNode,
  fetchPolicy: QueryOptions['fetchPolicy'] = 'network-only',
) {
  const client = useApolloClient();
  return React.useCallback(
    (variables: TVariables) =>
      client.query<TData, TVariables>({
        query,
        variables,
        fetchPolicy,
      }),
    [client, query],
  );
}

export default useImperativeQuery;
