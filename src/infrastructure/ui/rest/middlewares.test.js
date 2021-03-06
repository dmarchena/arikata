import express from 'express';
import supertest from 'supertest';
import statusCodes from './status';
import { applyBaseMiddlewares, verifyToken, isAdmin } from './middlewares';
import webtoken from '../../webtoken';

describe('verifyToken', () => {
  const server = applyBaseMiddlewares(express());
  server.get('/', [verifyToken], (req, res) =>
    res.status(statusCodes.ok).send()
  );
  const request = supertest(server);

  describe('when user is logged in', () => {
    it('should return a successful status', async () => {
      expect.assertions(1);
      const res = await request
        .get('/')
        .set('x-access-token', webtoken.signWithPayload(mockUserAdmin()));
      expect(res.statusCode).toBe(statusCodes.ok);
    });
  });

  describe('when user is not logged in', () => {
    it('should return an unauthorized status', async () => {
      expect.assertions(1);
      const res = await request.get('/');
      expect(res.statusCode).toBe(statusCodes.unauthorized);
    });
  });

  describe('when non valid token is provided', () => {
    it('should return an unauthorized status', async () => {
      expect.assertions(1);
      const res = await request
        .get('/')
        .set('x-access-token', mockExpiredToken());
      expect(res.statusCode).toBe(statusCodes.unauthorized);
    });
  });
});

describe('isAdmin', () => {
  const server = applyBaseMiddlewares(express());
  server.get('/', [verifyToken, isAdmin], (req, res) =>
    res.status(statusCodes.ok).send()
  );
  const request = supertest(server);

  describe('when admin is logged in', () => {
    it('should return a successful status', async () => {
      expect.assertions(1);
      const res = await request
        .get('/')
        .set('x-access-token', webtoken.signWithPayload(mockUserAdmin()));
      expect(res.statusCode).toBe(statusCodes.ok);
    });
  });

  describe('when a non admin is logged in', () => {
    it('should return a forbidden status', async () => {
      expect.assertions(1);
      const res = await request
        .get('/')
        .set('x-access-token', webtoken.signWithPayload(mockUser()));
      expect(res.statusCode).toBe(statusCodes.forbidden);
    });
  });
});
