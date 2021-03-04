/* eslint-disable no-console */
require('dotenv').config({ path: '.env.secret' });
require('dotenv').config();
require('colors');

const OS = require('os');

process.env.UV_THREADPOOL_SIZE = OS.cpus().length;

const express = require('express');
const cors = require('cors');
const next = require('next');
const prerender = require('prerender-node');
const hpp = require('hpp');
const compression = require('compression');
const cluster = require('cluster');

const rateLimiterRedisMiddleware = require('./middleware/rateLimiterRedis');
const logo = require('./logo');
const cache = require('./cache');
const { version } = require('./package.json');

// const inspect = require('./inspect');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

if (cluster.isMaster) {
  for (let i = 0; i < process.env.UV_THREADPOOL_SIZE; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', worker => {
    console.log('Worker', worker.id, ' has exitted.');
  });
} else {
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
      // Prevent brute force attack in production.
      // if (process.env.ENV === 'prod') {
      //   server.use(rateLimiterRedisMiddleware);
      // }

      // Prerender.
      if (prerender && process.env.PRERENDER_SERVICE_URL) {
        server.use(prerender);
      }

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
        });
      });

      // Env route.
      server.get('/env', (_req, res) => {
        const statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.status(statusCode);
        res.json(process.env);
      });

      // All routes.
      server.all('*', cors(), (req, res) => {
        // Disable indexing on non live domain.
        if (!req.get('host').includes('vanarama.com'))
          res.setHeader('X-Robots-Tag', 'noindex');

        return handle(req, res);
      });
      return server;
    })
    .then(server => {
      // Start server.
      server.listen(PORT, err => {
        if (err) throw err;

        if (dev) {
          console.log(logo);
          console.log(`Ready on http://localhost:${PORT}`.cyan);
          console.log(
            `Environment: ${process.env.NODE_ENV.toUpperCase()}`.grey,
          );
          // console.log(`Environment: ${process.env.ENV.toUpperCase()}`.grey);
        } else {
          console.log(
            `Express server listening on port ${PORT} and worker ${process.pid}`,
          );
        }
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
}
