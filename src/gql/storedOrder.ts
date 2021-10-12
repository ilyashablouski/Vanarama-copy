import { ApolloError, gql, useMutation, useQuery } from '@apollo/client';
import { SaveOrder } from '../../generated/SaveOrder';
import { GetOrder } from '../../generated/GetOrder';

export const GET_ORDER_QUERY = gql`
  query GetOrder {
    storedOrder @client {
      order
      rating
    }
  }
`;

export function useGetOrderQuery(
  onCompleted?: (data: GetOrder) => void,
  onError?: (error: ApolloError) => void,
) {
  return useQuery<GetOrder>(GET_ORDER_QUERY, {
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
