import { useQuery, gql } from '@apollo/client';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import {
  GetProductCard,
  GetProductCardVariables,
} from '../../../generated/GetProductCard';

export const GET_PRODUCT_CARDS_DATA = gql`
  query GetProductCard($capIds: [ID!]!, $vehicleType: VehicleTypeEnum) {
    productCard(capIds: $capIds, vehicleType: $vehicleType) {
      vehicleType
      capId
      manufacturerName
      rangeName
      derivativeName
      averageRating
      isOnOffer
      offerPosition
      leadTime
      imageUrl
      keyInformation {
        name
        value
      }
      businessRate
      personalRate
    }
  }
`;

/**
 *  @props capIdArray - string array with capId from relatedVehicles in vehicleDetails
 *  @props vehicleType - VehicleTypeEnum
 */
export function useProductCardData(
  capIds?: string[],
  vehicleType?: VehicleTypeEnum,
) {
  return useQuery<GetProductCard, GetProductCardVariables>(
    GET_PRODUCT_CARDS_DATA,
    {
      variables: {
        capIds,
        vehicleType,
      },
    },
  );
}
