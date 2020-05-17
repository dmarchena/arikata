import express from 'express';

import { hasReceivedQueryStringParam } from './param-validation';
import app from './application';
import statusCodes from './status';

import config from '../../../config.json';
import { verifyToken } from './middlewares';

const katasRouter = express.Router();

katasRouter.get('/', (req, res) => {
  if (hasReceivedQueryStringParam('tag', req)) {
    app.browseService
      .getAllKatasWithTag(req.query.tag)
      .then((data) => res.status(statusCodes.ok).json(data));
  } else {
    app.browseService
      .getAllKatas()
      .then((data) => res.status(statusCodes.ok).json(data));
  }
});

katasRouter.delete('/:id', [verifyToken], (req, res) => {
  app.manageKataService
    .remove(req.params.id)
    .then((data) => res.status(statusCodes.deleted).json(data));
});

katasRouter.get('/:id', (req, res) => {
  app.browseService
    .getKataWithId(req.params.id)
    .then((data) => res.status(statusCodes.ok).json(data));
});

katasRouter.put('/:id', [verifyToken], (req, res) => {
  app.manageKataService
    .update({
      ...req.body,
      id: req.params.id,
    })
    .then((data) => res.status(statusCodes.ok).json(data));
});

katasRouter.post('/', [verifyToken], (req, res) => {
  app.manageKataService
    .save(req.body)
    .then((data) =>
      res
        .status(statusCodes.created)
        .set('Location', `${config.location.origin}/katas/${req.body.id}`)
        .json(data)
    );
});

katasRouter.get('/tags', (req, res) => {
  app.manageKataService
    .getAllTags()
    .then((data) => res.status(statusCodes.ok).json(data));
});

export default katasRouter;
