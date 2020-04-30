import user from './user';

describe('model User', () => {
  describe('factory', () => {
    it('should return an empty User model object if it is called without params', () => {
      expect.hasAssertions();
      expect(user()).toStrictEqual(
        expect.objectContaining({
          id: expect.any(String),
          email: expect.any(String),
          password: expect.any(String),
        })
      );
    });
    it('should return a user with new id if it is neccessary', () => {
      expect.hasAssertions();
      const instance = user();
      expect(instance.id).toBeUuid();
    });
  });
});
