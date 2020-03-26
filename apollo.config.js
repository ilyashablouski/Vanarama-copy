module.exports = {
  client: {
    /**
     * FIXME: Once we have the most up-to-date schema registered in Apollo Graph Manager we can use that instead of
     * introspection on the development environment
     */
    service: {
      name: 'federation-gateway',
      url: 'https://yv8w5m1kpc.execute-api.eu-west-2.amazonaws.com/dev/graphql',
    },
  },
};
