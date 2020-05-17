import jwt from './index';

describe('webtoken (JWT)', () => {
  describe('when signing in', () => {
    it('should return a JWT token', () => {
      expect.hasAssertions();
      const token = jwt.signWithPayload(mockUser());
      expect(token).toBeString();
    });
  });

  describe('when verifying a token', () => {
    it('should return a JWT token', () => {
      expect.hasAssertions();
      const userAdmin = mockUserAdmin();
      const token = jwt.signWithPayload(userAdmin);
      const result = jwt.verifyToken(token);
      expect(result).toBeObject();
      expect(result).toContainKeys(Object.keys(userAdmin));
    });
  });
});
