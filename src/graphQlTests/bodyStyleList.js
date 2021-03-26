/* eslint-disable no-console */
const { GraphQLClient, gql } = require('graphql-request');

require('dotenv').config();

const query = gql`
  query bodyStyleList(
    $vehicleTypes: VehicleTypeEnum
    $leaseType: LeaseTypeEnum
    $manufacturerSlug: String!
    $rangeSlug: String!
  ) {
    bodyStyleList(
      filter: {
        vehicleType: $vehicleTypes
        manufacturerSlug: $manufacturerSlug
        rangeSlug: $rangeSlug
        leaseType: $leaseType
      }
    ) {
      bodyStyle
      count
      minPrice
      capId
    }
  }
`;

const variables = {
  vehicleTypes: 'CAR',
  leaseType: 'PERSONAL',
  manufacturerSlug: 'mercedes-benz',
  rangeSlug: 'cla',
};

const requestHeaders = {
  headers: { 'x-api-key': process.env.API_KEY },
};

// Arg access to nextConfig object
module.exports = async () => {
  const client = new GraphQLClient(process.env.API_URL);
  try {
    await client.request(query, variables, requestHeaders);
    console.log('Body style list fetched succesfully');
  } catch (err) {
    console.error(JSON.stringify(err, null, 4));
    throw new Error('bodyStyleList query failed');
  }
};
