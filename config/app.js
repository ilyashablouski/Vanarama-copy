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
    env: {
      API_URL: process.env.API_URL,
      API_KEY: process.env.API_KEY,
    },
    devIndicators: {
      autoPrerender: false,
    },

    // Routes to export into static files.
    exportTrailingSlash: true,
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
