import { ApolloError, gql, useMutation, useQuery } from '@apollo/client';
import { OrderInputObject } from '../../generated/globalTypes';

interface OrderInputObjectWithRating extends OrderInputObject {
  rating?: number;
}

interface IOrderStorageData {
  getOrder: OrderInputObjectWithRating;
}

export const GET_ORDER_QUERY = gql`
  query GetOrder {
    getOrder @client
  }
`;

export function useGetOrderQuery(
  onCompleted?: (data: IOrderStorageData) => void,
  onError?: (error: ApolloError) => void,
) {
  return useQuery<IOrderStorageData>(GET_ORDER_QUERY, {
    onCompleted,
    onError,
  });
}

export const SAVE_ORDER_MUTATION = gql`
  mutation SaveOrder($data: OrderInputObjectWithRating) {
    saveOrder(data: $data) @client
  }
`;

export function useSaveOrderMutation(
  onCompleted?: (data: OrderInputObjectWithRating) => void,
  onError?: (error: ApolloError) => void,
) {
  return useMutation<OrderInputObjectWithRating>(SAVE_ORDER_MUTATION, {
    onCompleted,
    onError,
  });
}
