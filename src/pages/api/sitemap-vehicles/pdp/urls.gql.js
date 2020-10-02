const { gql } = require('@apollo/client');

const URLS = gql`
  query vehicleConfigurationUrls($first: Int, $after: String) {
    vehicleConfigurationUrls(first: $first, after: $after) {
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
      totalCount
      nodesCount
      edges {
        cursor
        node {
          url
          vehicleType
          legacy
          bodyStyle
        }
      }
    }
  }
`;

module.exports = URLS;
