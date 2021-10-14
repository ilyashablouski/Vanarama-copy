import { ApolloError, gql, useMutation, useQuery } from '@apollo/client';
import { SaveOrder } from '../../generated/SaveOrder';
import { GetStoredOrder } from '../../generated/GetStoredOrder';

export const GET_STORED_ORDER_QUERY = gql`
  query GetStoredOrder {
    storedOrder @client {
      order
      rating
    }
  }
`;

export function useStoredOrderQuery(
  onCompleted?: (data: GetStoredOrder) => void,
  onError?: (error: ApolloError) => void,
) {
  return useQuery<GetStoredOrder>(GET_STORED_ORDER_QUERY, {
    ssr: false,
    onCompleted,
    onError,
  });
}

export const SAVE_ORDER_MUTATION = gql`
  mutation SaveOrder($order: OrderInputObject, $rating: Float) {
    saveOrder(order: $order, rating: $rating) @client {
      order
      rating
    }
  }
`;

export function useSaveOrderMutation(
  onCompleted?: (args: SaveOrder) => void,
  onError?: (error: ApolloError) => void,
) {
  return useMutation<SaveOrder>(SAVE_ORDER_MUTATION, {
    onCompleted,
    onError,
  });
}
