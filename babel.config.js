module.exports = api => {
  api.cache(true);

  const presets = [
    'next/babel',
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
  ];

  const plugins = [
    '@babel/plugin-transform-runtime',
    'transform-dynamic-import',
    'babel-plugin-dynamic-import-node',
  ];

  // const env = {
  //   production: {
  //     plugins: [
  //       [
  //         'babel-plugin-jsx-remove-data-test-id',
  //         {
  //           attributes: 'data-testid',
  //         },
  //       ],
  //     ],
  //   },
  // };

  return {
    presets,
    plugins,
    // env,
  };
};
