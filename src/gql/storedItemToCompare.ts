import { ApolloError, gql, useMutation, useQuery } from '@apollo/client';
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
