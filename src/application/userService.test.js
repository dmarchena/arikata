import createUserService from './userService';

describe('userService', () => {
  describe('factory', () => {
    it('should return a service', () => {
      expect.assertions(1);
      expect(createUserService({})).toBeApplicationService();
    });
  });
});
