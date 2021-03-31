/* eslint-disable no-console */
const { GraphQLClient, gql } = require('graphql-request');

require('dotenv').config();

const query = gql`
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
    console.log('Page collection fetched succesfully');
  } catch (err) {
    console.error(JSON.stringify(err, null, 4));
    throw new Error('pageCollection query failed');
  }
};
