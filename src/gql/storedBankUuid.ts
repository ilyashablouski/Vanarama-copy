import { ApolloError, gql, useMutation, useQuery } from '@apollo/client';
import { GetStoredBankUuidQuery } from '../../generated/GetStoredBankUuidQuery';
import {
  SaveStoredBankUuidMutation,
  SaveStoredBankUuidMutationVariables,
} from '../../generated/SaveStoredBankUuidMutation';

export const GET_STORED_BANK_UUID_QUERY = gql`
  query GetStoredBankUuidQuery {
    storedPersonBankUuid @client
  }
`;

export const SAVE_STORED_BANK_UUID_MUTATION = gql`
  mutation SaveStoredBankUuidMutation($bankUuid: ID) {
    savePersonBankUuid(bankUuid: $bankUuid) @client
  }
`;

export function useStoredBankUuidQuery(
  onCompleted?: (data: GetStoredBankUuidQuery) => void,
  onError?: (error: ApolloError) => void,
) {
  return useQuery<GetStoredBankUuidQuery>(GET_STORED_BANK_UUID_QUERY, {
    onCompleted,
    onError,
  });
}

export function useSaveStoredBankUuidMutation(
  onCompleted?: (mutationResult: SaveStoredBankUuidMutation) => void,
  onError?: (error: ApolloError) => void,
) {
  return useMutation<
    SaveStoredBankUuidMutation,
    SaveStoredBankUuidMutationVariables
  >(SAVE_STORED_BANK_UUID_MUTATION, {
    onCompleted,
    onError,
  });
}
