/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

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
