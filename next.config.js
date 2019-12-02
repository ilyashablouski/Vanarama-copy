module.exports = {
  devIndicators: {
    autoPrerender: false,
  },

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
