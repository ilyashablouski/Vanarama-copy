/* eslint-disable no-console */
const { GraphQLClient, gql } = require('graphql-request');

require('dotenv').config();

const query = gql`
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

const variables = {
  pageType: 'About us',
};

const requestHeaders = {
  headers: { 'x-api-key': process.env.API_KEY },
};

// Arg access to nextConfig object
module.exports = async () => {
  const client = new GraphQLClient(process.env.API_URL);
  try {
    await client.request(query, variables, requestHeaders);
    console.log('Vehicle list fetched succesfully');
  } catch (err) {
    console.error(JSON.stringify(err, null, 4));
    throw new Error('vehicleList query failed');
  }
};
