import express from 'express';
import bodyParser from 'body-parser';
import app from './application';
import { hasReceivedQueryStringParam } from './param-validation';
import config from '../../../config.json';

const katasRouter = express.Router();

const statusCodes = {
  ok: 200, // Returned by a successful GET or DELETE operation with content. PUT or POST can also use this, if the service does not want to return a resource back to the client after creation or modification.
  created: 201, // Response for a successful resource creation by a POST request.
  deleted: 204, // Response for a successful DELETE with an empty body.
  badRequest: 400, // When an HTTP request body can’t be parsed. For example, if an API is expecting a body in a JSON format for a POST request, but the body of the request is malformed.
  unauthorized: 401, // Authentication is unsuccessful (or credentials have not been provided) while accessing the API.
  forbidden: 403, // If a user is not Authorized to perform an action although authentication information is correct.
  notFound: 404, // If the requested resource is not available on the server.
  methodNotAllowed: 405, // If the user is trying to violate an API contract, for example, trying to update a resource by using a POST method.
};

// Configuring body parser middleware
katasRouter.use(bodyParser.urlencoded({ extended: false }));
katasRouter.use(bodyParser.json());

katasRouter.get('/katas', (req, res) => {
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

katasRouter.delete('/katas/:id', (req, res) => {
  app.manageKataService
    .remove(req.params.id)
    .then((data) => res.status(statusCodes.deleted).json(data));
});

katasRouter.get('/katas/:id', (req, res) => {
  app.browseService
    .getKataWithId(req.params.id)
    .then((data) => res.status(statusCodes.ok).json(data));
});

katasRouter.put('/katas/:id', (req, res) => {
  app.manageKataService
    .update({
      ...req.body,
      id: req.params.id,
    })
    .then((data) => res.status(statusCodes.ok).json(data));
});

katasRouter.post('/katas', (req, res) => {
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
