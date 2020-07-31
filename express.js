require('dotenv').config();
require('colors');

const express = require('express');
const cors = require('cors');
const next = require('next');
const rewrite = require('express-urlrewrite');
const prerender = require('prerender-node');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const logo = require('./logo');

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
  // E.g.:
  // {
  //   from: '/car-leasing/:bodyStyle.html',
  //   to: '/search/?bodyStyle=:bodyStyle',
  // },
];
// Redirects.
const redirects = [{ from: '/old-link', to: '/redirect', type: 301 }];

app.prepare().then(() => {
  const server = express();

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

  server.get('/status', (req, res) => {
    res.sendStatus(200);
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
