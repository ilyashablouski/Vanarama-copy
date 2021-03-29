/* eslint-disable no-console */
const { GraphQLClient, gql } = require('graphql-request');

require('dotenv').config();

const query = gql`
  query GetDerivatives($ids: [ID!]!, $vehicleType: VehicleTypeEnum) {
    derivatives(ids: $ids, vehicleType: $vehicleType) {
      id
      capCode
      name
      slug
      manufacturer {
        name
        slug
      }
      model {
        name
        slug
      }
      fuelType {
        name
      }
      transmission {
        name
      }
      bodyStyle {
        name
      }
      range {
        name
        slug
      }
    }
    vehicleImages(capIds: $ids, vehicleType: $vehicleType) {
      vehicleType
      capId
      mainImageUrl
    }
  }
`;

const variables = {
  vehicleType: 'CAR',
  ids: [1],
};

const requestHeaders = {
  headers: { 'x-api-key': process.env.API_KEY },
};

// Arg access to nextConfig object
module.exports = async () => {
  const client = new GraphQLClient(process.env.API_URL);
  try {
    await client.request(query, variables, requestHeaders);
    console.log('Car derivatives fetched succesfully');
  } catch (err) {
    console.error(JSON.stringify(err, null, 4));
    throw new Error('carDerivatives query failed');
  }
};
