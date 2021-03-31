/* eslint-disable no-console */
const { GraphQLClient, gql } = require('graphql-request');

require('dotenv').config();

const query = gql`
  query BlogPosts($slug: String!) {
    blogPosts(slug: $slug) {
      metaData {
        title
        name
        metaRobots
        metaDescription
        legacyUrl
        pageType
        canonicalUrl
        slug
        schema
        publishedOn
        breadcrumbs
      }
    }
  }
`;

const variables = {
  slug: 'blog/community-news',
};

const requestHeaders = {
  headers: { 'x-api-key': process.env.API_KEY },
};

// Arg access to nextConfig object
module.exports = async () => {
  const client = new GraphQLClient(process.env.API_URL);
  try {
    await client.request(query, variables, requestHeaders);
    console.log('Blog posts fetched succesfully');
  } catch (err) {
    console.error(JSON.stringify(err, null, 4));
    throw new Error('blogPosts query failed');
  }
};
