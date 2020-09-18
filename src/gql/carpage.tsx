import { gql, useLazyQuery } from '@apollo/client';
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
      capRangeDescription
      capModelDescription
      capDerivativeDescription
      capPaintDescription
      capTrimDescription
      onOffer
      offerRanking
      url
      financeProfile {
        leaseType
        term
        mileage
        upfront
      }
    }
    vehicleDetails(capId: $capIdDetails, vehicleType: $vehicleType) {
      averageRating
      brochureUrl
      keyInformation {
        name
        value
      }
      independentReview
      warranty
      relatedVehicles {
        capId
        displayOrder
      }
      customerReviews {
        rating
        review
        name
      }
      rangeFaqs {
        question
        answer
      }
    }
    derivativeInfo(id: $capIdDetails, vehicleType: $vehicleType) {
      name
      manufacturer {
        name
        slug
      }
      range {
        name
        slug
      }
      fuelType {
        name
      }
      transmission {
        name
      }
      bodyStyle {
        name
      }
      bodyType {
        name
        slug
      }
      technicals {
        id
        derivativeId
        technicalDescription
        technicalLongDescription
        categoryDescription
        effectiveFrom
        effectiveTo
        value
      }
      standardEquipments {
        id
        derivativeId
        optionDescription
        optionLongDescription
        categoryDescription
        genericDescription
        effectiveFrom
        effectiveTo
      }
      colours {
        id
        optionDescription
      }
      trims {
        id
        optionDescription
      }
    }
    leaseAdjustParams {
      mileages
      terms
      upfronts
    }
    vehicleImages(
      capIds: [$capIdDetails]
      all: true
      vehicleType: $vehicleType
    ) {
      vehicleType
      capId
      mainImageUrl
      imageUrls
      colourImages {
        colourName
        imageUrls
      }
      videoUrl
      threeSixtyVideoUrl
    }
  }
`;

export function useCarData(capId: number, vehicleType: VehicleTypeEnum) {
  return useLazyQuery<GetVehicleDetails, GetVehicleDetailsVariables>(
    GET_CAR_DATA,
    {
      variables: {
        capId,
        capIdDetails: `${capId}`,
        vehicleType,
      },
    },
  );
}
