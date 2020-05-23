import express from 'express';
import supertest from 'supertest';

import { v4 } from 'uuid';
import { applyBaseMiddlewares } from './middlewares';
import router from './router-training';
import statusCodes from './status';
import webtoken from '../../webtoken';

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

describe('api training endpoints', () => {
  const dto = mockTrainingDto();

  describe('when trying to saving a new training without auth', () => {
    it('should return an unauthorized status', async () => {
      expect.hasAssertions();
      const res = await request.post('/').send(dto);
      expect(res.statusCode).toBe(statusCodes.unauthorized);
      expect(res.body.message).toBeString();
    });
  });

  describe('when trying to saving a new training for another user', () => {
    it('should return a forbidden status', async () => {
      expect.hasAssertions();
      const res = await request.post('/', mockUserAdmin()).send(dto);
      expect(res.statusCode).toBe(statusCodes.forbidden);
      expect(res.body.message).toBeString();
    });
  });

  describe('when saving a training', () => {
    const signedInUser = mockUser();
    const resPromise = request.post('/', signedInUser).send(dto);

    it('should return a successful status', async () => {
      expect.hasAssertions();
      const res = await resPromise;
      expect(res.statusCode).toBe(statusCodes.created);
    });
  });

  describe('get a training', () => {
    const training = mockTrainingDto();
    const trainingUrl = `/${training.id}`;

    describe('when getting without auth', () => {
      it('should return an unauthorized status', async () => {
        expect.hasAssertions();
        const res = await request.get(trainingUrl);
        expect(res.statusCode).toBe(statusCodes.unauthorized);
      });
    });

    describe('when getting a training of another user', () => {
      it('should return a forbidden status', async () => {
        expect.hasAssertions();
        const res = await request.get(trainingUrl, mockUserAdmin());
        expect(res.statusCode).toBe(statusCodes.forbidden);
        expect(res.body.message).toBeString();
      });
    });

    describe('when getting a training that does not exists', () => {
      it('should return a not found', async () => {
        expect.hasAssertions();
        const res = await request.get(`/${v4}`, mockUser());
        expect(res.statusCode).toBe(statusCodes.notFound);
      });
    });

    describe('when getting a training', () => {
      it('should return a training DTO', async () => {
        expect.hasAssertions();
        const res = await request.get(trainingUrl, mockUser());
        expect(res.statusCode).toBe(statusCodes.ok);
        expect(res.body).toBeTrainingDto();
      });
    });
  });
});
