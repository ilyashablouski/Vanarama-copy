/* eslint-disable no-console */
const { GraphQLClient, gql } = require('graphql-request');

require('dotenv').config();

const query = gql`
  query GetTrimAndColor(
    $capId: ID!
    $colourId: Int
    $trimId: Int
    $vehicleType: VehicleTypeEnum!
  ) {
    colourList(capId: $capId, vehicleType: $vehicleType, trimId: $trimId) {
      optionId
      label
    }
    trimList(capId: $capId, vehicleType: $vehicleType, colourId: $colourId) {
      optionId
      label
    }
  }
`;

const variables = {
  capId: '92809',
  colourId: 72903,
  trimId: 137211,
  vehicleType: 'CAR',
};

const requestHeaders = {
  headers: { 'x-api-key': process.env.API_KEY },
};

// Arg access to nextConfig object
module.exports = async () => {
  const client = new GraphQLClient(process.env.API_URL);
  try {
    await client.request(query, variables, requestHeaders);
    console.log('Trim and color list fetched succesfully');
  } catch (err) {
    console.error(JSON.stringify(err, null, 4));
    throw new Error('trimAndColorList query failed');
  }
};
