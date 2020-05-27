import Axios from 'axios';
import BadRequestError from '../../../application/exceptions/BadRequestError';
import UnauthorizedError from '../../../application/exceptions/UnauthorizedError';
import ForbiddenError from '../../../application/exceptions/ForbiddenError';
import NotFoundError from '../../../application/exceptions/NotFoundError';
import ConflictError from '../../../application/exceptions/ConflictError';

const configAuthHeader = (config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.accessToken) {
    // for Node.js Express back-end
    // eslint-disable-next-line no-param-reassign
    config.headers['x-access-token'] = user.accessToken;
  }
  return config;
};

const statusErrorMap = {
  400: (msg) => new BadRequestError(msg),
  401: (msg) => new UnauthorizedError(msg),
  403: (msg) => new ForbiddenError(msg),
  404: (msg) => new NotFoundError(msg),
  405: (msg) => new Error(msg),
  409: (msg) => new ConflictError(msg),
  500: (msg) => new Error(msg),
};

const createHttpClient = () => {
  const instance = Axios.create();
  instance.interceptors.request.use(
    (config) => configAuthHeader(config),
    (error) => Promise.reject(error)
  );
  instance.interceptors.response.use(
    (response) => response.data,
    (error) => {
      const message = error.response?.data?.message ?? false;
      if (message) {
        const { status } = error.response;
        const customError =
          statusErrorMap[status] && statusErrorMap[status](message);
        if (customError) {
          return Promise.reject(customError);
        }
      }
      return Promise.reject(error);
    }
  );
  return instance;
};

// eslint-disable-next-line import/prefer-default-export
export { createHttpClient };
