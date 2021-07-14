module.exports = api => {
  const isServer = api.caller(caller => caller?.isServer);
  const isCallerDevelopment = api.caller(caller => caller?.isDev);

  let presets = [
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        importSource:
          !isServer && isCallerDevelopment
            ? '@welldone-software/why-did-you-render'
            : 'react',
      },
    ],
  ];

  // TODO: Remove this workaround once next/babel is fixed in Next: https://github.com/vercel/next.js/issues/24566
  const isNextBabelPresetAllowed =
    !api.env('test') && process.env.ENV !== 'storybook';

  if (isNextBabelPresetAllowed) {
    presets = ['next/babel', ...presets];
  }

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
