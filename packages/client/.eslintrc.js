module.exports = {
  overrides: [
    {
      files: ['**/__tests__/**/*.test.tsx'],
      extends: ['plugin:testing-library/react'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
};
