import { gql } from '@apollo/client';

const PRODUCT_CARD_CONTENT = gql`
  query ProductCardData($type: String!, $size: Number!, $offer: Boolean!) {
    productCarousel(vehicleType: $type, pageSize: $size, onOffer: $offer) {
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
    }
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { PRODUCT_CARD_CONTENT };
