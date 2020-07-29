import { gql, useLazyQuery, useQuery } from '@apollo/client';
import {
  vehicleList,
  vehicleListVariables,
} from '../../../generated/vehicleList';
import { rangeList, rangeListVariables } from '../../../generated/rangeList';
import {
  VehicleTypeEnum,
  RateInputObject,
  SortField,
  LeaseTypeEnum,
} from '../../../generated/globalTypes';
import {
  RangesImages,
  RangesImagesVariables,
} from '../../../generated/RangesImages';

export const GET_VEHICLE_LIST = gql`
  query vehicleList(
    $vehicleTypes: [VehicleTypeEnum!]
    $onOffer: Boolean
    $after: String
    $manufacturerName: String
    $rangeName: String
    $rate: RateInputObject
    $bodyStyles: [String!]
    $transmissions: [String!]
    $fuelTypes: [String!]
    $sortField: SortField!
    $first: Int
  ) {
    vehicleList(
      first: $first
      after: $after
      filter: {
        vehicleTypes: $vehicleTypes
        onOffer: $onOffer
        manufacturerName: $manufacturerName
        rangeName: $rangeName
        rate: $rate
        bodyStyles: $bodyStyles
        transmissions: $transmissions
        fuelTypes: $fuelTypes
      }
      sort: { field: $sortField, direction: ASC }
    ) {
      totalCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          vehicleType
          offerRanking
          onOffer
          derivativeId
          capCode
          manufacturerName
          modelName
          derivativeName
          bodyStyle
          transmission
          fuelType
          financeProfiles {
            leaseType
            rate
            term
            upfront
            upfrontPayment
            mileage
            maintained
          }
        }
      }
    }
  }
`;

export function getVehiclesList(
  vehicleTypes: VehicleTypeEnum[],
  onOffer = false,
  onCompleted?: (data: vehicleList) => void,
  first = 9,
  after?: string,
  manufacturerName?: string,
  rangeName?: string,
  rate?: RateInputObject,
  bodyStyles?: string[],
  transmissions?: string[],
  fuelTypes?: string[],
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useLazyQuery<vehicleList, vehicleListVariables>(GET_VEHICLE_LIST, {
    onCompleted,
    variables: {
      vehicleTypes,
      onOffer,
      after,
      manufacturerName,
      rangeName,
      rate,
      bodyStyles,
      transmissions,
      fuelTypes,
      sortField: onOffer ? SortField.offerRanking : SortField.rate,
      first,
    },
  });
}

export const GET_RANGES = gql`
  query rangeList(
    $vehicleTypes: VehicleTypeEnum
    $leaseType: LeaseTypeEnum
    $manufacturerName: String!
    $bodyStyles: [String!]
    $transmissions: [String!]
    $fuelTypes: [String!]
    $rate: RateInputObject
  ) {
    rangeList(
      filter: {
        vehicleType: $vehicleTypes
        manufacturerName: $manufacturerName
        rate: $rate
        bodyStyles: $bodyStyles
        transmissions: $transmissions
        fuelTypes: $fuelTypes
        leaseType: $leaseType
      }
    ) {
      rangeName
      rangeId
      count
      minPrice
    }
  }
`;

export function getRangesList(
  vehicleTypes: VehicleTypeEnum,
  manufacturerName: string,
  leaseType: LeaseTypeEnum,
  rate?: RateInputObject,
  bodyStyles?: string[],
  transmissions?: string[],
  fuelTypes?: string[],
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useLazyQuery<rangeList, rangeListVariables>(GET_RANGES, {
    variables: {
      vehicleTypes,
      manufacturerName,
      leaseType,
      rate,
      bodyStyles,
      transmissions,
      fuelTypes,
    },
  });
}

export const GET_RANGES_IMAGES = gql`
  query RangesImages($rangeId: ID) {
    vehicleImages(rangeId: $rangeId) {
      mainImageUrl
    }
  }
`;

export function getRangeImages(rangeId: string, skip = false) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery<RangesImages, RangesImagesVariables>(GET_RANGES_IMAGES, {
    variables: {
      rangeId,
    },
    skip,
  });
}
