import supertest from 'supertest';
import router from './router';
import express from 'express';
jest.mock('./application');

const server = express();
server.use(router);
const request = supertest(server);

describe('API Rest endpoints', () => {
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
});
