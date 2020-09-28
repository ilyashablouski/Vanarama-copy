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
import {
  bodyStyleList,
  bodyStyleListVariables,
} from '../../../generated/bodyStyleList';
import {
  ModelImages,
  ModelImagesVariables,
} from '../../../generated/ModelImages';
import {
  manufacturerList,
  manufacturerListVariables,
} from '../../../generated/manufacturerList';

import { manufacturerPage } from '../../../generated/manufacturerPage';

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
          url
          legacyUrl
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
  bodyStyles?: string[],
  manufacturerName?: string,
  rangeName?: string,
  rate?: RateInputObject,
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
  query RangesImages($rangeId: ID, $capIds: [ID]) {
    vehicleImages(rangeId: $rangeId, capIds: $capIds) {
      mainImageUrl
    }
  }
`;

export function getRangeImages(rangeId?: string, skip = false) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery<RangesImages, RangesImagesVariables>(GET_RANGES_IMAGES, {
    variables: {
      rangeId,
    },
    skip,
  });
}

export const GET_MODEL_IMAGES = gql`
  query ModelImages($capIds: [ID]) {
    vehicleImages(capIds: $capIds, all: false) {
      mainImageUrl
    }
  }
`;

export function useModelImages(capIds: (string | null)[], skip = false) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery<ModelImages, ModelImagesVariables>(GET_MODEL_IMAGES, {
    variables: {
      capIds,
    },
    skip,
  });
}

export const GET_BODY_STYLES = gql`
  query bodyStyleList(
    $vehicleTypes: VehicleTypeEnum
    $leaseType: LeaseTypeEnum
    $manufacturerName: String!
    $rangeName: String!
  ) {
    bodyStyleList(
      filter: {
        vehicleType: $vehicleTypes
        manufacturerName: $manufacturerName
        rangeName: $rangeName
        leaseType: $leaseType
      }
    ) {
      bodyStyle
      count
      minPrice
      capId
    }
  }
`;

export function useBodyStyleList(
  vehicleTypes: VehicleTypeEnum,
  leaseType: LeaseTypeEnum,
  manufacturerName: string,
  rangeName: string,
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useLazyQuery<bodyStyleList, bodyStyleListVariables>(GET_BODY_STYLES, {
    variables: {
      vehicleTypes,
      manufacturerName,
      leaseType,
      rangeName,
    },
  });
}

export const GET_MANUFACTURER_LIST = gql`
  query manufacturerList(
    $vehicleType: VehicleTypeEnum
    $leaseType: LeaseTypeEnum
    $rate: RateInputObject
    $bodyStyles: [String!]
    $transmissions: [String!]
    $fuelTypes: [String!]
  ) {
    manufacturerList(
      filter: {
        vehicleType: $vehicleType
        leaseType: $leaseType
        rate: $rate
        bodyStyles: $bodyStyles
        transmissions: $transmissions
        fuelTypes: $fuelTypes
      }
    ) {
      count
      manufacturerId
      manufacturerName
      minPrice
      capId
    }
  }
`;

export function useManufacturerList(
  vehicleType: VehicleTypeEnum,
  leaseType: LeaseTypeEnum,
  rate?: RateInputObject,
  bodyStyles?: string[],
  transmissions?: string[],
  fuelTypes?: string[],
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useLazyQuery<manufacturerList, manufacturerListVariables>(
    GET_MANUFACTURER_LIST,
    {
      variables: {
        vehicleType,
        leaseType,
        rate,
        bodyStyles,
        transmissions,
        fuelTypes,
      },
    },
  );
}

export const GET_ALL_MAKES_PAGE = gql`
  query manufacturerPage {
    manufacturerPage(slug: "car-leasing/all-manufacturers") {
      metaData {
        title
        name
        metaRobots
        metaDescription
        publishedOn
        legacyUrl
        pageType
        canonicalUrl
        slug
        publishedOn
        schema
      }
      sections {
        featured {
          layout
          body
          title
          titleTag
          image {
            title
            description
            file {
              url
              fileName
            }
          }
        }
      }
      featuredImage {
        title
        description
        file {
          url
          fileName
          contentType
        }
      }
    }
  }
`;

export function useAllMakePage(skip = false) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery<manufacturerPage>(GET_ALL_MAKES_PAGE, {
    skip,
  });
}
