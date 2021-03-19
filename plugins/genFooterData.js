/* eslint-disable no-console */
const { GraphQLClient, gql } = require('graphql-request');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const query = gql`
  {
    primaryFooter {
      id
      linkGroups {
        name
        body
        links {
          url
          text
        }
        linkGroups {
          name
          links {
            text
            url
          }
        }
      }
      legalStatement {
        name
        title
        body
      }
    }
  }
`;
// Arg access to nextConfig object
module.exports = async () => {
  const dir = path.resolve('src/deps/data');
  const client = new GraphQLClient(process.env.API_URL, query, {
    headers: { 'x-api-key': process.env.API_KEY },
  });

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  try {
    const footerData = await client.request(query);
    fs.writeFile(`${dir}/footerData.json`, JSON.stringify(footerData), err => {
      if (err) {
        throw new Error(err);
      }
      console.log('Contentful Primary Footer JSON data file was generated!');
    });
  } catch (err) {
    console.error(err);
  }
};
