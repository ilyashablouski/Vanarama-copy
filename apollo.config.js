module.exports = {
  client: {
    /**
     * FIXME: Once we have the most up-to-date schema registered in Apollo Graph Manager we can use that instead of
     * introspection on the development environment
     */
    service: {
      name: 'federation-gateway',
      url: 'https://7wz7q9eq15.execute-api.eu-west-2.amazonaws.com/dev/graphql',
    },
  },
};
