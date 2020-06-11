import { useQuery, gql } from '@apollo/client';
import {
  GetAboutCarDataQuery,
  GetAboutCarDataQueryVariables,
} from '../../../../generated/GetAboutCarDaraQuery';

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
      warranty
      brochureUrl
      # keyInformation
      customerReview {
        name
        rating
      }
      relatedVehicle {
        capId
      }s
      independentReview
    }
  }
`;

export function useCarData(
  capId: number,
  capIdDetails: number,
  vehicleType: 'CAR' | 'LCV',
) {
  return useQuery<GetAboutCarDataQuery, GetAboutCarDataQueryVariables>(
    GET_CAR_DATA,
    {
      variables: {
        capId,
        capIdDetails,
        vehicleType,
      },
    },
  );
}
