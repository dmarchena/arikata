import Kata from './kata';

describe('model Kata', () => {
  describe('factory', () => {
    it('should return an empty Kata model object if it is called without params', () => {
      expect.hasAssertions();
      expect(Kata().create()).toContainKeys([
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
      const instance = Kata().create();
      expect(instance.id).toBeUuid();
    });
  });

  describe('when starting a kata', () => {
    it('should return a new training object', () => {
      expect.hasAssertions();
      expect(Kata().create().startTraining(mockUser().id)).toBeTrainingEntity();
    });
  });
});
