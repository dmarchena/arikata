module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: '3.6',
      },
    ],
  ],
  plugins: ['@babel/plugin-proposal-object-rest-spread'],
};
