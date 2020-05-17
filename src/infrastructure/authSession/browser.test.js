import browserAuthSession from './browser';

describe('authSession: browser', () => {
  describe('when saving failed authentication', () => {
    it.each([[{}], [mockUser()]])('should not save to localStorage', (user) => {
      expect.hasAssertions();
      browserAuthSession.saveAuthentication(user);
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });
  });

  describe('when saving successful authentication', () => {
    it('should save to localStorage', () => {
      expect.hasAssertions();
      const token = mockExpiredToken();
      const user = mockUser(token);
      browserAuthSession.saveAuthentication(user);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
  });

  describe('when logging out', () => {
    it('should remove session from local storage', () => {
      expect.hasAssertions();
      browserAuthSession.discardAuthentication();
      expect(localStorage.removeItem).toHaveBeenCalledWith('user');
    });
  });

  describe('when getting current authentication', () => {
    it('should get session data it if user is signed in', () => {
      expect.hasAssertions();
      const token = mockExpiredToken();
      const user = mockUser(token);
      browserAuthSession.saveAuthentication(user);
      const result = browserAuthSession.getAuthentication();
      expect(localStorage.getItem).toHaveBeenCalledWith('user');
      expect(result).toBeObject();
      expect(result.email).toBe(user.email);
      expect(result.accessToken).toBe(token);
    });

    it('should get null if user is not signed in', () => {
      expect.hasAssertions();
      browserAuthSession.discardAuthentication();
      const result = browserAuthSession.getAuthentication();
      expect(result).toBeNull();
    });
  });
});
