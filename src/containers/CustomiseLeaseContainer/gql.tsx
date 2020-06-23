import { useQuery, gql } from '@apollo/client';
import { IQuoteDataInputs } from './interfaces';

export const GET_QUOTE_DATA = gql`
  query GetQuoteDetails(
    $capId: ID!
    $vehicleType: VehicleTypeEnum
    $leaseType: LeaseTypeEnum
    $mileage: Int
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
    ) {
      term
      mileage
      upfront
      trim
      colour
      leadTime
      stock
      vehicleType
      leaseType
      processingFee
      nonMaintained {
        monthlyRental
        initialRental
        excessMileage
      }
      maintained {
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
  return useQuery(GET_QUOTE_DATA, {
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
