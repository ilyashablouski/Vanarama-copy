/* eslint-disable no-console */
require('dotenv').config();
require('colors');

const express = require('express');
const cors = require('cors');
const next = require('next');
const rewrite = require('express-urlrewrite');
const prerender = require('prerender-node');
const hpp = require('hpp');

const rateLimiterRedisMiddleware = require('./middleware/rateLimiterRedis');
const logo = require('./logo');
const { version } = require('./package.json');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

// Rewrites.
const rewrites = [
  {
    from: '/:manufacturer-:vehicleType-leasing.html',
    to: '/:vehicleType-leasing/:manufacturer',
  },
  {
    from: '/:manufacturer-:vehicleType-leasing/:model.html',
    to: '/:vehicleType-leasing/:manufacturer/:model',
  },
  {
    from: '/car-leasing/:bodyStyle.html',
    to: '/car-leasing/:bodyStyle',
  },
  {
    from: 'car-leasing/4x4-suv.html',
    to: '/car-leasing/4x4',
  },
  {
    from: '/car-leasing/eco.html',
    to: '/car-leasing/electric',
  },
  {
    from: '/specialist-van-leasing.html',
    to: '/van-leasing/Specialist',
  },
  {
    from: '/:bodyStyle-leasing.html',
    to: '/van-leasing/:bodyStyle',
  },
  {
    from: '/automatic-vans.html',
    to: '/van-leasing/automatic',
  },
];
// Redirects.
const redirects = [{ from: '/old-link', to: '/redirect', type: 301 }];

app.prepare().then(() => {
  const server = express();

  server.disable('x-powered-by');
  server.use(hpp());
  // Prevent brute force attack in production.
  if (process.env.ENV === 'production') server.use(rateLimiterRedisMiddleware);

  // Handle rewrites.
  if (rewrites)
    rewrites.forEach(({ from, to }) => {
      server.use(rewrite(from, to));
    });

  // Handle redirects.
  if (redirects)
    redirects.forEach(({ from, to, type = 301, method = 'get' }) => {
      server[method](from, (req, res) => {
        res.redirect(type, to);
      });
    });

  // Prerender.
  if (prerender && process.env.PRERENDER_SERVICE_URL) server.use(prerender);

  // Status
  server.get('/status', (req, res) => {
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

  server.all('*', cors(), (req, res) => {
    res.setHeader('X-Robots-Tag', 'noindex'); // Disable indexing.

    // Trailing slash fix on page reload.
    req.url = req.url.replace(/\/$/, '');
    if (req.url === '') req.url = '/';

    if (process.env.ENV !== 'production')
      res.setHeader('X-Robots-Tag', 'noindex'); // Disable indexing.
    return handle(req, res);
  });

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(logo);
    console.log(`Ready on http://localhost:${PORT}`.cyan);
    console.log(`Environment: ${process.env.NODE_ENV.toUpperCase()}`.grey);
  });
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
