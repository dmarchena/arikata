import supertest from 'supertest';
import express from 'express';
import router from './router';
import application from './application';

jest.mock('./application');

const server = express();
server.use(router);
const request = supertest(server);

describe('api rest endpoints', () => {
  it.each([['/katas/'], ['/katas/?tag=sample-tag']])(
    'should provide endpoint: %s',
    (url) => {
      return request
        .get(url)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((response) => expect(response.body).toBeArray());
    }
  );

  describe('save new kata', () => {
    let mockData;
    let res;
    let spy;

    // eslint-disable-next-line jest/no-hooks
    beforeEach(async () => {
      mockData = mockKataData();
      spy = jest.spyOn(application.manageKataService, 'save');
      res = await request
        .post('/katas/')
        .send(mockData)
        .set('Accept', 'application/json');
    });

    // eslint-disable-next-line jest/no-hooks
    afterEach(() => {
      spy.mockRestore();
    });

    it('should parse and receive kata data', () => {
      expect.hasAssertions();
      expect(spy).toHaveBeenNthCalledWith(1, mockData);
    });

    it('should save', () => {
      expect.hasAssertions();
      expect(res.body).toBeKataDto();
      expect(res.statusCode).toStrictEqual(201);
    });
  });
  describe('update an existing kata', () => {
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
      res = await request
        .put(`/katas/${mockKata.id}`)
        .send(mockData)
        .set('Accept', 'application/json');
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
});
