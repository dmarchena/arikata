import { trainingTransformer } from './trainingTransformer';

const training = mockTrainingEntity();
const kata = mockKataEntity();

describe('training transformer', () => {
  describe('when transforming to DTO', () => {
    it('should return a DTO with a kata reference', () => {
      expect.assertions(3);
      const dto = trainingTransformer.toTrainingDto(training);
      expect(dto).toBeTrainingDto();
      expect(dto.kataId).toBeString();
      expect(dto.kata).toBeUndefined();
    });
  });

  describe('when transforming to DTO with kata data', () => {
    it('should return a DTO with a kata dto', () => {
      expect.assertions(3);
      const dto = trainingTransformer.toTrainingDto(training, kata);
      expect(dto).toBeTrainingDto();
      expect(dto.kataId).toBeUndefined();
      expect(dto.kata).toBeKataDto();
    });
  });

  describe('when transforming to domain object', () => {
    it('should return an entity', () => {
      expect.assertions(1);
      expect(
        trainingTransformer.toTrainingModel(mockTrainingDto())
      ).toBeTrainingEntity();
    });
  });
});
