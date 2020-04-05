const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const appDir = path.join(__dirname, '..', 'src/application');
const infrastructureDir = path.join(__dirname, '..', 'src/infrastructure');
const clientDir = path.join(__dirname, '..', 'src/client');
const distDir = path.join(__dirname, '..', 'dist');

module.exports = {
  context: path.join(__dirname, '..'),

  entry: {
    app: [
      path.join(clientDir, 'index.js'),
      path.join(clientDir, 'css/index.css'),
    ],
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      // this will apply to both plain `.js` files
      // AND `<script>` blocks in `.vue` files
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },

  output: {
    filename: '[name].js',
    path: distDir,
    publicPath: '/',
  },

  performance: {
    hints: false,
  },

  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebPackPlugin({
      template: path.join(clientDir, 'index.html'),
      filename: path.join(distDir, 'index.html'),
      inject: true,
    }),
    // new BundleAnalyzerPlugin(),
  ],

  resolve: {
    alias: {
      '@': clientDir,
      '@app': appDir,
      '@infra': infrastructureDir,
    },
    extensions: ['.vue', '.mjs', '.js', '.json'],
    mainFiles: ['index'],
  },

  target: 'web', // <=== can be omitted as default is 'web'
};
