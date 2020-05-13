import apiRepo from './api/kata';
import dbRepo from './db/kata';

describe.each([
  [{ type: 'api', repo: apiRepo }],
  [{ type: 'db', repo: dbRepo }],
])('KataRepo (global)', ({ type, repo }) => {
  describe(`${type}`, () => {
    it('should be a Kata repository', () => {
      expect.assertions(1);
      expect(repo).toBeKataRepo();
    });
  });
});
