import { ApolloError, gql, useMutation, useQuery } from '@apollo/client';
import { GetQuote } from '../../generated/GetQuote';
import { SaveQuote, SaveQuoteVariables } from '../../generated/SaveQuote';

export const GET_QUOTE_QUERY = gql`
  query GetStoredQuote {
    storedQuote @client {
      term
      funderId
      mileage
      upfront
      trim
      colour
      leadTime
      stock
      vehicleType
      leaseType
      stockBatchId
      processingFee
      nextBestPrice {
        maintained
        nonMaintained
      }
      leaseCost {
        monthlyRental
        initialRental
        excessMileage
      }
      maintenanceCost {
        monthlyRental
        initialRental
        excessMileage
      }
      freeInsurance
    }
  }
`;

export function useGetQuoteQuery(
  onCompleted?: (data: GetQuote) => void,
  onError?: (error: ApolloError) => void,
) {
  return useQuery<GetQuote>(GET_QUOTE_QUERY, {
    onCompleted,
    onError,
  });
}

export const SAVE_QUOTE_MUTATION = gql`
  mutation SaveQuote($input: QuoteObjectInput) {
    saveQuote(input: $input) @client {
      term
      funderId
      mileage
      upfront
      trim
      colour
      leadTime
      stock
      vehicleType
      leaseType
      stockBatchId
      processingFee
      nextBestPrice {
        maintained
        nonMaintained
      }
      leaseCost {
        monthlyRental
        initialRental
        excessMileage
      }
      maintenanceCost {
        monthlyRental
        initialRental
        excessMileage
      }
      freeInsurance
    }
  }
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
