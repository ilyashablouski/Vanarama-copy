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
    derivatives(ids: $capIds, vehicleType: $vehicleType) {
      id
      capCode
      name
      slug
      manufacturer {
        name
      }
      manufacturerName
      model {
        name
      }
      modelName
      fuelType {
        name
      }
      fuelTypeName
      transmission {
        name
      }
      transmissionName
      bodyStyle {
        name
      }
      bodyStyleName
      range {
        name
      }
      rangeName
    }
  }
`;

/**
 *  @props capIdArray - string array with capId from relatedVehicles in vehicleDetails
 *  @props vehicleType - VehicleTypeEnum
 */
export function useProductCardData(
  capIds: string[],
  vehicleType?: VehicleTypeEnum,
  skip = false,
) {
  return useQuery<GetProductCard, GetProductCardVariables>(
    GET_PRODUCT_CARDS_DATA,
    {
      variables: {
        capIds,
        vehicleType,
      },
      skip,
    },
  );
}
