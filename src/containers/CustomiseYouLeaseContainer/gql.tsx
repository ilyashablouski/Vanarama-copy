import { useQuery, gql } from '@apollo/client';
import {
  GetLeaseDetails,
  GetLeaseDetailsVariables,
} from '../../../generated/GetLeaseDetails';
import { VehicleTypeEnum } from '../../../generated/globalTypes';

export const GET_DETAILS_DATA = gql`
  query GetLeaseDetails($capIdDetails: ID!, $vehicleType: VehicleTypeEnum) {
    leaseAdjustParams {
      mileages
      terms
      upfronts
    }
    derivativeInfo(id: $capIdDetails, vehicleType: $vehicleType) {
      id
      name
      colours {
        id
        optionDescription
      }
      trims {
        id
        optionDescription
      }
    }
  }
`;

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

export function useDetailsData(capId: number, vehicleType: VehicleTypeEnum) {
  return useQuery<GetLeaseDetails, GetLeaseDetailsVariables>(GET_DETAILS_DATA, {
    variables: {
      capIdDetails: `${capId}`,
      vehicleType,
    },
  });
}
