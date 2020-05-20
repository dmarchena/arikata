import express from 'express';
import supertest from 'supertest';

import { applyBaseMiddlewares } from './middlewares';
import router from './router-user';
import webtoken from '../../webtoken';
import statusCodes from './status';

jest.mock('./application');

const server = applyBaseMiddlewares(express());
server.use(router);

const requestMethod = (method) => (url, user = false) => {
  const req = supertest(server)[method](url).set('Accept', 'application/json');
  if (user) {
    const token = webtoken.signWithPayload(user);
    req.set('x-access-token', token);
  }
  return req;
};

const request = {
  get: requestMethod('get'),
  post: requestMethod('post'),
  put: requestMethod('put'),
  delete: requestMethod('delete'),
};

describe('api auth endpoints', () => {
  const user = mockUser();

  describe('when trying to sign in with wrong pass', () => {
    it('should return an unauthorized status', async () => {
      expect.assertions(2);
      const res = await request.post('/signin').send({
        email: user.email,
        password: '1234',
      });
      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBeString();
    });
  });

  describe('when signing in', () => {
    const resPromise = request.post('/signin').send({
      email: user.email,
      password: user.password,
    });

    it('should return a successful status', async () => {
      expect.assertions(1);
      const res = await resPromise;
      expect(res.statusCode).toBe(200);
    });

    it('should return the user data', async () => {
      expect.assertions(1);
      const res = await resPromise;
      expect(res.body).toBeUserDto();
    });

    it('should return a valid access token', async () => {
      expect.assertions(3);
      const res = await resPromise;
      const token = res.body.accessToken;
      expect(token).toBeString();
      const decodedToken = webtoken.verifyToken(token);
      expect(decodedToken).toBeObject();
      expect(decodedToken.email).toBe(user.email);
    });
  });

  describe('when signing up', () => {
    const resPromise = request.post('/signup').send({
      email: user.email,
      password: user.password,
    });

    it('should return a successful status', async () => {
      expect.assertions(1);
      const res = await resPromise;
      expect(res.statusCode).toBe(201);
    });

    it('should return the brand new user data', async () => {
      expect.assertions(1);
      const res = await resPromise;
      expect(res.body).toBeUserDto();
    });

    it('should return a valid access token', async () => {
      expect.assertions(3);
      const res = await resPromise;
      const token = res.body.accessToken;
      expect(token).toBeString();
      const decodedToken = webtoken.verifyToken(token);
      expect(decodedToken).toBeObject();
      expect(decodedToken.email).toBe(user.email);
    });
  });

  describe('when trying to signing up with malformed data', () => {
    it('should return a bad request status', async () => {
      expect.assertions(2);
      const res = await request.post('/signup').send({
        email: 'badmail',
        password: user.password,
      });
      expect(res.statusCode).toBe(statusCodes.badRequest);
      expect(res.body.message).toBeString();
    });
  });

  describe('when changing the password', () => {
    const newPass = 'nEwPaSsWoRd';
    const apiRequest = (loggedUser = false) =>
      request.put(`/${user.id}`, loggedUser).send({
        ...user,
        password: newPass,
      });

    it('should return an unauthorized status if it is not logged', async () => {
      expect.assertions(1);
      const res = await apiRequest();
      expect(res.statusCode).toBe(statusCodes.unauthorized);
    });

    it('should return a forbidden status if it is logged with another user', async () => {
      expect.assertions(1);
      const res = await apiRequest(mockUserAdmin());
      expect(res.statusCode).toBe(statusCodes.forbidden);
    });

    it('should return the modified user data', async () => {
      expect.assertions(2);
      const res = await apiRequest(user);
      expect(res.body).toBeUserDto();
      expect(res.body.email).toBe(user.email);
    });
  });
});
