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
  patch: requestMethod('patch'),
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

  describe('when updating a training', () => {
    const signedInUser = mockUser();

    it('should not be allowed to replace the full training', async () => {
      expect.hasAssertions();
      const res = await request.put(`/${dto.id}`, signedInUser).send(dto);
      expect(res.statusCode).toBe(statusCodes.methodNotAllowed);
    });

    it('should return a forbidden state it signed user is not the owner', async () => {
      expect.hasAssertions();
      const res = await request.patch(`/${dto.id}`, mockUserAdmin()).send(dto);
      expect(res.statusCode).toBe(statusCodes.forbidden);
    });

    it('should update the code and success state', async () => {
      expect.hasAssertions();
      const res = await request.patch(`/${dto.id}`, signedInUser).send(dto);
      expect(res.statusCode).toBe(statusCodes.ok);
    });
  });

  describe('get all trainings of the signed in user', () => {
    const trainingUrl = '/';

    it('should return an unauthorized status if no user is signed in', async () => {
      expect.hasAssertions();
      const res = await request.get(trainingUrl);
      expect(res.statusCode).toBe(statusCodes.unauthorized);
    });

    it('should return a list of training DTOs', async () => {
      expect.hasAssertions();
      const res = await request.get(trainingUrl, mockUser());
      expect(res.statusCode).toBe(statusCodes.ok);
      expect(res.body).toBeArray();
      expect(res.body[0]).toBeTrainingDto();
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
