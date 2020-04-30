import createBrowseService from './browseService';
import kataRepo from '../infrastructure/repos/__mocks__/kata';

describe('browseService', () => {
  describe('factory', () => {
    it('should return a service', () => {
      expect.assertions(1);
      expect(createBrowseService({ kataRepo })).toBeApplicationService();
    });
  });
});
