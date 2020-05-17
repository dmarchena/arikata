module.exports = {
  env: {
    browser: true,
    node: false,
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2019,
    ecmaFeatures: { experimentalObjectRestSpread: true },
  },
  extends: ['plugin:vue/recommended', 'plugin:vue-a11y/recommended'],
  plugins: ['vue-a11y'],
};
