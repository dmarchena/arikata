import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';
import configJson from '../../../config.json';
import configServerJson from '../../../config-server.json';
import { unauthorized, forbidden } from './responses';

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

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    unauthorized(res);
  } else {
    jsonwebtoken.verify(
      token,
      configServerJson.webtoken.secret,
      (err, decoded) => {
        if (err) {
          unauthorized(res, 'Invalid token!');
        } else {
          req.user = {
            id: decoded.id,
            email: decoded.email,
            roles: decoded.roles,
          };
          next();
        }
      }
    );
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user?.roles?.includes(configJson.userRoles.admin)) {
    forbidden(res, 'You must be signed in as admin.');
  } else {
    next();
  }
};

export { applyBaseMiddlewares, verifyToken, isAdmin };
