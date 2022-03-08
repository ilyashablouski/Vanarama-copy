module.exports = {
  root: true,
  extends: [
    'airbnb-typescript',
    'plugin:prettier/recommended',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:testing-library/react',
    'plugin:cypress/recommended',
  ],
  plugins: ['react-hooks', 'cypress'],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/camelcase': 0,
    curly: [2, 'all'],
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'react/static-property-placement': 0,
    'jsx-a11y/anchor-is-valid': ['error', { components: ['a'] }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-underscore-dangle': ['error', { allow: ['__typename'] }],
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    'testing-library/no-manual-cleanup': 'error',
    'testing-library/prefer-screen-queries': 'error',
    'testing-library/prefer-wait-for': 'error',
    'testing-library/prefer-presence-queries': 'error',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'jsx-a11y/label-has-associated-control': [
      'error',
      { required: { some: ['nesting', 'id'] } },
    ],
    'id-length': ['warn', { min: 2, exceptions: ['_'] }],
  },
  overrides: [
    {
      files: ['./src/core/**/*.spec.tsx', './src/core/**/*.tsx'],
      rules: {
        'no-console': 0,
        'import/no-extraneous-dependencies': 'off',
        'jsx-a11y/anchor-is-valid': 0,
        'jsx-a11y/no-noninteractive-element-interactions': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/interactive-supports-focus': 0,
        'jsx-a11y/label-has-associated-control': 0,
        '@typescript-eslint/camelcase': 0,
      },
    },
    {
      files: ['*.tsx'],
      rules: {
        'react/jsx-props-no-spreading': 0,
        'react/state-in-constructor': 0,
        'react/react-in-jsx-scope': 0,
        '@typescript-eslint/camelcase': 0,
      },
    },
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [['core', './src/core']],
        extensions: ['.ts', '.js', '.jsx', '.tsx', '.json'],
      },
    },
  },
};
