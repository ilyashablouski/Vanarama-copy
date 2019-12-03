const withPlugins = require("next-compose-plugins")
const withSass = require("@zeit/next-sass")
const withImages = require("next-images")

const config = require("./config/app")

module.exports = withPlugins([[withSass, config.sass], withImages], config.next)
