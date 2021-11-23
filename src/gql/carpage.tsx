import { gql, useLazyQuery } from '@apollo/client';
import {
  GetVehicleDetails,
  GetVehicleDetailsVariables,
} from '../../generated/GetVehicleDetails';
import { VehicleTypeEnum } from '../../generated/globalTypes';
import {
  GetTrimAndColor,
  GetTrimAndColorVariables,
} from '../../generated/GetTrimAndColor';
import {
  GetTrimGroupList,
  GetTrimGroupListVariables,
} from '../../generated/GetTrimGroupList';

export const GET_CAR_DATA = gql`
  query GetVehicleDetails(
    $capId: Int!
    $capIdDetails: ID!
    $vehicleType: VehicleTypeEnum
    $leaseType: LeaseTypeEnum
  ) {
    vehicleConfigurationByCapId(
      capId: $capId
      vehicleType: $vehicleType
      leaseType: $leaseType
    ) {
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
      legacyUrl
      financeProfile {
        leaseType
        term
        mileage
        upfront
      }
    }
    standardEquipment(capId: $capIdDetails, vehicleType: $vehicleType) {
      name
      standardEquipment {
        name
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
      warrantyDetails {
        years
        mileage
      }
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
      vehicleValue
      roadsideAssistance {
        years
      }
      warrantyDetails {
        years
        mileage
      }
      freeInsurance
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
      model {
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
        unit
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

export const GET_TRIM_AND_COLOR_DATA = gql`
  query GetTrimAndColor(
    $capId: ID!
    $colourId: Int
    $trimId: Int
    $vehicleType: VehicleTypeEnum!
  ) {
    colourList(capId: $capId, vehicleType: $vehicleType, trimId: $trimId) {
      optionId
      label
    }
    trimList(capId: $capId, vehicleType: $vehicleType, colourId: $colourId) {
      optionId
      label
    }
  }
`;

export const GET_COLOUR_AND_TRIM_GROUP_LIST = gql`
  query GetColourAndTrimGroupList(
    $capId: ID!
    $vehicleType: VehicleTypeEnum!
    $colourId: Int!
  ) {
    colourGroupList(capId: $capId, vehicleType: $vehicleType) {
      leadTime
      options {
        label
        optionId
        hotOffer
      }
    }
    trimGroupList(
      capId: $capId
      vehicleType: $vehicleType
      colourId: $colourId
    ) {
      leadTime
      options {
        label
        optionId
        hotOffer
      }
    }
  }
`;

export const GET_TRIM_GROUP_LIST = gql`
  query GetTrimGroupList(
    $capId: ID!
    $vehicleType: VehicleTypeEnum!
    $colourId: Int!
  ) {
    trimGroupList(
      capId: $capId
      vehicleType: $vehicleType
      colourId: $colourId
    ) {
      leadTime
      options {
        label
        optionId
        hotOffer
      }
    }
  }
`;

export function useTrimAndColour(
  capId: string,
  vehicleType: VehicleTypeEnum,
  colourId?: number,
  trimId?: number,
  onCompleted?: (data: GetTrimAndColor) => void,
) {
  return useLazyQuery<GetTrimAndColor, GetTrimAndColorVariables>(
    GET_TRIM_AND_COLOR_DATA,
    {
      variables: {
        capId,
        colourId,
        trimId,
        vehicleType,
      },
      onCompleted,
    },
  );
}

export function useTrim(onCompleted?: (data: GetTrimGroupList) => void) {
  return useLazyQuery<GetTrimGroupList, GetTrimGroupListVariables>(
    GET_TRIM_GROUP_LIST,
    {
      onCompleted,
    },
  );
}

export const GET_IMACA_ASSETS = gql`
  query GetImacaAssets($capId: Int!, $vehicleType: VehicleTypeEnum!) {
    getImacaAssets(capId: $capId, vehicleType: $vehicleType) {
      vehicleUrl
      tyresUrl
      rimsUrl
      colours {
        capId
        hex
        imacaName
        lqName
        onOffer
        matchAccuracy
      }
    }
  }
`;

export const GET_PDP_CONTENT = gql`
  query GetPdpContent(
    $vehicleType: PdpVehicleType!
    $isPreview: Boolean
    $derivativeId: Int
  ) {
    pdpContent(
      vehicleType: $vehicleType
      isPreview: $isPreview
      derivativeId: $derivativeId
    ) {
      title
      vehicleType
      content {
        title
        questionAnswers {
          question
          answer
        }
      }
      banners {
        slug
        title
        description
        image {
          title
          file {
            url
          }
        }
        link {
          text
          url
        }
      }
    }
  }
`;
