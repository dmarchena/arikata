import express from 'express';

import { hasReceivedQueryStringParam } from './param-validation';
import app from './application';
import statusCodes from './status';

import config from '../../../config.json';
import { verifyToken, isAdmin } from './middlewares';
import { unknownError, forbidden, notFound } from './responses';
import PermissionDeniedError from '../../../application/exceptions/PermissionDeniedError';
import NotFoundError from '../../../application/exceptions/NotFoundError';

const katasRouter = express.Router();

const catchTrainingError = (res) => (err) => {
  if (err instanceof PermissionDeniedError) {
    return forbidden(res, err.message);
  }
  if (err instanceof NotFoundError) {
    return notFound(res, err.message);
  }
  return unknownError(res, err);
};

katasRouter.get('/tags', (req, res) => {
  app.manageKataService
    .getAllTags()
    .then((data) => res.status(statusCodes.ok).json(data))
    .catch(catchTrainingError(res));
});

katasRouter.get('/', (req, res) => {
  if (hasReceivedQueryStringParam('tag', req)) {
    app.browseService
      .getAllKatasWithTag(req.query.tag)
      .then((data) => res.status(statusCodes.ok).json(data))
      .catch(catchTrainingError(res));
  } else {
    app.browseService
      .getAllKatas()
      .then((data) => res.status(statusCodes.ok).json(data))
      .catch(catchTrainingError(res));
  }
});

katasRouter.post('/', [verifyToken, isAdmin], (req, res) => {
  app.manageKataService
    .save(req.body)
    .then((data) =>
      res
        .status(statusCodes.created)
        .set('Location', `${config.location.origin}/katas/${req.body.id}`)
        .json(data)
    )
    .catch(catchTrainingError(res));
});

katasRouter.delete('/:id', [verifyToken, isAdmin], (req, res) => {
  app.manageKataService
    .remove(req.params.id)
    .then((data) => res.status(statusCodes.deleted).json(data))
    .catch(catchTrainingError(res));
});

katasRouter.get('/:id', (req, res) => {
  app.browseService
    .getKataWithId(req.params.id)
    .then((data) => res.status(statusCodes.ok).json(data))
    .catch(catchTrainingError(res));
});

katasRouter.put('/:id', [verifyToken, isAdmin], (req, res) => {
  app.manageKataService
    .update({
      ...req.body,
      id: req.params.id,
    })
    .then((data) => res.status(statusCodes.ok).json(data))
    .catch(catchTrainingError(res));
});

export default katasRouter;
