const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
const withImages = require('next-images');
// const withFonts = require('next-fonts');

const withCustomBabelConfig = require('next-plugin-custom-babel-config');
/**
 * NOTE: uibook is not transpiled with webpack so some of the components contain
 * lines such as `import 'rheostat/css/rheostat.css';`. Next.js does not know how
 * to interpret this so we need to transpile it in here instead.
 */
const withTM = require('next-transpile-modules')(['@vanarama/uibook']);
const path = require('path');
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });
const config = require('./config/app');
const generateMenuData = require('./plugins/genMenuData');

module.exports = withPlugins(
  [
    [generateMenuData],
    withTM,
    // [withBundleAnalyzer],
    // [withFonts],
    [
      withCustomBabelConfig,
      { babelConfigFile: path.resolve('./babel.config.js') },
    ],
    [withSass],
    withImages,
    [withCss, { url: false, purgeCssEnabled: true }],
  ],
  config.next,
);
