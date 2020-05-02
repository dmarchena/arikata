import createBrowseService from './browseService';

describe('browseService', () => {
  describe('factory', () => {
    it('should return a service', () => {
      expect.assertions(1);
      expect(createBrowseService({})).toBeApplicationService();
    });
  });
});
