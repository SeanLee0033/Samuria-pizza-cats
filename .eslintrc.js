module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-function-return-type': 1,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
