import user from './user';

describe('model User', () => {
  describe('when new instance is created', () => {
    it('should return an empty User model object if it is called without params', () => {
      expect.hasAssertions();
      expect(user().create()).toBeUserEntity();
    });

    it('should return a user with new id if it is neccessary', () => {
      expect.hasAssertions();
      const instance = user().create();
      expect(instance.id).toBeUuid();
    });
  });
});
