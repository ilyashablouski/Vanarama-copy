import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const GET_CONVERSIONS_CAR_LIST = gql`
  query GetConversionsCarList(
    $conversionsCapIds: [ID]
    $conversionsVehicleType: VehicleTypeEnum
    $conversionsOnOffer: Boolean
    $conversionsConversionTypes: [ConversionTypeEnum]
  ) {
    conversions(
      capIds: $conversionsCapIds
      vehicleType: $conversionsVehicleType
      onOffer: $conversionsOnOffer
      conversionTypes: $conversionsConversionTypes
    ) {
      type
      conversionId
      vehicleType
      capId
      manufacturerName
      rangeName
      modelName
      derivativeName
      averageRating
      isOnOffer
      offerPosition
      imageUrl
      availability
      leadTime
      keyInformation {
        name
        value
      }
      lowestPrices {
        leaseType
        value
      }
    }
  }
`;
