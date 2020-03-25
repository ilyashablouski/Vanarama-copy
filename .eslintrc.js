module.exports = {
  root: true,
  extends: [
    'airbnb-typescript',
    'plugin:prettier/recommended',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/prop-types': 0,
    'react/static-property-placement': 0,
  },
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        'react/jsx-props-no-spreading': 0,
        'react/state-in-constructor': 0,
        "react/react-in-jsx-scope": 0
      },
    },
  ],
};
