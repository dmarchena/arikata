import express from 'express';
import app from './application';

const katasRouter = express.Router();

katasRouter.get('/katas', (req, res) => {
  app.browseService.getAll().then((data) => res.json(data));
});

katasRouter.get('/katas/:tag', (req, res) => {
  app.browseService
    .getAllKatasWithTag(req.params.tag)
    .then((data) => res.json(data));
});

export default katasRouter;
