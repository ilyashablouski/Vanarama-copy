import { gql, useLazyQuery } from '@apollo/client';
import {
  vehicleList,
  vehicleListVariables,
} from '../../../generated/vehicleList';
import {
  VehicleTypeEnum,
  RateInputObject,
} from '../../../generated/globalTypes';

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
  ) {
    vehicleList(
      first: 9
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
      sort: { field: offerRanking, direction: ASC }
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
    },
  });
}

export const GET_VEHICLE_COUNT = gql`
  query vehicleList(
    $vehicleTypes: [VehicleTypeEnum!]
    $onOffer: Boolean
    $manufacturerName: String
    $rangeName: String
    $rate: RateInputObject
    $bodyStyles: [String!]
    $transmissions: [String!]
    $fuelTypes: [String!]
  ) {
    vehicleList(
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
    ) {
      totalCount
    }
  }
`;

export function getVehiclesCount(
  vehicleTypes: VehicleTypeEnum[],
  onOffer = false,
  manufacturerName?: string,
  rangeName?: string,
  rate?: RateInputObject,
  bodyStyles?: string[],
  transmissions?: string[],
  fuelTypes?: string[],
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useLazyQuery<vehicleList, vehicleListVariables>(GET_VEHICLE_COUNT, {
    variables: {
      vehicleTypes,
      onOffer,
      manufacturerName,
      rangeName,
      rate,
      bodyStyles,
      transmissions,
      fuelTypes,
    },
  });
}
