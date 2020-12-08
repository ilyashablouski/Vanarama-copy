/* eslint-disable no-console */
const { GraphQLClient, gql } = require('graphql-request');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const query = gql`
  {
    primaryHeader {
      id
      links {
        text
        url
      }
      linkGroups {
        name
        body
        promotionalImage {
          url
          legacyUrl
          image {
            file {
              url
              fileName
            }
          }
        }
        links {
          text
          url
        }
        linkGroups {
          name
          links {
            text
            url
          }
        }
      }
    }
  }
`;
// Arg access to nextConfig object
module.exports = async () => {
  const dir = path.resolve('deps/data');
  const client = new GraphQLClient(process.env.API_URL, query, {
    headers: { 'x-api-key': process.env.API_KEY },
  });

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  try {
    const menuData = await client.request(query);
    fs.writeFile(`${dir}/menuData.json`, JSON.stringify(menuData), err => {
      if (err) {
        throw new Error(err);
      }
      console.log('Contentful Primary Header JSON data file was generated!');
    });
  } catch (err) {
    console.error(err);
  }
};
