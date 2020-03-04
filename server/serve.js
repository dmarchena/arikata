const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const path = require('path');
const DIST_DIR = path.join(__dirname, '..', 'dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

/**
 * Check if server is in development mode
 * @returns {boolean} true if it is
 */
function isDevelopmentMode() {
  return process.env.NODE_ENV === 'development';
}

/**
 * Initialize Webpack hot reload module.
 * 	Note: Only in development mode
 *
 * @param {any} app
 */
function initWebpack(app) {
  // Webpack middleware in development mode
  if (isDevelopmentMode()) {
    const webpack = require('webpack');
    const webpackConfig = require('../webpack/client.dev.config');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    // let HtmlWebpackPlugin = require('html-webpack-plugin');

    const compiler = webpack(webpackConfig);

    const devMiddleware = webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
      stats: { colors: true },
    });

    const hotMiddleware = webpackHotMiddleware(compiler);

    // serve webpack bundle output
    app.use(devMiddleware);

    // enable hot-reload and state-preserving
    // compilation error display
    app.use(hotMiddleware);
  }
}

function initHtml(app) {
  app.use(
    '/',
    expressStaticGzip(DIST_DIR, {
      enableBrotli: true,
      orderPreference: ['br', 'gz'],
    })
  );
  // static
  app.use(express.static(DIST_DIR));
  // main entry point
  app.get('/', (req, res) => res.sendFile(HTML_FILE));
}

module.exports = function serve() {
  const app = express();
  const PORT = process.env.PORT || 8080;

  initWebpack(app);

  initHtml(app);

  app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`);
  });
};
