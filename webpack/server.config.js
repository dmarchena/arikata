const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  entry: {
    server: path.join(__dirname, '..', 'server', 'index.js'),
  },

  externals: [nodeExternals()], // Need this to avoid error when working with Express

  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false, // and __filename return blank or /
  },

  mode: process.env.NODE_ENV,

  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  output: {
    path: path.join(__dirname, '..', 'dist'),
    publicPath: '/',
    filename: '[name].js',
  },

  target: 'node',
};

// Webpack 4 basic tutorial:
// https://www.valentinog.com/blog/webpack-4-tutorial/#webpack_4_production_and_development_mode

// Development mode is optimized for build speed and does nothing more than providing an un-minified bundle.
// Production mode enables all sorts of optimizations like minification, scope hoisting, tree-shaking and more.
