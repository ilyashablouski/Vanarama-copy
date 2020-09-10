/* eslint-disable no-param-reassign */
require('dotenv').config();
const { homepage } = require('../package.json');

module.exports = {
  // Sass.
  sass: {
    sassLoaderOptions: {
      data:
        "@import './node_modules/@vanarama/uibook/src/components/variables.scss';",
    },
  },
  // Sitemap.
  sitemap: {
    baseUrl: homepage,
    pagesDirectory: 'src/pages',
    targetDirectory: 'public/',
  },

  // Next.
  next: {
    // Env vars.
    env: {
      ENV: process.env.ENV,
      GTM_ID: process.env.GTM_ID,
      API_URL: process.env.API_URL,
      API_KEY: process.env.API_KEY,
      LOQATE_KEY: process.env.LOQATE_KEY,
      GITHUB_TOKEN: process.env.GITHUB_TOKEN,
      ENABLE_DEV_TOOLS: process.env.ENABLE_DEV_TOOLS,
      REDIS_CACHE_HOST: process.env.REDIS_CACHE_HOST,
      REDIS_CACHE_PORT: process.env.REDIS_CACHE_PORT,
      REDIS_KEY_PREFIX: process.env.REDIS_KEY_PREFIX,
    },
    devIndicators: {
      autoPrerender: false,
    },
    poweredByHeader: false,

    // Rewrites.
    // async rewrites() {
    //   return [
    //     {
    //       source: '/seat-car-leasing/ibiza/hatchback/1-0-fr-ez-5dr-161392.html',
    //       destination: '/car-leasing/seat/ibiza/hatchback/10-fr-ez-5-doors',
    //     },
    //     {
    //       source: '/testurl',
    //       destination:
    //         '/car-leasing/bmw/3-series/saloon/320i-m-sport-4-doors-step-auto/',
    //     },
    //   ];
    // },

    // Rollbar.
    serverRuntimeConfig: {
      rollbarServerToken: process.env.ROLLBAR_SERVER_TOKEN || '',
    },
    publicRuntimeConfig: {
      rollbarClientToken: process.env.ROLLBAR_CLIENT_TOKEN || '',
    },

    // Routes to export into static files.
    trailingSlash: true,
    exportPathMap: () => {
      return {
        '/': { page: '/' },
      };
    },

    webpack: config => {
      // Allow absolute imports.
      config.resolve.modules = [...config.resolve.modules, 'src'];

      // Fixes npm packages that depend on `fs` module.
      config.node = {
        fs: 'empty',
      };

      return config;
    },
  },

  withCustomWebpack: (config = {}) => {
    const { webpack } = config;

    // eslint-disable-next-line no-shadow
    config.webpack = (config, ...rest) => {
      config.externals = config.externals || [];

      return webpack(config, ...rest);
    };

    return config;
  },
};
