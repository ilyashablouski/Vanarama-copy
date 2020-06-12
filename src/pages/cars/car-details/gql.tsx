import { useQuery, gql } from '@apollo/client';
import {
  GetCarDetailsDataQuery,
  GetCarDetailsDataQueryVariables,
} from '../../../../generated/GetCarDetailsDaraQuery';

export const GET_CAR_DATA = gql`
  query vehicleConfigurationByCapId(
    $capId: Int!
    $capIdDetails: ID!
    $vehicleType: VehicleTypeEnum
  ) {
    vehicleConfigurationByCapId(capId: $capId, vehicleType: $vehicleType) {
      uuid
      capManufacturerDescription
      capModelDescription
      capDerivativeDescription
      capPaintDescription
      capTrimDescription
      onOffer
      offerRanking
    }
    vehicleDetails(capId: $capIdDetails, vehicleType: $vehicleType) {
      averageRating
      brochureUrl
    }
  }
`;

export function useCarData(capId: number, vehicleType: 'CAR' | 'LCV') {
  return useQuery<GetCarDetailsDataQuery, GetCarDetailsDataQueryVariables>(
    GET_CAR_DATA,
    {
      variables: {
        capId,
        capIdDetails: capId,
        vehicleType,
      },
    },
  );
}
