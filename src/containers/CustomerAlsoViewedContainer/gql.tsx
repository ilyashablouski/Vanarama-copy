import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import {
  GetProductCard,
  GetProductCardVariables,
} from '../../../generated/GetProductCard';

export const GET_PRODUCT_CARDS_DATA = gql`
  query GetProductCard($capIds: [ID!]!, $vehicleType: VehicleTypeEnum) {
    productCard(capIds: $capIds, vehicleType: $vehicleType) {
      vehicleType
      capId
      manufacturerName
      rangeName
      derivativeName
      averageRating
      isOnOffer
      offerPosition
      leadTime
      imageUrl
      keyInformation {
        name
        value
      }
      businessRate
      personalRate
    }
    derivatives(ids: $capIds, vehicleType: $vehicleType) {
      id
      capCode
      name
      slug
      manufacturer {
        name
        slug
      }
      model {
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
      range {
        name
        slug
      }
    }
    vehicleList(filter: { derivativeIds: $capIds }) {
      edges {
        cursor
        node {
          derivativeId
          url
          legacyUrl
          vehicleType
        }
      }
    }
  }
`;

/**
 *  @props capIds - string array with capId from relatedVehicles in vehicleDetails
 *  @props vehicleType - VehicleTypeEnum
 */
export function useProductCardDataLazyQuery(
  capIds: string[],
  vehicleType?: VehicleTypeEnum,
  onCompleted?: (data: GetProductCard) => void,
) {
  return useLazyQuery<GetProductCard, GetProductCardVariables>(
    GET_PRODUCT_CARDS_DATA,
    {
      variables: {
        capIds,
        vehicleType,
      },
      onCompleted,
    },
  );
}
/**
 *  @props capIds - string array with capId from relatedVehicles in vehicleDetails
 *  @props vehicleType - VehicleTypeEnum
 */
export function useProductCardDataQuery(
  capIds: string[],
  vehicleType?: VehicleTypeEnum,
  skip = false,
) {
  return useQuery<GetProductCard, GetProductCardVariables>(
    GET_PRODUCT_CARDS_DATA,
    {
      variables: {
        capIds,
        vehicleType,
      },
      skip,
    },
  );
}
