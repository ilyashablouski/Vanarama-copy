const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
const withImages = require('next-images');
const withFonts = require('next-fonts');
const sitemap = require('nextjs-sitemap-generator');
const withCustomBabelConfig = require('next-plugin-custom-babel-config');
/**
 * NOTE: uibook is not transpiled with webpack so some of the components contain
 * lines such as `import 'rheostat/css/rheostat.css';`. Next.js does not know how
 * to interpret this so we need to transpile it in here instead.
 */
const withTM = require('next-transpile-modules')(['@vanarama/uibook']);
const path = require('path');
const config = require('./config/app');

module.exports = withPlugins(
  [
    withTM,
    [withFonts],
    [
      withCustomBabelConfig,
      { babelConfigFile: path.resolve('./babel.config.js') },
    ],
    [withSass],
    withImages,
    [sitemap, config.sitemap],
    [withCss, { url: false }],
    [config.withCustomWebpack],
  ],
  config.next,
);
