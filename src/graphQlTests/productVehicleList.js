/* eslint-disable no-console */
const { GraphQLClient, gql } = require('graphql-request');

require('dotenv').config();

const query = gql`
  query {
    productVehicleList {
      totalVehicles
      edges {
        node {
          derivativeId
        }
      }
    }
  }
`;

// Arg access to nextConfig object
module.exports = async () => {
  const client = new GraphQLClient(process.env.API_URL, query, {
    headers: { 'x-api-key': process.env.API_KEY },
  });
  try {
    await client.request(query);
    console.log('productVehicleList fetched succesfully');
  } catch (err) {
    console.error(JSON.stringify(err, null, 4));
    throw new Error('productVehicleList query failed');
  }
};
