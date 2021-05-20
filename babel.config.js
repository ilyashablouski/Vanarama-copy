module.exports = api => {
  let presets = [
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ];

  // TODO: Remove this workaround once next/babel is fixed in Next: https://github.com/vercel/next.js/issues/24566
  const isTest = api.env('test');

  if (!isTest) {
    presets = ['next/babel', ...presets];
  }

  api.cache.never();

  const plugins = [
    '@babel/plugin-transform-runtime',
    'transform-dynamic-import',
    'babel-plugin-dynamic-import-node',
    'macros',
  ];

  const env = {
    test: {
      presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
    },
  };

  // NOTE: Use this to remove data-testid attributes
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
    env,
  };
};
