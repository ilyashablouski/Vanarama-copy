import { gql, useQuery } from '@apollo/client';
import { MockedResponse } from '@apollo/client/testing';
import {
  VehicleListUrl,
  VehicleListUrlVariables,
  VehicleListUrl_vehicleList_edges_node as Node,
} from '../../generated/VehicleListUrl';

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
          vehicleType
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

export function makeVehiclesListUrlMock(
  derivativeIds?: string[] | null,
  node?: Node,
): MockedResponse {
  return {
    request: {
      query: VEHICLE_LIST_URL,
      variables: {
        filter: {
          derivativeIds,
        },
      },
    },
    result: jest.fn().mockImplementation(() => ({
      data: {
        vehicleList: {
          totalCount: 1,
          pageInfo: {
            startCursor: 'startCursor',
            endCursor: 'endCursor',
            hasNextPage: 'hasNextPage',
            hasPreviousPage: 'hasPreviousPage',
          },
          edges: [
            {
              cursor: 'cursor',
              node: {
                derivativeId: 'derivativeId',
                url: 'url',
                legacyUrl: 'legacyUrl',
                ...(node || {}),
              },
            },
          ],
        },
      },
    })),
  };
}
