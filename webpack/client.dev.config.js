'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./client.base.config');

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
        use: ['style-loader', 'css-loader', 'postcss-loader'],
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
