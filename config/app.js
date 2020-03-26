/* eslint-disable no-param-reassign */
const { homepage } = require('../package.json');
// const { parse } = require("url")
// const basename = parse(homepage).pathname

module.exports = {
  // Sitemap.
  sitemap: {
    baseUrl: homepage,
    pagesDirectory: 'src/pages',
    targetDirectory: 'public/',
  },

  // Next.
  next: {
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
};
