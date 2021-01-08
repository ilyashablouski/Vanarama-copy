import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { FeaturedHtml } from '../FeaturedAndTilesContainer/getFeaturedHtml';
import useSortOrder from '../../hooks/useSortOrder';
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
  SortDirection,
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
    $manufacturerSlug: String
    $rangeSlug: String
    $rate: RateInputObject
    $bodyStyles: [String!]
    $transmissions: [String!]
    $fuelTypes: [String!]
    $sortField: SortField!
    $first: Int
    $sortDirection: SortDirection!
    $leaseType: LeaseTypeEnum
  ) {
    vehicleList(
      first: $first
      after: $after
      filter: {
        vehicleTypes: $vehicleTypes
        onOffer: $onOffer
        manufacturerSlug: $manufacturerSlug
        rangeSlug: $rangeSlug
        rate: $rate
        bodyStyles: $bodyStyles
        transmissions: $transmissions
        fuelTypes: $fuelTypes
        leaseType: $leaseType
      }
      sort: { field: $sortField, direction: $sortDirection }
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

export function useVehiclesList(
  vehicleTypes: VehicleTypeEnum[],
  leaseType: LeaseTypeEnum,
  onOffer = false,
  onCompleted?: (data: vehicleList) => void,
  first = 9,
  after?: string,
  bodyStyles?: string[],
  manufacturerSlug?: string,
  rangeSlug?: string,
  rate?: RateInputObject,
  transmissions?: string[],
  fuelTypes?: string[],
) {
  const { savedSortOrder } = useSortOrder();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useLazyQuery<vehicleList, vehicleListVariables>(GET_VEHICLE_LIST, {
    onCompleted,
    variables: {
      vehicleTypes,
      leaseType,
      onOffer,
      after,
      manufacturerSlug,
      rangeSlug,
      rate,
      bodyStyles,
      transmissions,
      fuelTypes,
      sortField: onOffer ? SortField.offerRanking : savedSortOrder.type,
      sortDirection: onOffer ? SortDirection.ASC : savedSortOrder.direction,
      first,
    },
  });
}

export const GET_RANGES = gql`
  query rangeList(
    $vehicleTypes: VehicleTypeEnum
    $leaseType: LeaseTypeEnum
    $manufacturerSlug: String!
    $bodyStyles: [String!]
    $transmissions: [String!]
    $fuelTypes: [String!]
    $rate: RateInputObject
  ) {
    rangeList(
      filter: {
        vehicleType: $vehicleTypes
        manufacturerSlug: $manufacturerSlug
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
  manufacturerSlug: string,
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
      manufacturerSlug,
      leaseType,
      rate,
      bodyStyles,
      transmissions,
      fuelTypes,
    },
  });
}

export const GET_RANGES_IMAGES = gql`
  query RangesImages(
    $rangeId: ID
    $vehicleType: VehicleTypeEnum
    $capIds: [ID]
  ) {
    vehicleImages(
      rangeId: $rangeId
      vehicleType: $vehicleType
      capIds: $capIds
    ) {
      mainImageUrl
    }
  }
`;

export function getRangeImages(
  rangeId?: string,
  vehicleType?: VehicleTypeEnum,
  skip = false,
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery<RangesImages, RangesImagesVariables>(GET_RANGES_IMAGES, {
    variables: {
      rangeId,
      vehicleType,
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

export function useModelImages(capIds: (string | null)[]) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useLazyQuery<ModelImages, ModelImagesVariables>(GET_MODEL_IMAGES, {
    variables: {
      capIds,
    }
  });
}

export const GET_BODY_STYLES = gql`
  query bodyStyleList(
    $vehicleTypes: VehicleTypeEnum
    $leaseType: LeaseTypeEnum
    $manufacturerSlug: String!
    $rangeSlug: String!
  ) {
    bodyStyleList(
      filter: {
        vehicleType: $vehicleTypes
        manufacturerSlug: $manufacturerSlug
        rangeSlug: $rangeSlug
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
  manufacturerSlug: string,
  rangeSlug: string,
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useLazyQuery<bodyStyleList, bodyStyleListVariables>(GET_BODY_STYLES, {
    variables: {
      vehicleTypes,
      manufacturerSlug,
      leaseType,
      rangeSlug,
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
        legacyUrl
        pageType
        canonicalUrl
        slug
        schema
        publishedOn
        breadcrumbs
      }
      sections {
        featured {
          ...GenericPageQueryFeatured
        }
      }
    }
  }
  ${FeaturedHtml.fragments.featured}
`;

export function useAllMakePage(skip = false) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery<manufacturerPage>(GET_ALL_MAKES_PAGE, {
    skip,
  });
}

export const GET_LEGACY_URLS = gql`
  query genericPagesQuery($slugs: [String!]!) {
    genericPages(slugs: $slugs) {
      items {
        slug
        legacyUrl
      }
    }
  }
`;
