const withPlugins = require("next-compose-plugins")
const withSass = require("@zeit/next-sass")

const config = require("./config")

module.exports = withPlugins([[withSass, config.sass]], config.next)
