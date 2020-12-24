/* eslint-disable no-param-reassign */
require('dotenv').config({ path: '.env.secret' });
require('dotenv').config();

const fetchRewritesList = require('../rewrites');

module.exports = {
  // Next.
  next: {
    // Env vars.
    env: {
      ENV: process.env.ENV,
      IMG_OPTIMISATION_HOST: process.env.IMG_OPTIMISATION_HOST,
      STATIC_DOMAIN: process.env.STATIC_DOMAIN,
      GTM_ID: process.env.GTM_ID,
      MICROBLINK_URL: process.env.MICROBLINK_URL,
      API_URL: process.env.API_URL,
      API_KEY: process.env.API_KEY,
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

    // Rewrites.
    async rewrites() {
      if (process.env.LOCAL) {
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

    webpack: (config, { webpack }) => {
      config.plugins.push(
        new webpack.ContextReplacementPlugin(
          /moment[/\\]locale/,
          /(en-gb)\.js/,
        ),
      );
      // Allow absolute imports.
      config.resolve.modules = [...config.resolve.modules, 'src'];

      // Fixes npm packages that depend on `fs` module.
      config.node = {
        fs: 'empty',
      };

      config.mode = 'production';

      return config;
    },
  },
};
