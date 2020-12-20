module.exports = {
  root: true,
  extends: [
    'airbnb-typescript',
    'plugin:prettier/recommended',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:testing-library/react',
  ],
  plugins: ['react-hooks'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
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
  },
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        'react/jsx-props-no-spreading': 0,
        'react/state-in-constructor': 0,
        'react/react-in-jsx-scope': 0,
      },
    },
  ],
};
