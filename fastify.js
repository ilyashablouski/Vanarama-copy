/* eslint-disable no-console */
require('dotenv').config({ path: '.env.secret' });
require('dotenv').config();
require('colors');

const app = require('fastify')({
  pluginTimeout: 99999999,
});
const fastify = require('fastify-nextjs');
// const prerender = require('prerender-node');
const hpp = require('hpp');

const routes = require('./routes');
const logo = require('./logo');

const PORT = process.env.PORT || 3000;

try {
  app.register(fastify).after(() => {
    // Routes.
    app.register(routes);

    app.register(hpp());

    app.next('*');
  });

  app.listen(PORT, err => {
    if (err) throw err;
    console.log(logo);
    console.log(`Ready on http://localhost:${PORT}`.cyan);
    console.log(`Environment: ${process.env.NODE_ENV.toUpperCase()}`.grey);
    // console.log(`Environment: ${process.env.ENV.toUpperCase()}`.grey);
  });
} catch (err) {
  console.log(err);
  app.log.error(err.red);
  process.exit(1);
}

process.on('SIGTERM', () => {
  console.log('Closing http server');
  app.close(() => {
    console.log('Server closed');
  });
});

process.on('SIGINT', () => {
  console.log('Server terminated');
  process.exit(1);
});
