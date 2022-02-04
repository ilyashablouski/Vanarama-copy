import { ApolloError, gql, useMutation, useQuery } from '@apollo/client';
import { GetStoredQuote } from '../../generated/GetStoredQuote';
import { SaveQuote, SaveQuoteVariables } from '../../generated/SaveQuote';
import { QUOTE_DATA_FRAGMENT } from '../containers/CustomiseLeaseContainer/gql';

export const GET_QUOTE_QUERY = gql`
  query GetStoredQuote {
    storedQuote @client {
      ...quoteData
    }
  }
  ${QUOTE_DATA_FRAGMENT}
`;

export function useGetQuoteQuery(
  onCompleted?: (data: GetStoredQuote) => void,
  onError?: (error: ApolloError) => void,
) {
  return useQuery<GetStoredQuote>(GET_QUOTE_QUERY, {
    fetchPolicy: 'no-cache',
    onCompleted,
    onError,
  });
}

export const SAVE_QUOTE_MUTATION = gql`
  mutation SaveQuote($quote: QuoteInputObject) {
    saveQuote(quote: $quote) @client {
      ...quoteData
    }
  }
  ${QUOTE_DATA_FRAGMENT}
`;

export function useSaveQuoteMutation(
  onCompleted?: (mutationResult: SaveQuote) => void,
  onError?: (error: ApolloError) => void,
) {
  return useMutation<SaveQuote, SaveQuoteVariables>(SAVE_QUOTE_MUTATION, {
    onCompleted,
    onError,
  });
}
