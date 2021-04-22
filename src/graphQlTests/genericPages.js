/* eslint-disable no-console */
const { GraphQLClient, gql } = require('graphql-request');

require('dotenv').config();

const query = gql`
  query genericPagesQuery($slugs: [String!]!) {
    genericPages(slugs: $slugs) {
      items {
        slug
        legacyUrl
      }
    }
  }
`;

const variables = {
  slugs: ['van-leasing'],
};

const requestHeaders = {
  headers: { 'x-api-key': process.env.API_KEY },
};

// Arg access to nextConfig object
module.exports = async () => {
  const client = new GraphQLClient(process.env.API_URL);
  try {
    await client.request(query, variables, requestHeaders);
    console.log('genericPages query fetched succesfully');
  } catch (err) {
    console.error(JSON.stringify(err, null, 4));
    throw new Error('genericPages query failed');
  }
};
