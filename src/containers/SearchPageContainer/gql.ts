import { useQuery, gql, useLazyQuery } from '@apollo/client';
import {
  vehicleList,
  vehicleListVariables,
} from '../../../generated/vehicleList';
import { VehicleTypeEnum } from '../../../generated/globalTypes';

export const GET_VEHICLE_LIST = gql`
  query vehicleList($vehicleTypes: [VehicleTypeEnum!], $after: String) {
    vehicleList(
      first: 9
      after: $after
      filter: { vehicleTypes: $vehicleTypes }
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
  after?: string,
) {
  return useLazyQuery<vehicleList, vehicleListVariables>(GET_VEHICLE_LIST, {
    variables: {
      vehicleTypes,
      after,
    },
  });
}
