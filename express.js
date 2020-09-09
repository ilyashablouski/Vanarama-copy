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

// const { getPdpRewiteList } = require('./rewrites/pdp');
const rewritePatterns = require('./rewrites/rewritePatterns');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

// RewriteList.
// async function getRewriteList(pdpRewiteList) {
//   return [...pdpRewiteList, ...rewritePatterns];
// }

// RedirectList.
const redirectList = [{ from: '/old-link', to: '/redirect', type: 301 }];

app
  .prepare()
  .then(async () => {
    // const pdpRewiteList = await getPdpRewiteList();
    // const rewriteList = await getRewriteList(pdpRewiteList || []);

    // return rewriteList;
    return rewritePatterns;
  })
  .then(rewriteList => {
    const server = express();

    server.disable('x-powered-by');
    server.use(hpp());

    // Prevent brute force attack in production.
    if (process.env.ENV === 'production')
      server.use(rateLimiterRedisMiddleware);

    // Handle rewrite list.
    if (rewriteList)
      rewriteList.forEach(({ from, to }) => {
        server.use(rewrite(from, to));
      });

    // Handle redirect list.
    if (redirectList)
      redirectList.forEach(({ from, to, type = 301, method = 'get' }) => {
        server[method](from, (req, res) => {
          res.redirect(type, to);
        });
      });

    // Prerender.
    if (prerender && process.env.PRERENDER_SERVICE_URL) server.use(prerender);

    // Status.
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
      // console.log(`Environment: ${process.env.ENV.toUpperCase()}`.grey);
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
