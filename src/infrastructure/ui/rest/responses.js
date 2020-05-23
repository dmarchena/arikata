import statusCodes from './status';

const badRequest = (res, msg = false) =>
  res.status(statusCodes.badRequest).send({
    message: msg ? `Bad request: ${msg}` : 'Bad request!',
  });

const forbidden = (res, msg = false) =>
  res.status(statusCodes.forbidden).send({
    message: msg ? `Forbidden: ${msg}` : 'Forbidden!',
  });

const methodNotAllowed = (res, msg = false) =>
  res.status(statusCodes.methodNotAllowed).send({
    message: msg ? `Not found: ${msg}` : 'Not found!',
  });

const notFound = (res, msg = false) =>
  res.status(statusCodes.notFound).send({
    message: msg ? `Not found: ${msg}` : 'Not found!',
  });

const unauthorized = (res, msg = false) =>
  res.status(statusCodes.unauthorized).send({
    message: msg ? `Unauthorized: ${msg}` : 'Unauthorized!',
  });

const unknownError = (res, err) =>
  res.status(statusCodes.internalServerError).send({
    message: `Internal Server Error: ${err.message}`,
  });

export {
  badRequest,
  forbidden,
  methodNotAllowed,
  notFound,
  unauthorized,
  unknownError,
};
