import express from 'express';
import status from 'statuses';
import bodyParser from 'body-parser';
import app from './application';

const katasRouter = express.Router();

// Configuring body parser middleware
katasRouter.use(bodyParser.urlencoded({ extended: false }));
katasRouter.use(bodyParser.json());

katasRouter.get('/katas', (req, res) => {
  app.browseService.getAll().then((data) => res.json(data));
});

katasRouter.post('/katas', (req, res) => {
  app.manageKataService
    .save(req.body)
    .then((data) => res.status(status('ok')).json(data));
});

katasRouter.get('/katas/:tag', (req, res) => {
  app.browseService
    .getAllKatasWithTag(req.params.tag)
    .then((data) => res.json(data));
});

export default katasRouter;
