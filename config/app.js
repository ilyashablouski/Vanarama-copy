/* eslint-disable no-param-reassign */
require('dotenv').config({ path: '.env.secret' });
require('dotenv').config();

const yn = require('yn');

const fetchRewritesList = require('../rewrites');

module.exports = {
  // Next.
  next: {
    future: {
      webpack5: true,
    },
    // Env vars.
    env: {
      ENV: process.env.ENV,
      HOST_DOMAIN: process.env.HOST_DOMAIN,
      IMG_OPTIMISATION_HOST: process.env.IMG_OPTIMISATION_HOST,
      STATIC_DOMAIN: process.env.STATIC_DOMAIN,
      GTM_ID: process.env.GTM_ID,
      MICROBLINK_URL: process.env.MICROBLINK_URL,
      API_URL: process.env.API_URL,
      API_KEY: process.env.API_KEY,
      REVALIDATE_INTERVAL: Number(process.env.REVALIDATE_INTERVAL),
      LOQATE_KEY: process.env.LOQATE_KEY,
      ENABLE_DEV_TOOLS: process.env.ENABLE_DEV_TOOLS,
      REDIS_CACHE_HOST: process.env.REDIS_CACHE_HOST,
      REDIS_CACHE_PORT: process.env.REDIS_CACHE_PORT,
      REDIS_KEY_PREFIX: process.env.REDIS_KEY_PREFIX,
    },
    devIndicators: {
      autoPrerender: false,
    },
    poweredByHeader: false,
    trailingSlash: false,

    serverRuntimeConfig: {
      // Rollbar.
      rollbarServerToken: process.env.ROLLBAR_SERVER_TOKEN || '',
    },
    publicRuntimeConfig: {
      // Rollbar.
      rollbarClientToken: process.env.ROLLBAR_CLIENT_TOKEN || '',
    },

    // Headers.
    async headers() {
      const securityHeaders = [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains',
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ];
      return [
        {
          source: '/',
          headers: securityHeaders,
        },
        {
          source: '/:slug*',
          headers: securityHeaders,
        },
        {
          source: '/styles/:slug',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=2592000',
            },
          ],
        },
      ];
    },

    // Rewrites.
    async rewrites() {
      if (yn(process.env.LOCAL)) {
        const rewriteList = await fetchRewritesList();

        return rewriteList;
      }
      return [];
    },

    // Routes to export into static files.
    exportPathMap: () => {
      return {
        '/': { page: '/' },
      };
    },

    webpack: (config /* { webpack } */) => {
      // left as reference example incase we can use method for another pkg
      /* config.plugins.push(
        new webpack.ContextReplacementPlugin(
          /moment[/\\]locale/,
          /(en-gb)\.js/,
        ),
      ); */

      // Allow absolute imports.
      config.resolve.modules = [...config.resolve.modules, 'src'];

      config.module.rules.push({
        test: /\.css$/i,
        use: 'raw-loader',
      });

      if (config.mode === 'production' && config.name === 'client') {
        config.optimization.splitChunks = {
          ...config.optimization.splitChunks,
          chunks: 'all',
          minSize: 100000,
          // maxSize: 120000,
          // maxAsyncRequests: 100,
          maxInitialRequests: 25,
          // cacheGroups: {
          //   ...config.optimization.splitChunks.cacheGroups,
          //   core: {
          //     test: /[\\/]src[\\/]core[\\/]assets[\\/]icons[\\/]/,
          //     chunks: 'all',
          //     minSize: 0,
          //   },
          //   utils: {
          //     test: /[\\/]src[\\/]utils[\\/]/,
          //     chunks: 'all',
          //     minSize: 0,
          //   },
          //   hooks: {
          //     test: /[\\/]src[\\/]hooks[\\/]/,
          //     chunks: 'all',
          //     minSize: 0,
          //   },
          // },
        };
      }

      return config;
    },
  },
};
