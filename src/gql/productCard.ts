import { gql, useQuery } from '@apollo/client';
import { ProductCardData } from '../../generated/ProductCardData';

export const PRODUCT_CARD_CONTENT = gql`
  query ProductCardData(
    $type: VehicleTypeEnum!
    $bodyType: String
    $excludeBodyType: String
    $size: Int
    $offer: Boolean
  ) {
    productCarousel(
      vehicleType: $type
      bodyType: $bodyType
      excludeBodyType: $excludeBodyType
      pageSize: $size
      onOffer: $offer
    ) {
      capId
      isOnOffer
      manufacturerName
      derivativeName
      rangeName
      modelName
      imageUrl
      leadTime
      averageRating
      businessRate
      personalRate
      offerPosition
      keyInformation {
        name
        value
      }
      vehicleType
    }
  }
`;

export function useProductCard(type: string, size: number, offer: boolean) {
  return useQuery<ProductCardData>(PRODUCT_CARD_CONTENT, {
    variables: {
      type,
      size,
      offer,
    },
  });
}

export const VEHICLE_CONFIGURATION_BY_URL = gql`
  query VehicleConfigurationByUrl($url: String!) {
    vehicleConfigurationByUrl(url: $url) {
      uuid
      capDerivativeId
    }
  }
`;
