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

module.exports = async () => {
  const client = new GraphQLClient(process.env.API_URL, query, {
    headers: { 'x-api-key': process.env.API_KEY },
  });
  const menuData = await client.request(query);

  fs.writeFile(
    path.resolve('deps/data/menuData.json'),
    JSON.stringify(menuData),
    err => {
      if (err) {
        console.log(err);
      }
      console.log('The file was saved!');
    },
  );
};
