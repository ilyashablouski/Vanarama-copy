module.exports = api => {
  api.cache(true);

  const presets = [
    'next/babel',
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
  ];

  const plugins = [
    '@babel/plugin-transform-runtime',
    'transform-dynamic-import',
  ];
  return {
    presets,
    plugins,
  };
};
