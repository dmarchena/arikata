import dbRepo from './training';

jest.mock('../../db');

describe('trainingRepo (db)', () => {
  const dto = mockTrainingDto();

  describe('when fetching an old training', () => {
    it('should return the training', async () => {
      expect.assertions(2);
      const result = await dbRepo.getTrainingWithId(dto.id);
      expect(result).toBeTrainingEntity();
      expect(result).toStrictEqual(dto);
    });
  });

  describe('when trying to save a new training', () => {
    it('should return the newly created training', async () => {
      expect.assertions(1);
      const result = await dbRepo.save(dto);
      expect(result).toBeTrainingDto();
    });
  });

  describe('when updating a training', () => {
    // Not supported by sequelize mock
    it('should return the modified training data', async () => {
      expect.assertions(2);
      const input = mockUser();
      dto.success = false;
      const result = await dbRepo.update(input);
      expect(result).toBeTrainingDto();
      expect(result.success).toBe(false);
    });
  });
});
