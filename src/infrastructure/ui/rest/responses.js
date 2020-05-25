import statusCodes from './status';
import BadRequestError from '../../../application/exceptions/BadRequestError';
import ConflictError from '../../../application/exceptions/ConflictError';
import ForbiddenError from '../../../application/exceptions/ForbiddenError';
import NotFoundError from '../../../application/exceptions/NotFoundError';
import UnauthorizedError from '../../../application/exceptions/UnauthorizedError';

const makeResponse = (statusCode, typeString) => (res, msg = false) =>
  res.status(statusCode).send({
    message: msg ? `${typeString}: ${msg}` : `${typeString}!`,
  });

const badRequest = makeResponse(statusCodes.badRequest, 'Bad request');
const conflict = makeResponse(statusCodes.conflict, 'Conflict');
const notFound = makeResponse(statusCodes.notFound, 'Not found');
const forbidden = makeResponse(statusCodes.forbidden, 'Forbidden');
const methodNotAllowed = makeResponse(
  statusCodes.methodNotAllowed,
  'Method not allowed'
);
const unauthorized = makeResponse(statusCodes.unauthorized, 'Unauthorized');

const unknownError = (res, err) =>
  res.status(statusCodes.internalServerError).send({
    message: `Internal Server Error: ${err.message}`,
  });

const catchErrorAndRespond = (res) => (err) => {
  if (err instanceof BadRequestError) {
    badRequest(res, err.message);
  } else if (err instanceof ConflictError) {
    conflict(res, err.message);
  } else if (err instanceof ForbiddenError) {
    forbidden(res, err.message);
  } else if (err instanceof NotFoundError) {
    notFound(res, err.message);
  } else if (err instanceof UnauthorizedError) {
    unauthorized(res, err.message);
  } else {
    unknownError(res, err);
  }
};

export {
  catchErrorAndRespond,
  badRequest,
  forbidden,
  methodNotAllowed,
  notFound,
  unauthorized,
  unknownError,
};
