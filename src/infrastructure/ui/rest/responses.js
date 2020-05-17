import statusCodes from './status';

const forbidden = (res, msg = false) =>
  res.status(statusCodes.forbidden).send({
    message: msg ? `Forbidden: ${msg}` : 'Forbidden!',
  });

const unauthorized = (res, msg = false) =>
  res.status(statusCodes.unauthorized).send({
    message: msg ? `Unauthorized: ${msg}` : 'Unauthorized!',
  });

export { forbidden, unauthorized };
