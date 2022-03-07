const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

/**
 * NOTE: uibook is not transpiled with webpack so some of the components contain
 * lines such as `import 'rheostat/css/rheostat.css';`. Next.js does not know how
 * to interpret this so we need to transpile it in here instead.
 */
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
    withImages,
  ],
  config.next,
);
