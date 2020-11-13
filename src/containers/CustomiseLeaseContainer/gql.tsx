import { useQuery, gql, useLazyQuery, ApolloError } from '@apollo/client';
import {
  GetQuoteDetails,
  GetQuoteDetailsVariables,
} from '../../../generated/GetQuoteDetails';
import { IQuoteDataInputs } from './interfaces';

export const GET_QUOTE_DATA = gql`
  query GetQuoteDetails(
    $capId: ID!
    $vehicleType: VehicleTypeEnum
    $leaseType: LeaseTypeEnum
    $mileage: Int
    $trim: Int
    $colour: Int
    $term: Int
    $upfront: Int
  ) {
    quoteByCapId(
      capId: $capId
      mileage: $mileage
      term: $term
      upfront: $upfront
      vehicleType: $vehicleType
      leaseType: $leaseType
      colour: $colour
      trim: $trim
    ) {
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
    }
  }
`;

export function useQuoteData({
  capId,
  vehicleType,
  mileage,
  term,
  upfront,
  leaseType,
  trim,
  colour,
}: IQuoteDataInputs) {
  return useQuery<GetQuoteDetails, GetQuoteDetailsVariables>(GET_QUOTE_DATA, {
    variables: {
      capId,
      vehicleType,
      mileage,
      term,
      upfront,
      leaseType,
      trim,
      colour,
    },
  });
}

export function useQuoteDataLazyQuery(
  onCompleted?: (data: GetQuoteDetails) => void,
  onError?: (error: ApolloError) => void,
) {
  return useLazyQuery<GetQuoteDetails, GetQuoteDetailsVariables>(
    GET_QUOTE_DATA,
    {
      onCompleted,
      onError,
    },
  );
}
