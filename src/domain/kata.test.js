import kata from './kata';

describe('model Kata', () => {
  describe('factory', () => {
    it('should return an empty Kata model object if it is called without params', () => {
      expect.hasAssertions();
      expect(kata()).toStrictEqual(
        expect.objectContaining({
          id: expect.any(String),
          details: expect.any(String),
          name: expect.any(String),
          code: expect.any(String),
          test: expect.any(String),
          tags: expect.any(Array),
        })
      );
    });
    it('should return a kata with new id if it is neccessary', () => {
      expect.hasAssertions();
      const instance = kata();
      expect(instance.id).toBeUuid();
    });
  });
});
