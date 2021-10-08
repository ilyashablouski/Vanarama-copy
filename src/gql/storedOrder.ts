import { ApolloError, gql, useMutation } from '@apollo/client';
import { OrderInputObject } from '../../generated/globalTypes';

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
