module.exports = {
  // Sass.
  sass: {
    sassLoaderOptions: {
      data: "@import 'application';",
      includePaths: ["./public/styles"],
    },
  },

  // Next.
  next: {
    devIndicators: {
      autoPrerender: false,
    },

    webpack: (config) => {
      // Allow absolute imports.
      config.resolve.modules = [...config.resolve.modules, "src"]

      // Fixes npm packages that depend on `fs` module.
      config.node = {
        fs: "empty",
      }

      return config
    },
  },
}
