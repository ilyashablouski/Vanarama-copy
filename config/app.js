const { homepage } = require("../package.json")
// const { parse } = require("url")
// const basename = parse(homepage).pathname

module.exports = {
  // Sass.
  sass: {
    sassLoaderOptions: {
      data: "@import 'application';",
      includePaths: ["./src/styles"],
    },
  },

  // Sitemap.
  sitemap: {
    baseUrl: homepage,
    pagesDirectory: "src/pages",
    targetDirectory: "public/",
  },

  // Next.
  next: {
    devIndicators: {
      autoPrerender: false,
    },

    // Routes to export into static files.
    exportTrailingSlash: true,
    exportPathMap: () => {
      return {
        "/": { page: "/" },
      }
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

  withCustomWebpack: (config = {}) => {
    const { webpack } = config;
  
    config.webpack = (config, ...rest) => {
      config.externals = config.externals || [];
  
      return webpack(config, ...rest)
    }
  
    return config
  }
}

