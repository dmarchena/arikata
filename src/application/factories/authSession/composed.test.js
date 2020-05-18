import createAuthSession from './index';
import createComposedAuthSession from './composed';

const mockStorage = (signedInUser = null) => ({
  getUser: jest.fn(() => signedInUser),
  setUser: jest.fn(),
  removeUser: jest.fn(),
});

const storage1 = mockStorage(mockUser());
const storage2 = mockStorage();
const authSession1 = createAuthSession(storage1);
const authSession2 = createAuthSession(storage2);
const authSession = createComposedAuthSession(authSession1, authSession2);
const token = mockExpiredToken();

describe('composedAuthSession', () => {
  describe('when saving successful authentication', () => {
    it('all composing objects should be called', () => {
      expect.hasAssertions();
      const user = mockUser(token);
      authSession.saveAuthentication(user);
      expect(storage1.setUser).toHaveBeenCalledTimes(1);
      expect(storage2.setUser).toHaveBeenCalledTimes(1);
    });
  });

  describe('when logging out', () => {
    it('all composing objects should be called', () => {
      expect.hasAssertions();
      authSession.discardAuthentication();
      expect(storage1.removeUser).toHaveBeenCalledTimes(1);
      expect(storage2.removeUser).toHaveBeenCalledTimes(1);
    });
  });

  describe('when getting current authentication', () => {
    it('should return first result', () => {
      expect.hasAssertions();
      const result = authSession.getAuthentication();
      expect(storage1.getUser).toHaveBeenCalledTimes(1);
      expect(storage2.getUser).not.toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual(mockUser());
    });
  });
});
