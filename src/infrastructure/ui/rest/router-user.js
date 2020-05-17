import express from 'express';

import app from './application';
import statusCodes from './status';
import webtoken from '../../webtoken';
import { verifyToken } from './middlewares';

const authRouter = express.Router();

authRouter.post('/signin', (req, res) => {
  const { email, password } = req.body;
  app.userService.signin(email, password).then((data) => {
    if (data !== null) {
      return res.status(statusCodes.ok).json({
        ...data,
        accessToken: webtoken.signWithPayload(data),
      });
    }
    return res.status(statusCodes.unauthorized).json(null);
  });
});

// eslint-disable-next-line consistent-return
authRouter.post('/signup', (req, res) => {
  const { email, password } = req.body;
  try {
    app.userService.signup(email, password).then((data) => {
      if (data !== null) {
        return res.status(statusCodes.created).json({
          ...data,
          accessToken: webtoken.signWithPayload(data),
        });
      }
      return res.status(statusCodes.badRequest).json(null);
    });
  } catch (e) {
    if (e instanceof TypeError) {
      return res.status(statusCodes.badRequest).json(null);
    }
  }
});

authRouter.put('/:id', [verifyToken], async (req, res) => {
  if (req.user?.id !== req.params.id) {
    return res.status(statusCodes.forbidden).json(null);
  }
  const { email, password } = req.body;
  const userRes = await app.userService.changePassword(email, password);
  if (userRes !== null) {
    return res.status(statusCodes.ok).json(userRes);
  }
  return res.status(statusCodes.notFound).json(null);
});

export default authRouter;
