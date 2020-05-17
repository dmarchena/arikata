import mockAxios from 'jest-mock-axios';

import userRepo from './user';

describe('userRepo (api)', () => {
  const user = mockUser();
  // Empty auth headers cause it a fake login
  const authHeaders = {
    headers: {},
  };

  describe('when login', () => {
    it('should POST to "signin" endpoint of the api', () => {
      expect.hasAssertions();
      userRepo.login(user);
      expect(mockAxios.post).toHaveBeenCalledWith('/api/user/signin', user);
    });
  });

  describe('when registering a new user', () => {
    it('should POST to "signup" endpoint of the api', () => {
      expect.hasAssertions();
      userRepo.save(user);
      expect(mockAxios.post).toHaveBeenCalledWith('/api/user/signup', user);
    });
  });

  describe('when updating user info', () => {
    it('should PUT to "user" endpoint of the api', () => {
      expect.hasAssertions();
      userRepo.update(user);
      const userData = {
        email: user.email,
        password: user.password,
      };
      expect(mockAxios.put).toHaveBeenCalledWith(
        `/api/user/${user.id}`,
        userData,
        authHeaders
      );
    });
  });
});
