import { GraphQLClient, gql } from 'graphql-request';

const query = gql`
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
`;

module.exports = async () => {
  const client = new GraphQLClient(process.env.API_URL, query, {
    headers: { 'x-api-key': process.env.API_KEY },
  });
  const menuData = await client.request(query);
  return {
    // cacheable: true,
    code: `module.exports = ${JSON.stringify(menuData)}`,
  };
};
