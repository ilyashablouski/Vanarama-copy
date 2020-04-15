const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
const withImages = require('next-images');
const withFonts = require('next-fonts');
const sitemap = require('nextjs-sitemap-generator');
const withCustomBabelConfig = require('next-plugin-custom-babel-config');
const path = require('path');
const config = require('./config/app');

module.exports = withPlugins(
  [
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
