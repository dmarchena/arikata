import dbRepo from './user';

jest.mock('../../db');

describe('userRepo (db)', () => {
  describe('when trying to sign in with wrong pass', () => {
    it('should no return any user', async () => {
      expect.assertions(1);
      const input = mockUser();
      input.password = 'wRonGpAss';
      const result = await dbRepo.login(input);
      expect(result).toBeNull();
    });
  });

  describe('when signing in', () => {
    it('should return the user', async () => {
      expect.assertions(2);
      const input = mockUser();
      const result = await dbRepo.login(input);
      expect(result).toBeUserDto();
      expect(result.email).toBe(input.email);
    });
  });

  describe('when signing up', () => {
    it('should return the brand new user data', async () => {
      expect.assertions(2);
      const input = mockUser();
      const result = await dbRepo.save(input);
      expect(result).toBeUserDto();
      expect(result.email).toBe(input.email);
    });
  });

  describe('when changing the password', () => {
    // Not supported by sequelize mock
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('should return the new user data', async () => {
      expect.assertions(1);
      const input = mockUser();
      input.password = 'newPaSSwoRd';
      const result = await dbRepo.update(input);
      expect(result).toBeUserDto();
      expect(result.email).toBe(input.email);
    });
  });
});
