const withPlugins = require('next-compose-plugins');
const withCss = require('@zeit/next-css');
const withImages = require('next-images');
// const withFonts = require('next-fonts');

const withCustomBabelConfig = require('next-plugin-custom-babel-config');
/**
 * NOTE: uibook is not transpiled with webpack so some of the components contain
 * lines such as `import 'rheostat/css/rheostat.css';`. Next.js does not know how
 * to interpret this so we need to transpile it in here instead.
 */
const path = require('path');
const config = require('./config/app');
const generateMenuData = require('./plugins/genMenuData');

module.exports = withPlugins(
  [
    [generateMenuData],
    // [withFonts],
    [
      withCustomBabelConfig,
      { babelConfigFile: path.resolve('./babel.config.js') },
    ],
    withImages,
    [withCss, { url: false, purgeCssEnabled: true }],
    [config.withCustomWebpack],
  ],
  config.next,
);
