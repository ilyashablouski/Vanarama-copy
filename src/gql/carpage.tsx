import { useQuery, gql } from '@apollo/client';
import {
  GetVehicleDetails,
  GetVehicleDetailsVariables,
} from '../../generated/GetVehicleDetails';
import { VehicleTypeEnum } from '../../generated/globalTypes';

export const GET_CAR_DATA = gql`
  query GetVehicleDetails(
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

export function useCarData(capId: number, vehicleType: VehicleTypeEnum) {
  return useQuery<GetVehicleDetails, GetVehicleDetailsVariables>(GET_CAR_DATA, {
    variables: {
      capId,
      capIdDetails: `${capId}`,
      vehicleType,
    },
  });
}
