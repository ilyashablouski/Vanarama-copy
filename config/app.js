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

    // Rollbar.
    serverRuntimeConfig: {
      rollbarServerToken: process.env.ROLLBAR_SERVER_TOKEN || '',
    },
    publicRuntimeConfig: {
      rollbarClientToken: process.env.ROLLBAR_CLIENT_TOKEN || '',
    },

    async rewrites() {
      return [
        {
          source: '/test',
          destination: '/van-leasing/nissan',
        },
        {
          source:
            '/nissan-van-leasing/navara/diesel/double-cab-pick-up-tekna-2-3dci-190-tt-4wd-auto-9953.html',
          destination:
            '/van-leasing/nissan/navara/double-cab-pick-up-tekna-23dci-190-tt-4wd-auto',
        },
        {
          source:
            '/citroen-van-leasing/dispatch/1000-1-6-bluehdi-115-van-enterprise-9789.html',
          destination:
            '/van-leasing/citroen/dispatch-m/1000-15-bluehdi-100-van-enterprise',
        },
      ];
    },

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
