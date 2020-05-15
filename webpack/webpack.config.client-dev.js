const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.client-base');

module.exports = merge(baseConfig, {
  devtool: '#source-map',

  entry: {
    app: [
      // Hot reload
      'webpack-hot-middleware/client',
    ],
  },

  mode: 'development',

  module: {
    rules: [
      // this will apply to both plain `.css` files
      // AND `<style>` blocks in `.vue` files
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },

  plugins: [
    // OccurrenceOrderPlugin is needed for webpack 1.x only
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // Use NoErrorsPlugin for webpack 1.x
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});
