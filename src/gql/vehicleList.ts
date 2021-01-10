import { useEffect } from 'react';
import { gql, useQuery, QueryResult } from '@apollo/client';
import { MockedResponse } from '@apollo/client/testing';
import createApolloClient from '../apolloClient';
import {
  VehicleListUrl,
  VehicleListUrlVariables,
  VehicleListUrl_vehicleList_edges_node as Node,
} from '../../generated/VehicleListUrl';

export const VEHICLE_LIST_URL = gql`
  query VehicleListUrl($derivativeIds: [ID!], $after: String) {
    vehicleList(filter: { derivativeIds: $derivativeIds }, after: $after) {
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

export function useVehicleListUrl(derivativeIds?: string[], after?: string) {
  return useQuery<VehicleListUrl, VehicleListUrlVariables>(VEHICLE_LIST_URL, {
    variables: { derivativeIds, after },
    skip: !derivativeIds?.length || derivativeIds?.includes(''),
  });
}

export function getVehicleListUrl(derivativeIds?: string[], after?: string) {
  const client = createApolloClient({});
  return client.query<VehicleListUrl, VehicleListUrlVariables>({
    query: VEHICLE_LIST_URL,
    variables: { derivativeIds, after },
  });
}

export function useVehicleListUrlFetchMore(
  query: QueryResult<VehicleListUrl, VehicleListUrlVariables>,
  derivativeIds: string[],
) {
  const hasNextPage = query.data?.vehicleList.pageInfo.hasNextPage;
  useEffect(() => {
    if (query.fetchMore && hasNextPage) {
      const edges = query.data?.vehicleList.edges || [];
      const lastCursor = edges[edges.length - 1]?.cursor;

      query.fetchMore({
        variables: {
          derivativeIds,
          after: lastCursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            vehicleList: {
              pageInfo: fetchMoreResult.vehicleList.pageInfo,
              totalCount: fetchMoreResult.vehicleList.totalCount,
              edges: [
                ...prev.vehicleList.edges,
                ...fetchMoreResult?.vehicleList?.edges,
              ],
            },
          };
        },
      });
    }
  }, [derivativeIds, query, hasNextPage]);
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
