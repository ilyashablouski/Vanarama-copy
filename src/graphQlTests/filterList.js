/* eslint-disable no-console */
const { GraphQLClient, gql } = require('graphql-request');
const { OnOffer } = require('../../generated/globalTypes');

require('dotenv').config();

const query = gql`
  query filterList(
    $vehicleTypes: [VehicleTypeEnum!]
    $onOffer: Boolean
    $manufacturerSlug: String
    $rangeSlug: String
    $bodyStyles: [String!]
    $transmissions: [String!]
    $fuelTypes: [String!]
  ) {
    filterList(
      filter: {
        vehicleTypes: $vehicleTypes
        onOffer: $onOffer
        manufacturerSlug: $manufacturerSlug
        rangeSlug: $rangeSlug
        bodyStyles: $bodyStyles
        transmissions: $transmissions
        fuelTypes: $fuelTypes
      }
    ) {
      vehicleTypes
      groupedRangesWithSlug {
        parent {
          label
          slug
        }
        children {
          label
          slug
        }
      }
      bodyStyles
      transmissions
      fuelTypes
    }
  }
`;

const variables = {
  vehicleTypes: ['CAR'],
  onOffer: OnOffer.FILTER_DISABLED,
  manufacturerSlug: 'audi',
  rangeSlug: 'a4',
  bodyStyles: ['Estate'],
  fuleTypes: [],
  transmissions: [],
};

const requestHeaders = {
  headers: { 'x-api-key': process.env.API_KEY },
};

// Arg access to nextConfig object
module.exports = async () => {
  const client = new GraphQLClient(process.env.API_URL);
  try {
    await client.request(query, variables, requestHeaders);
    console.log('Filter list fetched succesfully');
  } catch (err) {
    console.error(JSON.stringify(err, null, 4));
    throw new Error('filterList query failed');
  }
};
