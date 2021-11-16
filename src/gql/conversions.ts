import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const GET_CONVERSIONS_VEHICLE_LIST = gql`
  query GetConversionsVehicleList(
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
      conversionImages
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
