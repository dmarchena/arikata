import express from 'express';

import app from './application';
import statusCodes from './status';
import { verifyToken } from './middlewares';
import { forbidden, notFound, unknownError } from './responses';
import PermissionDeniedError from '../../../application/exceptions/PermissionDeniedError';
import NotFoundError from '../../../application/exceptions/NotFoundError';

const trainingRouter = express.Router();

trainingRouter.get('/:id', [verifyToken], (req, res) => {
  const trainingId = req.params.id;
  return app.doKataService
    .getTrainingWithId(trainingId)
    .then((data) => {
      if (data.userId !== req.user.id) {
        throw new PermissionDeniedError(
          'You cannot get a training of another user.'
        );
      }
      return data;
    })
    .then((data) => res.status(statusCodes.ok).json(data))
    .catch((err) => {
      if (err instanceof PermissionDeniedError) {
        return forbidden(res, err.message);
      }
      if (err instanceof NotFoundError) {
        return notFound(res, err.message);
      }
      return unknownError(res, err);
    });
});

trainingRouter.post('/', [verifyToken], (req, res) => {
  if (
    req.body.userId &&
    req.body.userId !== '' &&
    req.body.userId !== req.user?.id
  ) {
    return forbidden(res, 'You cannot save a training for different user');
  }
  return app.doKataService
    .saveTraining(req.body)
    .then((data) => res.status(statusCodes.created).json(data))
    .catch((err) => unknownError(res, err));
});

export default trainingRouter;
