import express from 'express';

import app from './application';
import statusCodes from './status';
import webtoken from '../../webtoken';
import { verifyToken } from './middlewares';
import { badRequest, forbidden, notFound, unauthorized } from './responses';
import NotFoundError from '../../../application/exceptions/NotFoundError';

const authRouter = express.Router();

authRouter.post('/signin', (req, res) => {
  const { email, password } = req.body;
  app.userService
    .signIn(email, password)
    .then((data) => {
      if (data !== null) {
        return res.status(statusCodes.ok).json({
          ...data,
          accessToken: webtoken.signWithPayload(data),
        });
      }
      return unauthorized(res);
    })
    .catch((err) => unauthorized(res, err.message));
});

// eslint-disable-next-line consistent-return
authRouter.post('/signup', (req, res) => {
  const { email, password } = req.body;
  return app.userService
    .signUp(email, password)
    .then((data) => {
      if (data !== null) {
        return res.status(statusCodes.created).json({
          ...data,
          accessToken: webtoken.signWithPayload(data),
        });
      }
      return badRequest(res);
    })
    .catch((err) => badRequest(res, err?.message));
});

authRouter.put('/:id', [verifyToken], (req, res) => {
  if (req.user?.id !== req.params.id) {
    return res.status(statusCodes.forbidden).json(null);
  }
  const { email, password } = req.body;
  return app.userService
    .changePassword(email, password)
    .then((userRes) => res.status(statusCodes.ok).json(userRes))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        return notFound(res, err.message);
      }
      return forbidden(res, err.message);
    });
});

export default authRouter;
