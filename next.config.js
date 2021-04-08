const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
// const withOffline = require('next-offline');

const withCustomBabelConfig = require('next-plugin-custom-babel-config');
/**
 * NOTE: uibook is not transpiled with webpack so some of the components contain
 * lines such as `import 'rheostat/css/rheostat.css';`. Next.js does not know how
 * to interpret this so we need to transpile it in here instead.
 */
const path = require('path');
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });
const config = require('./config/app');
const generateMenuData = require('./plugins/genMenuData');
const generateFooterData = require('./plugins/genFooterData');

module.exports = withPlugins(
  [
    [generateMenuData],
    [generateFooterData],
    // [withFonts],
    [
      withCustomBabelConfig,
      { babelConfigFile: path.resolve('./babel.config.js') },
    ],
    withImages,
    // withOffline,
  ],
  config.next,
);
