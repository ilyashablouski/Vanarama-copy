/* eslint-disable no-console */
const { GraphQLClient, gql } = require('graphql-request');

require('dotenv').config();

const query = gql`
  query HomePageData {
    homePage {
      id
      featuredImage {
        file {
          url
          details {
            image {
              width
              height
            }
          }
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
    console.log('Home page fetched succesfully');
  } catch (err) {
    console.error(JSON.stringify(err, null, 4));
    throw new Error('homePage query failed');
  }
};
