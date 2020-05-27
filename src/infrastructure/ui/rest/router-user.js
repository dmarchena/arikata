import express from 'express';

import app from './application';
import statusCodes from './status';
import webtoken from '../../webtoken';
import { verifyToken } from './middlewares';
import { catchErrorAndRespond, forbidden } from './responses';

const authRouter = express.Router();

authRouter.post('/signin', (req, res) => {
  const { email, password } = req.body;
  app.userService
    .signIn(email, password)
    .then((data) =>
      res.status(statusCodes.ok).json({
        ...data,
        accessToken: webtoken.signWithPayload(data),
      })
    )
    .catch(catchErrorAndRespond(res));
});

// eslint-disable-next-line consistent-return
authRouter.post('/signup', (req, res) => {
  const { email, password } = req.body;
  return app.userService
    .signUp(email, password)
    .then((data) => {
      res.status(statusCodes.created).json({
        ...data,
        accessToken: webtoken.signWithPayload(data),
      });
    })
    .catch(catchErrorAndRespond(res));
});

authRouter.put('/:id', [verifyToken], (req, res) => {
  if (req.user?.id !== req.params.id) {
    return forbidden(res, 'You cannot modify another user information.');
  }
  const { email, password } = req.body;
  return app.userService
    .changePassword(email, password)
    .then((userRes) => res.status(statusCodes.ok).json(userRes))
    .catch(catchErrorAndRespond(res));
});

export default authRouter;
