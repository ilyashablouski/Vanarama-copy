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
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'react/static-property-placement': 0,
    "jsx-a11y/anchor-is-valid": [ "error", { "components": ["a"] }]
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
