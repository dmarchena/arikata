// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: {
    'postcss-import': {},
    autoprefixer: {},
    'postcss-preset-env': {
      stage: 2,
    },
    cssnano: {
      preset: 'default',
    },
  },
};
