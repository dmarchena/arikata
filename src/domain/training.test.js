import Training from './training';

describe('model Training', () => {
  describe('factory', () => {
    it('should return an empty Training model object if it is called without params', () => {
      expect.hasAssertions();
      expect(Training.create()).toBeTrainingEntity();
    });

    it('should return a Training with new id if it is neccessary', () => {
      expect.hasAssertions();
      const instance = Training.create();
      expect(instance.id).toBeUuid();
    });
  });
});
