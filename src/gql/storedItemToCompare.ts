import {
  ApolloClient,
  ApolloError,
  gql,
  NormalizedCacheObject,
  useMutation,
  useQuery,
} from '@apollo/client';
import { GetStoredItemsToCompareQuery } from '../../generated/GetStoredItemsToCompareQuery';
import {
  SaveItemsToCompareMutation,
  SaveItemsToCompareMutationVariables,
} from '../../generated/SaveItemsToCompareMutation';

export const GET_STORED_ITEMS_TO_COMPARE_QUERY = gql`
  query GetStoredItemsToCompareQuery {
    storedItemsToCompare @client {
      capId
    }
  }
`;

export const SAVE_ITEMS_TO_COMPARE_MUTATION = gql`
  mutation SaveItemsToCompareMutation($items: [ItemToCompareInputObject]) {
    saveItemsToCompare(items: $items) @client {
      capId
    }
  }
`;

export function useStoredItemsToCompareQuery(
  onCompleted?: (data: GetStoredItemsToCompareQuery) => void,
  onError?: (error: ApolloError) => void,
) {
  return useQuery<GetStoredItemsToCompareQuery>(
    GET_STORED_ITEMS_TO_COMPARE_QUERY,
    {
      ssr: false,
      fetchPolicy: 'no-cache',
      onCompleted,
      onError,
    },
  );
}

export function useSaveItemsToCompareMutation(
  onCompleted?: (mutationResult: SaveItemsToCompareMutation) => void,
  onError?: (error: ApolloError) => void,
) {
  return useMutation<
    SaveItemsToCompareMutation,
    SaveItemsToCompareMutationVariables
  >(SAVE_ITEMS_TO_COMPARE_MUTATION, {
    onCompleted,
    onError,
  });
}

export function getStoredItemsToCompare(
  client: ApolloClient<NormalizedCacheObject | object>,
) {
  return client
    .query<GetStoredItemsToCompareQuery>({
      query: GET_STORED_ITEMS_TO_COMPARE_QUERY,
    })
    .then(operation => operation.data?.storedItemsToCompare)
    .then(items => (items || []).filter(Boolean))
    .catch(() => null);
}

export function saveItemsToCompare(
  client: ApolloClient<NormalizedCacheObject | object>,
  items: SaveItemsToCompareMutationVariables['items'],
) {
  return client
    .query<SaveItemsToCompareMutation, SaveItemsToCompareMutationVariables>({
      query: SAVE_ITEMS_TO_COMPARE_MUTATION,
      variables: {
        items,
      },
    })
    .then(operation => operation.data?.saveItemsToCompare)
    .then(savedItems => (savedItems || []).filter(Boolean))
    .catch(() => null);
}
