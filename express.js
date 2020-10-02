/* eslint-disable no-console */
require('dotenv').config();
require('colors');

const express = require('express');
const cors = require('cors');
const next = require('next');
const prerender = require('prerender-node');
const hpp = require('hpp');

const rateLimiterRedisMiddleware = require('./middleware/rateLimiterRedis');
const logo = require('./logo');
const { version } = require('./package.json');

// const inspect = require('./inspect');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

app
  .prepare()
  .then(async () => {
    // Create server.
    const server = express();

    return server;
  })
  .then(server => {
    // Handle redirect list.
    // const redirectList = [{ from: '/old-link', to: '/redirect', type: 301 }];
    const redirectList = null;

    if (redirectList)
      redirectList.forEach(({ from, to, type = 301, method = 'get' }) => {
        server[method](from, (_req, res) => {
          res.redirect(type, to);
        });
      });

    return server;
  })
  .then(server => {
    server.disable('x-powered-by');
    server.use(hpp());

    // Prevent brute force attack in production.
    if (process.env.ENV === 'production') {
      server.use(rateLimiterRedisMiddleware);
    }

    // Prerender.
    if (prerender && process.env.PRERENDER_SERVICE_URL) server.use(prerender);

    return server;
  })
  .then(server => {
    // Status route.
    server.get('/status', (_req, res) => {
      const statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.status(statusCode);
      res.json({
        statusCode,
        nodeEnv: process.env.NODE_ENV,
        env: process.env.ENV,
        nodeVersion: process.version,
        appVersion: version,
      });
    });

    // All routes.
    server.all('*', cors(), (req, res) => {
      // Trailing slash fix on page reload.
      // req.url = req.url.replace(/\/$/, '');
      // if (req.url === '') req.url = '/';

      if (process.env.ENV !== 'production')
        res.setHeader('X-Robots-Tag', 'noindex'); // Disable indexing.
      return handle(req, res);
    });
    return server;
  })
  .then(server => {
    // Start server.
    server.listen(PORT, err => {
      if (err) throw err;
      console.log(logo);
      console.log(`Ready on http://localhost:${PORT}`.cyan);
      console.log(`Environment: ${process.env.NODE_ENV.toUpperCase()}`.grey);
      // console.log(`Environment: ${process.env.ENV.toUpperCase()}`.grey);
    });
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

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
