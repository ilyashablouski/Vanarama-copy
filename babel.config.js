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
  return {
    presets,
    plugins,
  };
};
