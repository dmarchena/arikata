import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import expressStaticGzip from 'express-static-gzip';
import path from 'path';
import helmet from 'helmet';
import restApiRouter from '../infrastructure/ui/rest';

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
    /* eslint-disable import/no-extraneous-dependencies, global-require */
    const webpack = require('webpack');
    const webpackConfig = require('../../webpack/webpack.config.client-dev');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    // let HtmlWebpackPlugin = require('html-webpack-plugin');
    /* eslint-enable import/no-extraneous-dependencies, global-require */

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
  const DIST_DIR = path.resolve(__dirname);
  const HTML_FILE = path.join(DIST_DIR, 'index.html');
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

export default function serve() {
  const PORT = process.env.PORT || 3000;
  const app = express();

  app.use(helmet());
  app.use(cors());
  // Configuring body parser middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  initWebpack(app);

  app.use('/api', restApiRouter);

  initHtml(app);

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening to ${PORT}....`);
  });
}
