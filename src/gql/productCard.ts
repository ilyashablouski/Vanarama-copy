import { gql, useQuery } from '@apollo/client';
import { ProductCardData } from '../../generated/ProductCardData';

const PRODUCT_CARD_CONTENT = gql`
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

// eslint-disable-next-line import/prefer-default-export
export { PRODUCT_CARD_CONTENT };

export function useProductCard(type: string, size: number, offer: boolean) {
  return useQuery<ProductCardData>(PRODUCT_CARD_CONTENT, {
    variables: {
      type,
      size,
      offer,
    },
  });
}
