import { createAuthSessionForStorage } from './index';

const mockStorage = () => ({
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
});

const token = mockExpiredToken();

describe('authSession', () => {
  describe('when saving failed authentication', () => {
    const storage = mockStorage();
    const authSession = createAuthSessionForStorage(storage);
    it.each([[{}], [mockUser()]])('should not save', (user) => {
      expect.hasAssertions();
      authSession.saveAuthentication(user);
      expect(storage.user).toBeNull();
    });
  });

  describe('when saving successful authentication', () => {
    const storage = mockStorage();
    const authSession = createAuthSessionForStorage(storage);
    it('should save to storage', () => {
      expect.hasAssertions();
      const user = mockUser(token);
      authSession.saveAuthentication(user);
      expect(storage.user).toStrictEqual(user);
      expect(authSession.isAuthenticated()).toBe(true);
    });
  });

  describe('when logging out', () => {
    const storage = mockStorage();
    const authSession = createAuthSessionForStorage(storage);
    it('should remove session from local storage', () => {
      expect.hasAssertions();
      authSession.discardAuthentication();
      expect(storage.user).toBeNull();
      expect(authSession.isAuthenticated()).toBe(false);
    });
  });

  describe('when getting current authentication', () => {
    const storage = mockStorage();
    const authSession = createAuthSessionForStorage(storage);
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

  describe('when checking if signed-in user is an admin', () => {
    const storage = mockStorage();
    const authSession = createAuthSessionForStorage(storage);

    it('should return true if it is', () => {
      expect.hasAssertions();
      authSession.saveAuthentication(mockUserAdmin(token));
      expect(authSession.isAdmin()).toBe(true);
    });

    it('should return false if it is not', () => {
      expect.hasAssertions();
      authSession.saveAuthentication(mockUser(token));
      expect(authSession.isAdmin()).toBe(false);
    });
  });

  describe('when checking if signed-in user is equals to another', () => {
    const storage = mockStorage();
    const authSession = createAuthSessionForStorage(storage);
    const user = mockUser(token);
    authSession.saveAuthentication(user);

    it('should return true if the user is the same', () => {
      expect.hasAssertions();
      expect(authSession.isUser(user.id)).toBe(true);
      expect(authSession.isUser(user)).toBe(true);
    });

    it('should return false if the user is not the same', () => {
      expect.hasAssertions();
      expect(authSession.isUser('wrong-id')).toBe(false);
      expect(authSession.isUser(mockUserAdmin())).toBe(false);
    });
  });
});
