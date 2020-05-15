import kata from './kata';

describe('model Kata', () => {
  describe('factory', () => {
    it('should return an empty Kata model object if it is called without params', () => {
      expect.hasAssertions();
      expect(kata().create()).toContainKeys([
        'id',
        'details',
        'name',
        'code',
        'test',
        'tags',
      ]);
    });
    it('should return a kata with new id if it is neccessary', () => {
      expect.hasAssertions();
      const instance = kata().create();
      expect(instance.id).toBeUuid();
    });
  });
});
