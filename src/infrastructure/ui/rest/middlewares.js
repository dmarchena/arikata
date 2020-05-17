import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';
import configJson from '../../../config.json';
import { unauthorized } from './responses';

const authHeaders = (req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
};

const applyBaseMiddlewares = (router) => {
  // Configuring body parser middleware
  router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());
  // Allow Auth headers
  router.use(authHeaders);
  return router;
};

// eslint-disable-next-line consistent-return
const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return unauthorized(res);
  }

  // eslint-disable-next-line consistent-return
  jsonwebtoken.verify(token, configJson.webtoken.secret, (err, decoded) => {
    if (err) {
      return unauthorized(res, 'Invalid token!');
    }
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
    next();
  });
};

export { applyBaseMiddlewares, verifyToken };
