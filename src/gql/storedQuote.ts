import { ApolloError, gql, useMutation, useQuery } from '@apollo/client';
import { GetQuote, GetQuote_storedQuote } from '../../generated/GetQuote';

export const GET_QUOTE_QUERY = gql`
  query GetQuote {
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
  mutation SaveQuote($quote: VehicleProductInputObject) {
    saveQuote(quote: $quote) @client {
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
  onCompleted?: (arg: GetQuote_storedQuote) => void,
  onError?: (error: ApolloError) => void,
) {
  return useMutation<GetQuote_storedQuote>(SAVE_QUOTE_MUTATION, {
    onCompleted,
    onError,
  });
}
