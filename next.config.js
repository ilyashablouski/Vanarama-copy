const withSass = require("@zeit/next-sass")

const config = {
  devIndicators: {
    autoPrerender: false,
  },

  // Sass.
  sassLoaderOptions: {
    data: "@import 'application';",
    includePaths: ["./static/styles"],
  },
  // cssModules: true,

  webpack: (config) => {
    // Allow absolute imports.
    config.resolve.modules = [...config.resolve.modules, "."]

    // Fixes npm packages that depend on `fs` module.
    config.node = {
      fs: "empty",
    }

    return config
  },
}

module.exports = withSass(config)
