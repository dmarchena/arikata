const fs = require('fs');
const path = require('path');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const appDir = path.join(__dirname, '..', 'src/application');
const infrastructureDir = path.join(__dirname, '..', 'src/infrastructure');
const clientDir = path.join(__dirname, '..', 'src/infrastructure/ui/web');
const distDir = path.join(__dirname, '..', 'dist');
const sprite = fs.readFileSync(path.join(distDir, 'sprite.svg'));

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
      {
        test: /\.(png|jpg|gif|webp)$/,
        use: ['file-loader'],
      },
    ],
  },

  output: {
    filename: '[name].[hash].js',
    path: distDir,
    publicPath: '/',
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
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
      template: path.join(clientDir, 'index.ejs'),
      filename: path.join(distDir, 'index.html'),
      inject: true,
      svgSprite: sprite,
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
