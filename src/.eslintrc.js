module.exports = {
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
      },
      extends: ['plugin:jest/all'],
      rules: { 'jest/require-to-throw-message': 'warn' },
    },
  ],
};
