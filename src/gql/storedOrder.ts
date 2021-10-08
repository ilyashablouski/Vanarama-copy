import { ApolloError, gql, useMutation, useQuery } from '@apollo/client';
import { OrderInputObject } from '../../generated/globalTypes';

export const GET_ORDER_QUERY = gql`
  query GetOrder {
    getOrder @client
  }
`;

export function useGetOrderQuery(
  onCompleted?: (data: OrderInputObject) => void,
  onError?: (error: ApolloError) => void,
) {
  return useQuery<OrderInputObject>(GET_ORDER_QUERY, {
    onCompleted,
    onError,
  });
}

export const SAVE_ORDER_MUTATION = gql`
  mutation SaveOrder($data: OrderInputObject) {
    saveOrder(data: $data) @client
  }
`;

export function useSaveOrderMutation(
  onCompleted?: (data: OrderInputObject) => void,
  onError?: (error: ApolloError) => void,
) {
  return useMutation<OrderInputObject>(SAVE_ORDER_MUTATION, {
    onCompleted,
    onError,
  });
}
