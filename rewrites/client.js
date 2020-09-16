/* eslint-disable no-console */
const fetch = require('node-fetch');

const {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} = require('@apollo/client');

// const inspect = require('../inspect');

const httpLink = createHttpLink({
  uri: process.env.API_URL,
  fetch,
  headers: {
    'x-api-key': process.env.API_KEY,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  },
});

module.exports = client;
