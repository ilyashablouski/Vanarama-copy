import { gql, useQuery } from '@apollo/client';
import { VehicleListUrl, VehicleListUrlVariables } from '../../generated/VehicleListUrl';

export const VEHICLE_LIST_URL = gql`
  query VehicleListUrl($derivativeIds: [ID!]) {
    vehicleList(filter: { derivativeIds: $derivativeIds }) {
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
          derivativeId
          url
          legacyUrl
        }
      }
    }
  }
`;

export function useVehicleListUrl(derivativeIds?: string[] | null) {
  return useQuery<VehicleListUrl, VehicleListUrlVariables>(VEHICLE_LIST_URL, {
    variables: { derivativeIds },
    skip: !derivativeIds,
  });
}
