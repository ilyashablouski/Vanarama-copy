module.exports = {
  plugins: {
    'postcss-preset-env': {
      preserve: true,
      features: {
        'nesting-rules': true,
        'custom-properties': true,
        'custom-media-queries': true,
      },
    },
  },
};
