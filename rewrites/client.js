const { ApolloClient, InMemoryCache } = require('@apollo/client');

const client = new ApolloClient({
  uri: process.env.CAP_GQL_API_ENDPOINT,
  cache: new InMemoryCache(),
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  },
});

module.exports = client;
