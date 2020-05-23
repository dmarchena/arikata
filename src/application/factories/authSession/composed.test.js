import { createAuthSessionForStorage } from './index';
import createComposedAuthSession from './composed';

const mockStorage = (signedInUser = null) => ({
  getUser: jest.fn(() => signedInUser),
  setUser: jest.fn(),
  removeUser: jest.fn(),
});

const setupAuthSession = (signedInUser = null) => {
  const storage1 = mockStorage(signedInUser);
  const storage2 = mockStorage();
  const authSession1 = createAuthSessionForStorage(storage1);
  const authSession2 = createAuthSessionForStorage(storage2);
  const authSession = createComposedAuthSession(authSession1, authSession2);

  return {
    authSession,
    storage1,
    storage2,
  };
};

const token = mockExpiredToken();
const admin = mockUserAdmin(token);
const user = mockUser(token);

describe('composedAuthSession', () => {
  describe('when saving successful authentication', () => {
    it('all composing objects should be called', () => {
      expect.hasAssertions();
      const { authSession, storage1, storage2 } = setupAuthSession();
      authSession.saveAuthentication(user);
      expect(storage1.setUser).toHaveBeenCalledTimes(1);
      expect(storage2.setUser).toHaveBeenCalledTimes(1);
    });
  });

  describe('when logging out', () => {
    it('all composing objects should be called', () => {
      expect.hasAssertions();
      const { authSession, storage1, storage2 } = setupAuthSession();
      authSession.discardAuthentication();
      expect(storage1.removeUser).toHaveBeenCalledTimes(1);
      expect(storage2.removeUser).toHaveBeenCalledTimes(1);
    });
  });

  describe('when getting current authentication', () => {
    it('should return first result', () => {
      expect.hasAssertions();
      const { authSession, storage1, storage2 } = setupAuthSession(user);
      const result = authSession.getAuthentication();
      expect(storage1.getUser).toHaveBeenCalledTimes(1);
      expect(storage2.getUser).not.toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual(user);
    });
  });

  describe('when checking if isAdmin', () => {
    it('should return a boolean', () => {
      expect.hasAssertions();
      expect(setupAuthSession(user).authSession.isAdmin()).toBe(false);
      expect(setupAuthSession(admin).authSession.isAdmin()).toBe(true);
    });
  });

  describe('when checking if is autheticated', () => {
    it('should return a boolean', () => {
      expect.hasAssertions();
      expect(setupAuthSession().authSession.isAuthenticated()).toBe(false);
      expect(setupAuthSession(user).authSession.isAuthenticated()).toBe(true);
    });
  });

  describe('when checking if signed user is a given one', () => {
    it('should return a boolean after comparing', () => {
      expect.hasAssertions();
      const { authSession } = setupAuthSession(admin);
      expect(authSession.isUser(user)).toBe(false);
      expect(authSession.isUser(admin)).toBe(true);
    });
  });
});
