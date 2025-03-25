module.exports = {
  globals: {
    NodeJS: true,
  },
  extends: [
    '@rocketseat/eslint-config/node',
    'plugin:vitest-globals/recommended',
  ],
  env: {
    'vitest-globals/env': true,
  },
  ignorePatterns: ['*.json'],
  rules: {
    'no-unused-vars': 'off',
    'no-useless-constructor': 'off',
    'no-new': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
}
