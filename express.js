/* eslint-disable no-console */
require('dotenv').config({ path: '.env.secret' });
require('dotenv').config();
require('colors');

const OS = require('os');

process.env.UV_THREADPOOL_SIZE = OS.cpus().length;

const express = require('express');
const cors = require('cors');
const next = require('next');
const hpp = require('hpp');
const compression = require('compression');
const basicAuth = require('express-basic-auth');

const logo = require('./logo');
const cache = require('./cache');
const { version } = require('./package.json');

// const inspect = require('./inspect');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

app
  .prepare()
  .then(() => {
    // Create server.
    const server = express();

    return server;
  })
  .then(server => {
    server.use(hpp());
    server.use(compression());
    server.disable('x-powered-by');
    server.use(cache);

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
        commitHash: process.env.COMMIT_HASH,
      });
    });

    // Env route.
    function auth() {
      return basicAuth({
        users: { [process.env.APP_AUTH_USR]: process.env.APP_AUTH_PWD },
        challenge: true,
      });
    }
    function env(res) {
      const statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.status(statusCode);
      res.json(process.env);
    }

    if (['dev', 'uat'].includes(process.env.ENV)) {
      server.get('/env', (_req, res) => {
        env(res);
      });
    } else {
      server.get('/env', auth(), (_req, res) => {
        env(res);
      });
    }

    // All routes.
    server.all('*', cors(), (req, res) => {
      // Disable indexing on live domain.
      if (!req.get('host').includes('vanarama.com')) {
        res.setHeader('X-Robots-Tag', 'noindex');
      }

      return handle(req, res);
    });
    return server;
  })
  .then(server => {
    // Start server.
    server.listen(PORT, err => {
      if (err) {
        throw err;
      }
      console.log(logo);
      console.log(`Ready on http://localhost:${PORT}`.cyan);
      console.log(`Mode: ${process.env.NODE_ENV.toUpperCase()}`.grey);
      console.log(`Environment: ${process.env.ENV.toUpperCase()}`.grey);
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
