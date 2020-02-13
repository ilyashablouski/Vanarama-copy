const withPlugins = require("next-compose-plugins")
const withSass = require("@zeit/next-sass")
const withImages = require("next-images")
const sitemap = require("nextjs-sitemap-generator")
const withCustomBabelConfig = require("next-plugin-custom-babel-config");
const withTM = require('next-transpile-modules')(['@vanarama/uibook']);
const path = require("path");
const config = require("./config/app")

module.exports = withPlugins(
  [
    [withTM],
    [withCustomBabelConfig, { babelConfigFile: path.resolve("./babel.config.js") }],  
    [withSass, config.sass], withImages, [sitemap, config.sitemap],
    [config.withCustomWebpack]
  ],
  config.next,
)
