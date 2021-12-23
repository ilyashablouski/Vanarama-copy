const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rules = [
  {
    test: /\.(tsx|ts)$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [['react-app', { flow: false, typescript: true }]],
          plugins: [
            [
              'import',
              { libraryName: 'antd', libraryDirectory: 'es', style: true },
            ],
          ],
        },
      },
    ],
  },
  {
    test: /\.scss$/,
    exclude: [/node_modules/],
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../'),
  },
  {
    test: /\.css$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader'],
    include: [/node_modules/],
  },
];

module.exports = async ({ config }) => {
  config.module.rules.push(...rules);
  config.resolve.extensions.push(
    '.tsx',
    '.ts',
    '.js',
    'scss',
    '.scss',
    '.css',
    'css',
    '.png',
    'png',
  );
  config.resolve.alias = {
    core: path.resolve(__dirname, '../src/core/'),
  };
  config.resolve.roots = [path.resolve(__dirname, '../public/')];

  return config;
};
