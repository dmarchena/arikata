import dbRepo from './training';

jest.mock('../../db');

describe('trainingRepo (db)', () => {
  const entity = mockTrainingEntity();

  describe('when fetching all trainings of user', () => {
    it('should return a list of trainings', async () => {
      expect.assertions(2);
      const result = await dbRepo.getAllTrainingsOfUser(mockUser().id);
      expect(result).toBeArray();
      expect(result[0]).toBeTrainingEntity();
    });
  });

  describe('when fetching an old training', () => {
    it('should return the training', async () => {
      expect.assertions(2);
      const result = await dbRepo.getTrainingWithId(entity.id);
      expect(result).toBeTrainingEntity();
      expect(result).toEqualTrainingEntity(entity);
    });
  });

  describe('when trying to save a new training', () => {
    it('should return the newly created training', async () => {
      expect.assertions(1);
      const result = await dbRepo.save(entity);
      expect(result).toBeTrainingEntity();
    });
  });

  describe('when updating a training', () => {
    it('should return the modified training data', async () => {
      expect.assertions(2);
      const input = mockTrainingEntity();
      input.addNewAttempt('const a = 0;', false);
      const result = await dbRepo.update(input);
      expect(result).toBeTrainingEntity();
      expect(result.success).toBe(false);
    });
  });
});
