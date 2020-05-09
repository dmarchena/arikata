import createManageKataService from './manageKataService';

describe('manageKataService', () => {
  describe('factory', () => {
    it('should return a service', () => {
      expect.assertions(1);
      expect(createManageKataService({})).toBeApplicationService();
    });
  });
});
