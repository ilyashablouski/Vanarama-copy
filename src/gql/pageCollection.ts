/* eslint-disable import/prefer-default-export */
import { gql, useQuery } from '@apollo/client';
import {
  PageCollection,
  PageCollectionVariables,
} from '../../generated/PageCollection';

export const PAGE_COLLECTION = gql`
  query PageCollection($pageType: String!, $limit: Int, $skip: Int) {
    pageCollection(pageType: $pageType, limit: $limit, skip: $skip) {
      total
      limit
      skip
      items {
        legacyUrl
        slug
      }
    }
  }
`;

export function usePageCollection(
  pageType: string,
  limit?: number,
  skip?: number,
) {
  return useQuery<PageCollection, PageCollectionVariables>(PAGE_COLLECTION, {
    variables: {
      pageType,
      limit,
      skip,
    },
  });
}
