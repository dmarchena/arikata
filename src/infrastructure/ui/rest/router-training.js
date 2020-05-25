import express from 'express';

import app from './application';
import statusCodes from './status';
import { verifyToken } from './middlewares';
import { forbidden, methodNotAllowed, catchErrorAndRespond } from './responses';
import ForbiddenError from '../../../application/exceptions/ForbiddenError';

const trainingRouter = express.Router();

const verifyTrainingUser = (req) => (data) => {
  if (data.userId !== req.user.id) {
    throw new ForbiddenError(
      `You cannot access to a training of another user.`
    );
  }
  return data;
};

trainingRouter.get('/', [verifyToken], (req, res) => {
  return app.browseService
    .getAllKatasDoneByUser(req.user.id)
    .then((data) => res.status(statusCodes.ok).json(data))
    .catch(catchErrorAndRespond(res));
});

trainingRouter.post('/', [verifyToken], (req, res) => {
  if (req.body.userId !== req.user.id) {
    return forbidden(res, 'You cannot save a training for different user');
  }
  return app.doKataService
    .saveTraining(req.body)
    .then((data) => res.status(statusCodes.created).json(data))
    .catch(catchErrorAndRespond(res));
});

trainingRouter.get('/:id', [verifyToken], (req, res) => {
  const trainingId = req.params.id;
  return app.doKataService
    .getTrainingWithId(trainingId)
    .then(verifyTrainingUser(req))
    .then((data) => res.status(statusCodes.ok).json(data))
    .catch(catchErrorAndRespond(res));
});

trainingRouter.patch('/:id', [verifyToken], (req, res) => {
  const trainingId = req.params.id;
  const { code, success } = req.body;
  return app.doKataService
    .updateTraining(trainingId, code, success, req.user.id)
    .then(verifyTrainingUser(req))
    .then((data) => res.status(statusCodes.ok).json(data))
    .catch(catchErrorAndRespond(res));
});

trainingRouter.put('/:id', (_, res) => methodNotAllowed(res));

export default trainingRouter;
