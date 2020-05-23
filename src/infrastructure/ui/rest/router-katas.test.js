import express from 'express';
import supertest from 'supertest';

import application from './application';
import { applyBaseMiddlewares } from './middlewares';
import router from './router-katas';
import webtoken from '../../webtoken';
import statusCodes from './status';

jest.mock('./application');

const server = applyBaseMiddlewares(express());
server.use(router);

const requestBase = supertest(server);
const request = (method) => (url, auth = false) => {
  const req = requestBase[method](url).set('Accept', 'application/json');
  if (auth) {
    const token = webtoken.signWithPayload(mockUserAdmin());
    req.set('x-access-token', token);
  }
  return req;
};
const requestGet = request('get');
const requestPost = request('post');
const requestPut = request('put');
const requestDelete = request('delete');

describe('api rest endpoints', () => {
  it.each([['/'], ['/?tag=sample-tag']])(
    'should provide endpoint: %s',
    (url) => {
      return requestGet(url)
        .expect(200)
        .expect('Content-Type', /json/)
        .then((response) => expect(response.body).toBeArray());
    }
  );

  describe('when saving new kata', () => {
    let mockData;
    let res;
    let spy;

    // eslint-disable-next-line jest/no-hooks
    beforeEach(async () => {
      mockData = mockKataData();
      spy = jest.spyOn(application.manageKataService, 'save');
      res = await requestPost('/', true).send(mockData);
    });

    // eslint-disable-next-line jest/no-hooks
    afterEach(() => {
      spy.mockRestore();
    });

    it('should return a successful status', () => {
      expect.assertions(1);
      expect(res.statusCode).toStrictEqual(201);
    });

    it('should parse and receive kata data', () => {
      expect.hasAssertions();
      expect(spy).toHaveBeenNthCalledWith(1, mockData);
    });

    it('should return data of saved kata', () => {
      expect.hasAssertions();
      expect(res.body).toBeKataDto();
    });
  });

  describe('when updating an existing kata', () => {
    let mockData;
    let mockKata;
    let res;
    let spyUpdate;

    // eslint-disable-next-line jest/no-hooks
    beforeEach(async () => {
      mockKata = mockKataDto();
      mockData = {
        ...mockKata,
        details: 'modified details',
        id: undefined,
      };
      spyUpdate = jest.spyOn(application.manageKataService, 'update');
      res = await requestPut(`/${mockKata.id}`, true).send(mockData);
    });

    // eslint-disable-next-line jest/no-hooks
    afterEach(() => {
      spyUpdate.mockRestore();
    });

    it('should parse and receive kata data', () => {
      expect.hasAssertions();
      expect(spyUpdate).toHaveBeenNthCalledWith(1, {
        ...mockData,
        id: mockKata.id,
      });
    });

    it('should update', () => {
      expect.hasAssertions();
      expect(res.body).not.toStrictEqual(mockKata);
      expect(res.body).toStrictEqual({
        ...mockData,
        id: mockKata.id,
      });
      expect(res.statusCode).toStrictEqual(200);
    });
  });

  describe('when deleting an existing kata', () => {
    let mockKata;
    let res;
    let spyDelete;

    // eslint-disable-next-line jest/no-hooks
    beforeEach(async () => {
      mockKata = mockKataEntity();
      spyDelete = jest.spyOn(application.manageKataService, 'remove');
      res = await requestDelete(`/${mockKata.id}`, true);
    });

    // eslint-disable-next-line jest/no-hooks
    afterEach(() => {
      spyDelete.mockRestore();
    });

    it('should parse and receive kata data', () => {
      expect.hasAssertions();
      expect(spyDelete).toHaveBeenNthCalledWith(1, mockKata.id);
    });

    it('should delete', () => {
      expect.hasAssertions();
      expect(res.body).not.toStrictEqual(mockKata);
      expect(res.statusCode).toStrictEqual(statusCodes.deleted);
    });
  });
});
