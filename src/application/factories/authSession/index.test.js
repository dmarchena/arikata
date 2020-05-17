import createAuthSession from './index';

const mockStorage = {
  user: null,
  getUser() {
    return this.user;
  },
  setUser(user) {
    this.user = user;
  },
  removeUser() {
    this.user = null;
  },
};

const authSession = createAuthSession(mockStorage);
const token = mockExpiredToken();

describe('authSession', () => {
  describe('when saving failed authentication', () => {
    it.each([[{}], [mockUser()]])('should not save', (user) => {
      expect.hasAssertions();
      authSession.saveAuthentication(user);
      expect(mockStorage.user).toBeNull();
    });
  });

  describe('when saving successful authentication', () => {
    it('should save to storage', () => {
      expect.hasAssertions();
      const user = mockUser(token);
      authSession.saveAuthentication(user);
      expect(mockStorage.user).toStrictEqual(user);
      expect(authSession.isAuthenticated()).toBe(true);
    });
  });

  describe('when logging out', () => {
    it('should remove session from local storage', () => {
      expect.hasAssertions();
      authSession.discardAuthentication();
      expect(mockStorage.user).toBeNull();
      expect(authSession.isAuthenticated()).toBe(false);
    });
  });

  describe('when getting current authentication', () => {
    it('should get session data it if user is signed in', () => {
      expect.hasAssertions();
      const user = mockUser(token);
      authSession.saveAuthentication(user);
      const result = authSession.getAuthentication();
      expect(result).toBeObject();
      expect(result.email).toBe(user.email);
      expect(result.accessToken).toBe(token);
    });

    it('should get null if user is not signed in', () => {
      expect.hasAssertions();
      authSession.discardAuthentication();
      const result = authSession.getAuthentication();
      expect(result).toBeNull();
    });
  });
});
