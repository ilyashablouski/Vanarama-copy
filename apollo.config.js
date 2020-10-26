require('dotenv').config({ path: '.env.secret' });
require('dotenv').config();

module.exports = {
  client: {
    /**
     * FIXME: Once we have the most up-to-date schema registered in Apollo Graph Manager we can use that instead of
     * introspection on the development environment
     */
    service: {
      name: 'federation-gateway',
      url: process.env.API_URL,
      headers: {
        'x-api-key': process.env.API_KEY,
      },
    },
  },
};
