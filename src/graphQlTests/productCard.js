/* eslint-disable no-console */
const { GraphQLClient, gql } = require('graphql-request');

require('dotenv').config();

const query = gql`
  query ProductCardData(
    $type: VehicleTypeEnum!
    $bodyType: String
    $excludeBodyType: String
    $size: Int
    $offer: Boolean
  ) {
    productCarousel(
      vehicleType: $type
      bodyType: $bodyType
      excludeBodyType: $excludeBodyType
      pageSize: $size
      onOffer: $offer
    ) {
      capId
      isOnOffer
      manufacturerName
      derivativeName
      rangeName
      modelName
      imageUrl
      leadTime
      averageRating
      businessRate
      personalRate
      offerPosition
      keyInformation {
        name
        value
      }
      vehicleType
    }
  }
`;

const variables = {
  type: 'LCV',
  excludeBodyType: 'Pickup',
  size: 9,
  offer: true,
};

const requestHeaders = {
  headers: { 'x-api-key': process.env.API_KEY },
};

// Arg access to nextConfig object
module.exports = async () => {
  const client = new GraphQLClient(process.env.API_URL);
  try {
    await client.request(query, variables, requestHeaders);
    console.log('Product card fetched succesfully');
  } catch (err) {
    console.error(JSON.stringify(err, null, 4));
    throw new Error('productCard query failed');
  }
};
