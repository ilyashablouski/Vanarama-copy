import { ApolloError, gql, useMutation, useQuery } from '@apollo/client';
import { GetStoredQuote } from '../../generated/GetStoredQuote';
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
  onCompleted?: (data: GetStoredQuote) => void,
  onError?: (error: ApolloError) => void,
) {
  return useQuery<GetStoredQuote>(GET_QUOTE_QUERY, {
    onCompleted,
    onError,
  });
}

export const SAVE_QUOTE_MUTATION = gql`
  mutation SaveQuote($input: QuoteInputObject) {
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
