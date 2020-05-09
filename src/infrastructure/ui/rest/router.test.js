import supertest from 'supertest';
import express from 'express';
import router from './router';
import application from './application';

jest.mock('./application');

const server = express();
server.use(router);
const request = supertest(server);

describe('api rest endpoints', () => {
  it.each([['/katas/'], ['/katas/sample-tag']])(
    'should provide endpoint: %s',
    (url) => {
      return request
        .get(url)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => expect(response.body).toBeArray());
    }
  );

  describe('save kata', () => {
    let mockData;
    let res;
    let spy;

    // eslint-disable-next-line jest/no-hooks
    beforeEach(async () => {
      mockData = mockKataDto();
      delete mockData.id;
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
      expect(res.statusCode).toStrictEqual(200);
    });
  });
});
