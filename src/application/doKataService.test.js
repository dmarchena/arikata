import createDoKataService from './doKataService';

describe('doKataService', () => {
  describe('factory', () => {
    it('should return a service', () => {
      expect.assertions(1);
      expect(createDoKataService({})).toBeApplicationService();
    });
  });
});
