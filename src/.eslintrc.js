module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'no-underscore-dangle': ['error', { allow: ['__'] }],
  },
  overrides: [
    {
      files: ['*.test.js'],
      globals: {
        createCustomLocalVue: 'readonly',
        mockKataData: 'readonly',
        mockKataDto: 'readonly',
        mockKataEntity: 'readonly',
        mockExpiredToken: 'readonly',
        mockUser: 'readonly',
        mockUserAdmin: 'readonly',
      },
      extends: ['plugin:jest/all'],
      rules: { 'jest/require-to-throw-message': 'warn' },
    },
  ],
};
