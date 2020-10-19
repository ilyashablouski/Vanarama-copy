/* eslint-disable no-param-reassign */
require('dotenv').config();

// const { getPdpRewiteList } = require('../rewrites/pdp');
// const rewritePatterns = require('../rewrites/rewritePatterns');

module.exports = {
  // Sass.
  sass: {
    sassLoaderOptions: {
      data:
        "@import './node_modules/@vanarama/uibook/src/components/variables.scss';",
    },
  },

  // Next.
  next: {
    // Env vars.
    env: {
      ENV: process.env.ENV,
      IMG_OPTIMISATION_HOST: process.env.IMG_OPTIMISATION_HOST,
      HOSTNAME: process.env.HOSTNAME,
      GTM_ID: process.env.GTM_ID,
      MICROBLINK_URL: process.env.MICROBLINK_URL,
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

    // Rollbar.
    serverRuntimeConfig: {
      rollbarServerToken: process.env.ROLLBAR_SERVER_TOKEN || '',
    },
    publicRuntimeConfig: {
      rollbarClientToken: process.env.ROLLBAR_CLIENT_TOKEN || '',
    },

    // Rewrites.
    // async rewrites() {
    //   const pdpRewiteList = await getPdpRewiteList();
    //   const rewriteList = [...pdpRewiteList, ...rewritePatterns];

    //   return [
    //     {
    //       source: '/sitemap-vehicles.xml',
    //       destination: '/api/sitemap-vehicles',
    //     },
    //     ...rewriteList,
    //   ];
    // },

    trailingSlash: false,

    // Routes to export into static files.
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
