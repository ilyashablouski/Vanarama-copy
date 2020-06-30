import { useQuery, gql } from '@apollo/client';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import {
  GetProductCards,
  GetProductCardsVariables,
} from '../../../generated/GetProductCards';

export const GET_PRODUCT_CARDS_DATA = gql`
  query GetProductCards($capIds: [ID!], $vehicleType: VehicleTypeEnum) {
    productCards(capIds: $capIds, vehicleType: $vehicleType) {
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
export function useProductCardsData(
  capIds?: string[],
  vehicleType?: VehicleTypeEnum,
) {
  return useQuery<GetProductCards, GetProductCardsVariables>(
    GET_PRODUCT_CARDS_DATA,
    {
      variables: {
        capIds,
        vehicleType,
      },
    },
  );
}
