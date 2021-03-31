/* eslint-disable no-console */
const { GraphQLClient, gql } = require('graphql-request');

require('dotenv').config();

const query = gql`
  query GetDerivative($capId: Int!, $vehicleType: VehicleTypeEnum) {
    vehicleConfigurationByCapId(capId: $capId, vehicleType: $vehicleType) {
      url
    }
  }
`;

const variables = {
  capId: 83379,
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
    console.log('vehicleConfigurationByCapId fetched succesfully');
  } catch (err) {
    console.error(JSON.stringify(err, null, 4));
    throw new Error('vehicleConfigurationByCapId query failed');
  }
};
