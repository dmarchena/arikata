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

export default statusCodes;
